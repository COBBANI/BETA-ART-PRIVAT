import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createServer } from 'node:http';
import { createConnection } from 'node:net';
import { setTimeout as delay } from 'node:timers/promises';
import { Worker } from 'node:worker_threads';
import { randomUUID } from 'node:crypto';
import test from 'node:test';

// Integration fixture only: a local REST bridge sends the real SDK's commands
// to real Redis. No Lua, expiry, counter, or SDK behavior is mocked.
const redis = new URL(process.env.REDIS_TEST_URL || 'redis://127.0.0.1:6379');
if (!['127.0.0.1', 'localhost'].includes(redis.hostname)) {
  throw new Error('Use an isolated local Redis service for integration tests.');
}

function command(args) {
  return new Promise((resolve, reject) => {
    const socket = createConnection({ host: redis.hostname, port: Number(redis.port || 6379) });
    let buffer = Buffer.alloc(0);
    socket.setTimeout(2000, () => socket.destroy(new Error('Redis test connection timed out')));
    socket.on('error', reject);
    socket.on('connect', () => {
      socket.write(`*${args.length}\r\n` + args.map((arg) => {
        const value = String(arg);
        return `$${Buffer.byteLength(value)}\r\n${value}\r\n`;
      }).join(''));
    });
    socket.on('data', (chunk) => {
      buffer = Buffer.concat([buffer, chunk]);
      const end = buffer.indexOf('\r\n');
      if (end < 0) return;
      const type = String.fromCharCode(buffer[0]);
      const value = buffer.subarray(1, end).toString();
      if (type === '$' && Number(value) >= 0 && buffer.length < end + 4 + Number(value)) return;
      socket.end();
      if (type === '-') reject(new Error(value));
      else if (type === ':') resolve(Number(value));
      else if (type === '$') resolve(Number(value) < 0 ? null : buffer.subarray(end + 2, end + 2 + Number(value)).toString());
      else if (type === '+') resolve(value);
      else reject(new Error('Unexpected Redis test response'));
    });
  });
}

async function bridge(t, mode = 'redis') {
  let requests = 0;
  const server = createServer(async (req, res) => {
    requests++;
    if (mode === 'hang') { req.resume(); return; }
    if (mode === 'disconnect') { req.socket.destroy(); return; }
    try {
      assert.equal(req.headers.authorization, 'Bearer integration-test-only');
      let body = '';
      for await (const chunk of req) body += chunk;
      const payload = JSON.parse(body);
      const pipeline = Array.isArray(payload[0]);
      const results = await Promise.all((pipeline ? payload : [payload]).map(async (args) => {
        try { return { result: await command(args) }; }
        catch (error) { return { error: error.message }; }
      }));
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify(pipeline ? results : results[0]));
    } catch (error) {
      res.writeHead(500);
      res.end(error.message);
    }
  });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(() => { server.closeAllConnections(); return new Promise((resolve) => server.close(resolve)); });
  return { url: `http://127.0.0.1:${server.address().port}`, requests: () => requests };
}

function worker(t, url, options, now, attempts = 1) {
  return new Promise((resolve, reject) => {
    const child = new Worker(new URL('./fixtures/rate-limit-worker.mjs', import.meta.url), {
      workerData: { url, options, now, attempts },
    });
    t.after(() => child.terminate());
    child.once('message', resolve);
    child.once('error', reject);
    child.once('exit', (code) => { if (code !== 0) reject(new Error(`Worker exited ${code}`)); });
  });
}

test('real Redis coordinates separate workers and expires its atomic counter', { timeout: 10000 }, async (t) => {
  assert.equal(await command(['PING']), 'PONG');
  const service = await bridge(t);
  const options = { key: randomUUID(), prefix: 'integration', limit: 10, required: true, windowSeconds: 900 };
  // Keep the key deterministic while its real Redis TTL expires in two seconds.
  const now = (Math.floor(Date.now() / 900000) * 900 + 898) * 1000;
  const key = `rate:${options.prefix}:${options.key}:${Math.floor(now / 900000)}`;
  t.after(() => command(['DEL', key]));
  const results = (await Promise.all(Array.from({ length: 4 }, () => worker(t, service.url, options, now, 5)))).flat();
  assert.equal(results.filter((value) => value === 'allowed').length, 10);
  assert.equal(results.filter((value) => value === 'RateLimitError').length, 10);
  assert.equal(await command(['GET', key]), '20');
  assert.ok((await command(['PTTL', key])) > 0, 'atomic increments must leave a real expiry');
  await delay(2100);
  assert.equal(await command(['EXISTS', key]), 0);
  assert.deepEqual(await worker(t, service.url, options, now), ['allowed']);
});

test('real Lua repairs an existing counter with no expiry', { timeout: 5000 }, async (t) => {
  const service = await bridge(t);
  const options = { key: randomUUID(), prefix: 'integration', limit: 10, required: true, windowSeconds: 900 };
  const now = Math.floor(Date.now() / 900000) * 900000;
  const key = `rate:${options.prefix}:${options.key}:${Math.floor(now / 900000)}`;
  t.after(() => command(['DEL', key]));
  await command(['SET', key, '3']);
  assert.equal(await command(['TTL', key]), -1);
  assert.deepEqual(await worker(t, service.url, options, now), ['allowed']);
  assert.equal(await command(['GET', key]), '4');
  assert.ok((await command(['TTL', key])) > 0);
});

for (const mode of ['hang', 'disconnect']) {
  test(`real SDK fails closed on ${mode} without retrying`, { timeout: 8000 }, async (t) => {
    const service = await bridge(t, mode);
    const start = performance.now();
    const result = await worker(t, service.url, { key: randomUUID(), prefix: 'integration', limit: 10, required: true, windowSeconds: 900 }, Date.now());
    assert.deepEqual(result, ['RateLimitUnavailableError']);
    assert.equal(service.requests(), 1);
    assert.ok(performance.now() - start < 6000);
  });
}

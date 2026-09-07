import { parentPort, workerData } from 'node:worker_threads';

process.env.UPSTASH_REDIS_REST_URL = workerData.url;
process.env.UPSTASH_REDIS_REST_TOKEN = 'integration-test-only';
delete process.env.KV_REST_API_URL;
delete process.env.KV_REST_API_TOKEN;
Date.now = () => workerData.now;
const { enforceRateLimit } = await import('../../lib/rate-limit.ts');
const results = await Promise.all(Array.from({ length: workerData.attempts ?? 1 }, async () => {
  try {
    await enforceRateLimit(workerData.options);
    return 'allowed';
  } catch (error) {
    return error.constructor.name;
  }
}));
parentPort.postMessage(results);

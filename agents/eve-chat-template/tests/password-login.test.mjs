import assert from "node:assert/strict";
import { registerHooks } from "node:module";
import { after, beforeEach, mock, test } from "node:test";

// Use Node's TypeScript support and the app's existing @/ alias without a test framework.
const hooks = registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith("@/")) {
      return nextResolve(new URL(`../${specifier.slice(2)}.ts`, import.meta.url).href, context);
    }
    if (specifier === "next/server") return nextResolve("next/server.js", context);
    return nextResolve(specifier, context);
  },
});

const counts = new Map();
const redisOptions = [];
let storeUnavailable = false;
let invalidStoreResult = false;
let schemaReady = true;
mock.module("@upstash/redis", {
  namedExports: {
    Redis: class {
      constructor(options) { redisOptions.push(options); }
      async eval(_script, [key]) {
        if (storeUnavailable) throw new Error("private store error must not escape");
        if (invalidStoreResult) return null;
        const count = (counts.get(key) || 0) + 1;
        counts.set(key, count);
        return count;
      }
    },
  },
});
mock.module(new URL("../lib/db/client.ts", import.meta.url), {
  namedExports: {
    isDatabaseConfigured: () => Boolean(process.env.DATABASE_URL),
    isDatabaseSchemaReady: async () => schemaReady,
  },
});

const { POST } = await import("../app/api/password-auth/login/route.ts");
const { getSetupStatus } = await import("../lib/setup.ts");
const { verifyPasswordSessionToken } = await import("../lib/password-auth.ts");
const { enforceRateLimit, RateLimitError } = await import("../lib/rate-limit.ts");
const originalEnv = { ...process.env };
const keys = ["DATABASE_URL", "BETTER_AUTH_SECRET", "NEXT_PUBLIC_VERCEL_APP_CLIENT_ID",
  "VERCEL_APP_CLIENT_SECRET", "UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN",
  "KV_REST_API_URL", "KV_REST_API_TOKEN", "VERCEL_TARGET_ENV"];

beforeEach(() => {
  for (const key of keys) delete process.env[key];
  Object.assign(process.env, {
    NODE_ENV: "production", VERCEL: "1", VERCEL_ENV: "production",
    VERCEL_PROJECT_ID: "prj_test", EVE_CHAT_PASSWORD: "a-long-test-password",
    UPSTASH_REDIS_REST_URL: "https://test.upstash.io", UPSTASH_REDIS_REST_TOKEN: "test-token",
  });
  counts.clear();
  storeUnavailable = false;
  invalidStoreResult = false;
  schemaReady = true;
});
after(() => {
  for (const key of Object.keys(process.env)) if (!(key in originalEnv)) delete process.env[key];
  Object.assign(process.env, originalEnv);
  hooks.deregister();
});

function request(password = "wrong", headers = {}) {
  return new Request("https://chat.example/api/password-auth/login", {
    method: "POST",
    headers: { origin: "https://chat.example", host: "chat.example", "content-type": "application/json", "x-vercel-forwarded-for": "192.0.2.10", ...headers },
    body: JSON.stringify({ password }),
  });
}
function assertNoSession(response) {
  assert.equal(response.headers.get("set-cookie"), null);
}

test("missing Redis fails closed in deployed starter mode", async () => {
  delete process.env.UPSTASH_REDIS_REST_TOKEN;
  const status = await getSetupStatus();
  assert.equal(status.authMode, "password");
  assert.equal(status.appReady, false);
  assert.ok(status.missing.length);
  const response = await POST(request(process.env.EVE_CHAT_PASSWORD));
  assert.equal(response.status, 503);
  assertNoSession(response);
});

test("a complete KV pair takes precedence over incomplete Upstash credentials", async () => {
  delete process.env.UPSTASH_REDIS_REST_TOKEN;
  process.env.KV_REST_API_URL = "https://kv-test.upstash.io";
  process.env.KV_REST_API_TOKEN = "kv-test-token";
  assert.equal((await getSetupStatus()).appReady, true);
  assert.equal((await POST(request())).status, 401);
  assert.equal(redisOptions[0].url, process.env.KV_REST_API_URL);
  assert.equal(redisOptions[0].token, process.env.KV_REST_API_TOKEN);
});

test("concurrent attempts share a limit even when client IP headers change", async () => {
  const responses = await Promise.all(Array.from({ length: 20 }, (_, i) =>
    POST(request("wrong", { "x-forwarded-for": `192.0.2.${i}`, "x-real-ip": `198.51.100.${i}` }))));
  assert.equal(responses.filter((r) => r.status === 401).length, 10);
  const blocked = responses.filter((r) => r.status === 429);
  assert.equal(blocked.length, 10);
  for (const response of blocked) {
    assertNoSession(response);
    assert.ok(Number(response.headers.get("retry-after")) >= 1);
    assert.ok(Number(response.headers.get("retry-after")) <= 900);
    assert.equal(response.headers.get("cache-control"), "no-store");
  }
  assert.equal(counts.size, 2);
  assert.equal([...counts].find(([key]) => key.startsWith("rate:password-login-project:"))[1], 10);
  const correctButBlocked = await POST(request(process.env.EVE_CHAT_PASSWORD));
  assert.equal(correctButBlocked.status, 429);
  assertNoSession(correctButBlocked);
  const otherClient = await POST(request(process.env.EVE_CHAT_PASSWORD, { "x-vercel-forwarded-for": "198.51.100.20" }));
  assert.equal(otherClient.status, 200);
});

test("store failure or an invalid counter cannot issue a session", async () => {
  for (const mode of ["offline", "invalid"]) {
    storeUnavailable = mode === "offline";
    invalidStoreResult = mode === "invalid";
    const response = await POST(request(process.env.EVE_CHAT_PASSWORD));
    assert.equal(response.status, 503);
    assertNoSession(response);
    assert.doesNotMatch(await response.text(), /private store|test-token/);
  }
});

test("successful login retains a secure signed session", async () => {
  const response = await POST(request(process.env.EVE_CHAT_PASSWORD));
  assert.equal(response.status, 200);
  const cookie = response.cookies.get("eve_chat_session");
  assert.ok(verifyPasswordSessionToken(cookie.value));
  assert.equal(cookie.httpOnly, true);
  assert.equal(cookie.secure, true);
  assert.equal(cookie.sameSite, "lax");
});

test("invalid origin is rejected before consuming an allowance", async () => {
  const response = await POST(request("wrong", { origin: "https://other.example" }));
  assert.equal(response.status, 403);
  assertNoSession(response);
  assert.equal(counts.size, 0);
});

test("malformed JSON consumes an attempt and never authenticates", async () => {
  const response = await POST(new Request(request(), { body: "{" }));
  assert.equal(response.status, 401);
  assertNoSession(response);
  assert.equal([...counts.values()][0], 1);
});

test("a new fixed window restores the allowance", async (t) => {
  let now = 1_800_000_000_000;
  t.mock.method(Date, "now", () => now);
  const options = { key: "test", prefix: "window", limit: 1, required: true, windowSeconds: 900 };
  await enforceRateLimit(options);
  await assert.rejects(enforceRateLimit(options), RateLimitError);
  now += 900_000;
  await enforceRateLimit(options);
});

test("preview and production use separate project allowances", async () => {
  await POST(request());
  process.env.VERCEL_ENV = "preview";
  await POST(request());
  assert.equal(counts.size, 4);
});

test("distributed clients remain subject to a project ceiling", async () => {
  for (let i = 0; i < 100; i++) {
    assert.equal((await POST(request("wrong", { "x-vercel-forwarded-for": `192.0.2.${i}` }))).status, 401);
  }
  const response = await POST(request(process.env.EVE_CHAT_PASSWORD, { "x-vercel-forwarded-for": "198.51.100.1" }));
  assert.equal(response.status, 429);
  assertNoSession(response);
});

test("Vercel ingress identity is required and never replaced by arbitrary forwarding headers", async () => {
  for (const address of ["", "not-an-ip", "192.0.2.1, 198.51.100.1", "fe80::1%eth0"]) {
    const response = await POST(request(process.env.EVE_CHAT_PASSWORD, { "x-vercel-forwarded-for": address, "x-forwarded-for": "192.0.2.2" }));
    assert.equal(response.status, 503);
    assertNoSession(response);
  }
  assert.equal(counts.size, 0);
});

test("IPv6 rotations within one network share a private Redis key", async () => {
  for (let i = 0; i < 10; i++) {
    assert.equal((await POST(request("wrong", { "x-vercel-forwarded-for": `2001:db8:1234:5678::${i}` }))).status, 401);
  }
  assert.equal((await POST(request("wrong", { "x-vercel-forwarded-for": "2001:0db8:1234:5678:0:0:1:abcd" }))).status, 429);
  assert.equal((await POST(request(process.env.EVE_CHAT_PASSWORD, { "x-vercel-forwarded-for": "2001:db8:1234:5679::1" }))).status, 200);
  for (const key of counts.keys()) assert.doesNotMatch(key, /2001:|192\.0\.2\./);
});

test("IPv4-mapped IPv6 cannot create a second allowance", async () => {
  for (let i = 0; i < 10; i++) await POST(request());
  assert.equal((await POST(request("wrong", { "x-vercel-forwarded-for": "::ffff:192.0.2.10" }))).status, 429);
});

test("other production hosts keep a shared limit without trusting forwarded IPs", async () => {
  delete process.env.VERCEL;
  for (let i = 0; i < 10; i++) {
    assert.equal((await POST(request("wrong", { "x-vercel-forwarded-for": `192.0.2.${i}` }))).status, 401);
  }
  assert.equal((await POST(request(process.env.EVE_CHAT_PASSWORD))).status, 429);
  assert.equal(counts.size, 1);
});

test("only explicit local development can sign in without Redis", async () => {
  delete process.env.UPSTASH_REDIS_REST_TOKEN;
  process.env.NODE_ENV = "development";
  assert.equal((await POST(request(process.env.EVE_CHAT_PASSWORD))).status, 503);
  delete process.env.VERCEL;
  assert.equal((await getSetupStatus()).appReady, true);
  assert.equal((await POST(request(process.env.EVE_CHAT_PASSWORD))).status, 200);
});

test("complete Vercel authentication keeps priority over password mode", async () => {
  for (const key of ["DATABASE_URL", "BETTER_AUTH_SECRET", "NEXT_PUBLIC_VERCEL_APP_CLIENT_ID", "VERCEL_APP_CLIENT_SECRET"]) process.env[key] = "test";
  assert.equal((await getSetupStatus()).authMode, "vercel");
  assert.equal((await POST(request(process.env.EVE_CHAT_PASSWORD))).status, 409);
  schemaReady = false;
  assert.equal((await getSetupStatus()).appReady, false);
});

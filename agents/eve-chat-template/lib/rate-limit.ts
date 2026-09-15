import { Redis } from "@upstash/redis";

type LimitOptions = {
  readonly key: string;
  readonly limit: number;
  readonly prefix: string;
  readonly required?: boolean;
  readonly windowSeconds: number;
};

export class RateLimitError extends Error {
  readonly retryAfter: number;

  constructor(retryAfter: number) {
    super("Too many requests. Please wait a moment and try again.");
    this.retryAfter = retryAfter;
  }
}

export class RateLimitUnavailableError extends Error {
  constructor() {
    super("Sign-in is temporarily unavailable. Please try again later.");
  }
}

// Set the expiry in the same operation as the counter increment. An interrupted
// request must not leave a counter without an expiry.
const INCREMENT_WINDOW = `
local count = redis.call('INCR', KEYS[1])
if redis.call('TTL', KEYS[1]) < 0 then
  redis.call('EXPIRE', KEYS[1], ARGV[1])
end
return count
`;

let redis: Redis | undefined;

function getRedisEnv() {
  // Never combine a partial Upstash pair with credentials from a different store.
  for (const [urlKey, tokenKey] of [
    ["UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN"],
    ["KV_REST_API_URL", "KV_REST_API_TOKEN"],
  ]) {
    const url = process.env[urlKey]?.trim();
    const token = process.env[tokenKey]?.trim();
    if (url && token) return { token, url };
  }
  return null;
}

function getRedis() {
  const env = getRedisEnv();
  if (!env) return null;
  redis ??= new Redis({
    ...env,
    retry: { retries: 0 },
    signal: () => AbortSignal.timeout(3000),
  });
  return redis;
}

export async function enforceRateLimit(options: LimitOptions) {
  const client = getRedis();

  if (!client) {
    if (options.required) throw new RateLimitUnavailableError();
    return;
  }

  const now = Math.floor(Date.now() / 1000);
  const windowId = Math.floor(now / options.windowSeconds);
  const redisKey = `rate:${options.prefix}:${options.key}:${windowId}`;
  const retryAfter = options.windowSeconds - (now % options.windowSeconds);
  let count: number;
  try {
    count = await client.eval<number[], number>(INCREMENT_WINDOW, [redisKey], [retryAfter]);
    if (!Number.isSafeInteger(count) || count < 1) throw new RateLimitUnavailableError();
  } catch {
    throw new RateLimitUnavailableError();
  }

  if (count > options.limit) {
    throw new RateLimitError(retryAfter);
  }
}

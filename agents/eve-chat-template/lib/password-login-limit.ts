import { createHmac } from "node:crypto";
import { isIP } from "node:net";
import { getChatPassword } from "@/lib/password-auth";
import { enforceRateLimit, RateLimitUnavailableError } from "@/lib/rate-limit";
import { isLocalDevelopment } from "@/lib/setup";

const WINDOW_SECONDS = 15 * 60;

function networkAddress(address: string): string {
  if (isIP(address) === 4) return address;
  if (isIP(address) !== 6 || address.includes("%")) throw new RateLimitUnavailableError();

  const canonical = new URL(`http://[${address}]/`).hostname.slice(1, -1);
  const [left, right] = canonical.split("::");
  const start = left ? left.split(":") : [];
  const end = right ? right.split(":") : [];
  const groups = right === undefined ? start : [...start, ...Array(8 - start.length - end.length).fill("0"), ...end];
  const words = groups.map((group) => parseInt(group, 16));
  // IPv4-mapped IPv6 and plain IPv4 must consume the same allowance.
  if (words.slice(0, 5).every((word) => word === 0) && words[5] === 0xffff) {
    return [words[6]! >> 8, words[6]! & 255, words[7]! >> 8, words[7]! & 255].join(".");
  }
  // Rotating an IPv6 interface address within one /64 must not reset the limit.
  return words.slice(0, 4).map((word) => word.toString(16)).join(":") + "::/64";
}

export async function enforcePasswordLoginLimit(request: Request) {
  const scope = `${process.env.VERCEL_PROJECT_ID || "app"}:${process.env.VERCEL_TARGET_ENV || process.env.VERCEL_ENV || "local"}`;
  const required = !isLocalDevelopment();

  if (process.env.VERCEL === "1") {
    // Trust only Vercel's ingress header, never client-supplied forwarding headers.
    // https://vercel.com/docs/headers/request-headers#x-vercel-forwarded-for
    const address = request.headers.get("x-vercel-forwarded-for")?.trim() || "";
    const network = networkAddress(address);
    const digest = createHmac("sha256", getChatPassword()).update(network).digest("hex");
    await enforceRateLimit({
      key: `${scope}:${digest}`, limit: 10, prefix: "password-login-client",
      required, windowSeconds: WINDOW_SECONDS,
    });
    // Exhausted clients stop above and cannot drain the shared budget repeatedly.
    await enforceRateLimit({
      key: scope, limit: 100, prefix: "password-login-project",
      required, windowSeconds: WINDOW_SECONDS,
    });
    return;
  }

  // Other hosts have no verified source-IP contract. Preserve the strict shared
  // limit instead of trusting spoofable request headers there.
  await enforceRateLimit({
    key: scope, limit: 10, prefix: "password-login",
    required, windowSeconds: WINDOW_SECONDS,
  });
}

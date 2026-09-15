import { NextResponse } from "next/server";
import {
  createPasswordSessionToken,
  hasSameOriginRequest,
  PASSWORD_SESSION_COOKIE_NAME,
  PASSWORD_SESSION_MAX_AGE,
  verifyChatPassword,
} from "@/lib/password-auth";
import {
  AUTH_HINT_COOKIE_MAX_AGE,
  AUTH_HINT_COOKIE_NAME,
  AUTH_HINT_COOKIE_VALUE,
  isSecureAuthHintCookie,
} from "@/lib/auth-hint";
import { enforceRateLimit, RateLimitError } from "@/lib/rate-limit";
import { getSetupStatus, isLocalDevelopment } from "@/lib/setup";

export async function POST(request: Request) {
  const setupStatus = await getSetupStatus();

  if (setupStatus.authMode !== "password") {
    return NextResponse.json({ error: "Password sign-in is not configured." }, { status: 409 });
  }

  if (!hasSameOriginRequest(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  try {
    // The starter has one shared principal. Use a shared project/environment
    // bucket so rotating client IP headers cannot reset the login allowance.
    await enforceRateLimit({
      key: `${process.env.VERCEL_PROJECT_ID || "app"}:${process.env.VERCEL_TARGET_ENV || process.env.VERCEL_ENV || "local"}`,
      limit: 10,
      prefix: "password-login",
      required: !isLocalDevelopment(),
      windowSeconds: 15 * 60,
    });
  } catch (error) {
    if (error instanceof RateLimitError) {
      return NextResponse.json(
        { error: "Too many sign-in attempts. Please try again later." },
        { status: 429, headers: { "Retry-After": String(error.retryAfter), "Cache-Control": "no-store" } },
      );
    }
    return NextResponse.json(
      { error: "Sign-in is temporarily unavailable. Please try again later." },
      { status: 503, headers: { "Retry-After": "60", "Cache-Control": "no-store" } },
    );
  }

  const body = (await request.json().catch(() => null)) as { password?: unknown } | null;
  const password = typeof body?.password === "string" ? body.password : "";

  if (!verifyChatPassword(password)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  const secure = isSecureAuthHintCookie();

  response.cookies.set(PASSWORD_SESSION_COOKIE_NAME, createPasswordSessionToken(), {
    httpOnly: true,
    maxAge: PASSWORD_SESSION_MAX_AGE,
    path: "/",
    sameSite: "lax",
    secure,
  });
  response.cookies.set(AUTH_HINT_COOKIE_NAME, AUTH_HINT_COOKIE_VALUE, {
    httpOnly: false,
    maxAge: AUTH_HINT_COOKIE_MAX_AGE,
    path: "/",
    sameSite: "lax",
    secure,
  });

  return response;
}

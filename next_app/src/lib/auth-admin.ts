import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "admin_session";
const TOKEN_PREFIX = "v1.";

export function getSecret(): string {
  const s = process.env.ADMIN_PASSWORD;
  if (!s || s.length < 8) return "";
  return s;
}

export function createAdminToken(): string {
  const secret = getSecret();
  if (!secret) return "";
  const h = createHmac("sha256", secret).update("admin").digest("hex");
  return TOKEN_PREFIX + h;
}

export function verifyAdminToken(token: string | undefined): boolean {
  if (!token || !token.startsWith(TOKEN_PREFIX)) return false;
  const secret = getSecret();
  if (!secret) return false;
  const expected = createAdminToken();
  if (token.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(token, "utf8"), Buffer.from(expected, "utf8"));
  } catch {
    return false;
  }
}

export function getAdminCookie(req: Request): string | undefined {
  const h = req.headers.get("cookie");
  if (!h) return undefined;
  const m = h.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  return m ? decodeURIComponent(m[1].trim()) : undefined;
}

export function verifyAdmin(req: Request): boolean {
  return verifyAdminToken(getAdminCookie(req));
}

export function adminCookieHeader(value: string, maxAge = 60 * 60 * 24 * 7): string {
  return `${COOKIE_NAME}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}`;
}

export function clearAdminCookieHeader(): string {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

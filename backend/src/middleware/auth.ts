import { type Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const COOKIE_NAME = "admin_session";
const DEFAULT_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getSecret(): string {
  return process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD || "";
}

export function signToken(payload: { sub: string; email: string }): string {
  const secret = getSecret();
  if (!secret) return "";
  return jwt.sign(payload, secret, { expiresIn: "7d" });
}

export function verifyToken(token: string | undefined): { sub: string; email: string } | null {
  if (!token) return null;
  const secret = getSecret();
  if (!secret) return null;
  try {
    const decoded = jwt.verify(token, secret) as { sub?: string; email?: string };
    if (decoded?.sub && decoded?.email) return { sub: decoded.sub, email: decoded.email };
    return null;
  } catch {
    return null;
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const token = req.cookies?.[COOKIE_NAME];
  const payload = verifyToken(token);
  if (payload) {
    (req as Request & { admin?: { id: string; email: string } }).admin = {
      id: payload.sub,
      email: payload.email,
    };
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
}

export function getCookieOpts() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    maxAge: DEFAULT_MAX_AGE * 1000,
    path: "/",
  };
}

export { COOKIE_NAME };

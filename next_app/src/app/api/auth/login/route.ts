import { NextResponse } from "next/server";
import { createAdminToken, adminCookieHeader, getSecret } from "@/lib/auth-admin";

export async function POST(req: Request) {
  try {
    const secret = getSecret();
    if (!secret) {
      return NextResponse.json({ error: "Admin not configured. Set ADMIN_PASSWORD." }, { status: 503 });
    }
    const body = await req.json().catch(() => ({}));
    const password = body?.password ?? "";
    if (password !== secret) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
    const token = createAdminToken();
    const res = NextResponse.json({ ok: true });
    res.headers.set("Set-Cookie", adminCookieHeader(token));
    return res;
  } catch (e) {
    console.error("POST /api/auth/login", e);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}

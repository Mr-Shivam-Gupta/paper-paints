import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/auth-admin";

export async function GET(req: Request) {
  if (verifyAdmin(req)) return NextResponse.json({ ok: true });
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

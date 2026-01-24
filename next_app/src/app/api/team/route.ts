import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { toTeamMember } from "@/lib/prisma-map";
import { verifyAdmin } from "@/lib/auth-admin";

export async function GET() {
  try {
    const rows = await prisma.teamMember.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ items: rows.map(toTeamMember) });
  } catch (e) {
    console.error("GET /api/team", e);
    return NextResponse.json({ error: "Failed to fetch team" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!verifyAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const { name, jobTitle, bio, profilePhoto, linkedInProfile } = body;
    const row = await prisma.teamMember.create({
      data: {
        name: name ?? undefined,
        jobTitle: jobTitle ?? undefined,
        bio: bio ?? undefined,
        profilePhoto: profilePhoto ?? undefined,
        linkedInProfile: linkedInProfile ?? undefined,
      },
    });
    return NextResponse.json(toTeamMember(row));
  } catch (e) {
    console.error("POST /api/team", e);
    return NextResponse.json({ error: "Failed to create team member" }, { status: 500 });
  }
}

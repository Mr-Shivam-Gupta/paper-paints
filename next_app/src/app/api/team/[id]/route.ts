import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { toTeamMember } from "@/lib/prisma-map";
import { verifyAdmin } from "@/lib/auth-admin";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    const row = await prisma.teamMember.findUnique({ where: { id } });
    if (!row) return NextResponse.json(null, { status: 404 });
    return NextResponse.json(toTeamMember(row));
  } catch (e) {
    console.error("GET /api/team/[id]", e);
    return NextResponse.json({ error: "Failed to fetch team member" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!verifyAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await params;
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    const body = await req.json();
    const { name, jobTitle, bio, profilePhoto, linkedInProfile } = body;
    const row = await prisma.teamMember.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(jobTitle !== undefined && { jobTitle }),
        ...(bio !== undefined && { bio }),
        ...(profilePhoto !== undefined && { profilePhoto }),
        ...(linkedInProfile !== undefined && { linkedInProfile }),
      },
    });
    return NextResponse.json(toTeamMember(row));
  } catch (e: unknown) {
    if ((e as { code?: string })?.code === "P2025") return NextResponse.json({ error: "Not found" }, { status: 404 });
    console.error("PUT /api/team/[id]", e);
    return NextResponse.json({ error: "Failed to update team member" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!verifyAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await params;
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    const row = await prisma.teamMember.delete({ where: { id } });
    return NextResponse.json(toTeamMember(row));
  } catch (e: unknown) {
    if ((e as { code?: string })?.code === "P2025") return NextResponse.json({ error: "Not found" }, { status: 404 });
    console.error("DELETE /api/team/[id]", e);
    return NextResponse.json({ error: "Failed to delete team member" }, { status: 500 });
  }
}

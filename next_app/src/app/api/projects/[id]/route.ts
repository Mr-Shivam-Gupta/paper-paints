import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { toProject } from "@/lib/prisma-map";
import { verifyAdmin } from "@/lib/auth-admin";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    const row = await prisma.project.findUnique({ where: { id } });
    if (!row) return NextResponse.json(null, { status: 404 });
    return NextResponse.json(toProject(row));
  } catch (e) {
    console.error("GET /api/projects/[id]", e);
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    const body = await req.json();
    const {
      projectName,
      location,
      workDescription,
      productsUsed,
      mainImage,
      projectImages,
      completionDate,
    } = body;
    const row = await prisma.project.update({
      where: { id },
      data: {
        ...(projectName !== undefined && { projectName }),
        ...(location !== undefined && { location }),
        ...(workDescription !== undefined && { workDescription }),
        ...(productsUsed !== undefined && { productsUsed }),
        ...(mainImage !== undefined && { mainImage }),
        ...(projectImages !== undefined && { projectImages }),
        ...(completionDate !== undefined && { completionDate: new Date(completionDate) }),
      },
    });
    return NextResponse.json(toProject(row));
  } catch (e: any) {
    if (e?.code === "P2025") return NextResponse.json({ error: "Not found" }, { status: 404 });
    console.error("PUT /api/projects/[id]", e);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
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
    const row = await prisma.project.delete({ where: { id } });
    return NextResponse.json(toProject(row));
  } catch (e: any) {
    if (e?.code === "P2025") return NextResponse.json({ error: "Not found" }, { status: 404 });
    console.error("DELETE /api/projects/[id]", e);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { toApplication } from "@/lib/prisma-map";
import { verifyAdmin } from "@/lib/auth-admin";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    const row = await prisma.application.findUnique({ where: { id } });
    if (!row) return NextResponse.json(null, { status: 404 });
    return NextResponse.json(toApplication(row));
  } catch (e) {
    console.error("GET /api/applications/[id]", e);
    return NextResponse.json({ error: "Failed to fetch application" }, { status: 500 });
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
    const { title, description, mainImage, category, keyBenefits, slug, learnMoreUrl } = body;
    const row = await prisma.application.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(mainImage !== undefined && { mainImage }),
        ...(category !== undefined && { category }),
        ...(keyBenefits !== undefined && { keyBenefits }),
        ...(slug !== undefined && { slug }),
        ...(learnMoreUrl !== undefined && { learnMoreUrl }),
      },
    });
    return NextResponse.json(toApplication(row));
  } catch (e: unknown) {
    if ((e as { code?: string })?.code === "P2025") return NextResponse.json({ error: "Not found" }, { status: 404 });
    console.error("PUT /api/applications/[id]", e);
    return NextResponse.json({ error: "Failed to update application" }, { status: 500 });
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
    const row = await prisma.application.delete({ where: { id } });
    return NextResponse.json(toApplication(row));
  } catch (e: unknown) {
    if ((e as { code?: string })?.code === "P2025") return NextResponse.json({ error: "Not found" }, { status: 404 });
    console.error("DELETE /api/applications/[id]", e);
    return NextResponse.json({ error: "Failed to delete application" }, { status: 500 });
  }
}

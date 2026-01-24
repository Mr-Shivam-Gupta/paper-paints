import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { toProduct } from "@/lib/prisma-map";
import { verifyAdmin } from "@/lib/auth-admin";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    const row = await prisma.product.findUnique({ where: { id } });
    if (!row) return NextResponse.json(null, { status: 404 });
    return NextResponse.json(toProduct(row));
  } catch (e) {
    console.error("GET /api/products/[id]", e);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
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
    const {
      productName,
      category,
      description,
      technicalSpecifications,
      features,
      mainImage,
      brochureUrl,
    } = body;
    const row = await prisma.product.update({
      where: { id },
      data: {
        ...(productName !== undefined && { productName }),
        ...(category !== undefined && { category }),
        ...(description !== undefined && { description }),
        ...(technicalSpecifications !== undefined && { technicalSpecifications }),
        ...(features !== undefined && { features }),
        ...(mainImage !== undefined && { mainImage }),
        ...(brochureUrl !== undefined && { brochureUrl }),
      },
    });
    return NextResponse.json(toProduct(row));
  } catch (e: any) {
    if (e?.code === "P2025") return NextResponse.json({ error: "Not found" }, { status: 404 });
    console.error("PUT /api/products/[id]", e);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
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
    const row = await prisma.product.delete({ where: { id } });
    return NextResponse.json(toProduct(row));
  } catch (e: any) {
    if (e?.code === "P2025") return NextResponse.json({ error: "Not found" }, { status: 404 });
    console.error("DELETE /api/products/[id]", e);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}

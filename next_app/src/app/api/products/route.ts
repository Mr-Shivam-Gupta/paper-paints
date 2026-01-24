import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { toProduct } from "@/lib/prisma-map";
import { verifyAdmin } from "@/lib/auth-admin";

export async function GET() {
  try {
    const rows = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ items: rows.map(toProduct) });
  } catch (e) {
    console.error("GET /api/products", e);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!verifyAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const {
      _id,
      _createdDate,
      _updatedDate,
      productName,
      category,
      description,
      technicalSpecifications,
      features,
      mainImage,
      brochureUrl,
    } = body;
    const row = await prisma.product.create({
      data: {
        productName: productName ?? undefined,
        category: category ?? undefined,
        description: description ?? undefined,
        technicalSpecifications: technicalSpecifications ?? undefined,
        features: features ?? undefined,
        mainImage: mainImage ?? undefined,
        brochureUrl: brochureUrl ?? undefined,
      },
    });
    return NextResponse.json(toProduct(row));
  } catch (e) {
    console.error("POST /api/products", e);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

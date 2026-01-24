import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { toApplication } from "@/lib/prisma-map";
import { verifyAdmin } from "@/lib/auth-admin";

export async function GET() {
  try {
    const rows = await prisma.application.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ items: rows.map(toApplication) });
  } catch (e) {
    console.error("GET /api/applications", e);
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!verifyAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const {
      title,
      description,
      mainImage,
      category,
      keyBenefits,
      slug,
      learnMoreUrl,
    } = body;
    const row = await prisma.application.create({
      data: {
        title: title ?? undefined,
        description: description ?? undefined,
        mainImage: mainImage ?? undefined,
        category: category ?? undefined,
        keyBenefits: keyBenefits ?? undefined,
        slug: slug ?? undefined,
        learnMoreUrl: learnMoreUrl ?? undefined,
      },
    });
    return NextResponse.json(toApplication(row));
  } catch (e) {
    console.error("POST /api/applications", e);
    return NextResponse.json({ error: "Failed to create application" }, { status: 500 });
  }
}

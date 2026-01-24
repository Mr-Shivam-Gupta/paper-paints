import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { toProject } from "@/lib/prisma-map";
import { verifyAdmin } from "@/lib/auth-admin";

export async function GET() {
  try {
    const rows = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ items: rows.map(toProject) });
  } catch (e) {
    console.error("GET /api/projects", e);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!verifyAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
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
    const row = await prisma.project.create({
      data: {
        projectName: projectName ?? undefined,
        location: location ?? undefined,
        workDescription: workDescription ?? undefined,
        productsUsed: productsUsed ?? undefined,
        mainImage: mainImage ?? undefined,
        projectImages: projectImages ?? undefined,
        completionDate: completionDate ? new Date(completionDate) : undefined,
      },
    });
    return NextResponse.json(toProject(row));
  } catch (e) {
    console.error("POST /api/projects", e);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}

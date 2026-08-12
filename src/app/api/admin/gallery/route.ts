import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { prisma } from "@/lib/prisma";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import type { GalleryImage as GalleryImageRow } from "@/generated/prisma/client";

const GALLERY_IMAGES_DIR = path.join(process.cwd(), "public", "images", "Gallery");

function toApiShape(row: GalleryImageRow) {
  return { id: row.id, src: row.src, alt: row.alt };
}

export async function GET() {
  try {
    const rows = await prisma.galleryImage.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(rows.map(toApiShape));
  } catch (error) {
    console.error("[admin/gallery] Failed to list", error);
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthorizedAdminRequest(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("image") as File | null;
    const alt = (formData.get("alt") as string) || "Gallery image";

    if (!file) {
      return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const originalName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const fileName = `${Date.now()}-${originalName}`;
    const filePath = path.join(GALLERY_IMAGES_DIR, fileName);

    await fs.writeFile(filePath, buffer);

    const maxOrder = await prisma.galleryImage.aggregate({ _max: { order: true } });
    const row = await prisma.galleryImage.create({
      data: {
        src: `/images/Gallery/${fileName}`,
        alt,
        order: (maxOrder._max.order ?? -1) + 1,
      },
    });

    return NextResponse.json({ success: true, image: toApiShape(row) });
  } catch (error) {
    console.error("[admin/gallery] Upload failed", error);
    return NextResponse.json({ success: false, message: "Upload failed" }, { status: 500 });
  }
}

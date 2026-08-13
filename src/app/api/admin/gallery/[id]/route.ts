import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { prisma } from "@/lib/prisma";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";

const GALLERY_IMAGES_DIR = path.join(process.cwd(), "public", "images", "Gallery");

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthorizedAdminRequest(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const image = await prisma.galleryImage.findUnique({ where: { id } });

    if (!image) {
      return NextResponse.json({ success: false, message: "Image not found" }, { status: 404 });
    }

    const fileName = path.basename(image.src);
    const filePath = path.join(GALLERY_IMAGES_DIR, fileName);

    try {
      await fs.unlink(filePath);
    } catch {
      console.error("Failed to delete image file:", filePath);
    }

    await prisma.galleryImage.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[admin/gallery] Delete failed", error);
    return NextResponse.json({ success: false, message: "Delete failed" }, { status: 500 });
  }
}

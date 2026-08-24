import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { prisma } from "@/lib/prisma";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import type { Testimonial as TestimonialRow } from "@/generated/prisma/client";

const TESTIMONIAL_IMAGES_DIR = path.join(process.cwd(), "public", "images", "what our patient");

async function saveTestimonialImage(file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const originalName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const fileName = `${Date.now()}-${originalName}`;
  await fs.writeFile(path.join(TESTIMONIAL_IMAGES_DIR, fileName), buffer);
  return `/images/what our patient/${fileName}`;
}

function toApiShape(row: TestimonialRow) {
  return {
    id: row.id,
    quote: row.quote,
    name: row.name,
    role: row.role,
    initials: row.initials,
    image: row.imageSrc ? { src: row.imageSrc, alt: row.imageAlt ?? row.name } : undefined,
  };
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthorizedAdminRequest(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await prisma.testimonial.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[admin/testimonials] Failed to delete", error);
    return NextResponse.json({ success: false, message: "Delete failed" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthorizedAdminRequest(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const formData = await request.formData();
    const quote = formData.get("quote") as string;
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const initials = formData.get("initials") as string;
    const imageAlt = formData.get("imageAlt") as string | null;
    const file = formData.get("image") as File | null;
    const removeImage = formData.get("removeImage") === "true";

    let imageUpdate = {};
    if (file && file.size > 0) {
      const imageSrc = await saveTestimonialImage(file);
      imageUpdate = { imageSrc, imageAlt: imageAlt || name };
    } else if (removeImage) {
      imageUpdate = { imageSrc: null, imageAlt: null };
    }

    const row = await prisma.testimonial.update({
      where: { id },
      data: {
        ...(quote ? { quote } : {}),
        ...(name ? { name } : {}),
        ...(role ? { role } : {}),
        ...(initials ? { initials } : {}),
        ...imageUpdate,
      },
    });

    return NextResponse.json({ success: true, testimonial: toApiShape(row) });
  } catch (error) {
    console.error("[admin/testimonials] Failed to update", error);
    return NextResponse.json({ success: false, message: "Update failed" }, { status: 500 });
  }
}

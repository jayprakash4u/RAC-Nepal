import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import type { Testimonial as TestimonialRow } from "@/generated/prisma/client";

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
    const body = await request.json();
    const { quote, name, role, initials, image } = body;

    const row = await prisma.testimonial.update({
      where: { id },
      data: {
        ...(quote ? { quote } : {}),
        ...(name ? { name } : {}),
        ...(role ? { role } : {}),
        ...(initials ? { initials } : {}),
        ...(image !== undefined ? { imageSrc: image?.src || null, imageAlt: image?.alt || null } : {}),
      },
    });

    return NextResponse.json({ success: true, testimonial: toApiShape(row) });
  } catch (error) {
    console.error("[admin/testimonials] Failed to update", error);
    return NextResponse.json({ success: false, message: "Update failed" }, { status: 500 });
  }
}

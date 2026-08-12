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

export async function GET() {
  try {
    const rows = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(rows.map(toApiShape));
  } catch (error) {
    console.error("[admin/testimonials] Failed to list", error);
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthorizedAdminRequest(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { quote, name, role, initials, image } = body;

    if (!quote || !name || !role || !initials) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const maxOrder = await prisma.testimonial.aggregate({ _max: { order: true } });
    const row = await prisma.testimonial.create({
      data: {
        quote,
        name,
        role,
        initials,
        imageSrc: image?.src || null,
        imageAlt: image?.alt || null,
        order: (maxOrder._max.order ?? -1) + 1,
      },
    });

    return NextResponse.json({ success: true, testimonial: toApiShape(row) });
  } catch (error) {
    console.error("[admin/testimonials] Failed to create", error);
    return NextResponse.json({ success: false, message: "Failed to add testimonial" }, { status: 500 });
  }
}

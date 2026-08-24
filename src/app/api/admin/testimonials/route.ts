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
    const formData = await request.formData();
    const quote = formData.get("quote") as string;
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const initials = formData.get("initials") as string;
    const imageAlt = formData.get("imageAlt") as string | null;
    const file = formData.get("image") as File | null;

    if (!quote || !name || !role || !initials) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const imageSrc = file && file.size > 0 ? await saveTestimonialImage(file) : null;

    const maxOrder = await prisma.testimonial.aggregate({ _max: { order: true } });
    const row = await prisma.testimonial.create({
      data: {
        quote,
        name,
        role,
        initials,
        imageSrc,
        imageAlt: imageSrc ? imageAlt || name : null,
        order: (maxOrder._max.order ?? -1) + 1,
      },
    });

    return NextResponse.json({ success: true, testimonial: toApiShape(row) });
  } catch (error) {
    console.error("[admin/testimonials] Failed to create", error);
    return NextResponse.json({ success: false, message: "Failed to add testimonial" }, { status: 500 });
  }
}

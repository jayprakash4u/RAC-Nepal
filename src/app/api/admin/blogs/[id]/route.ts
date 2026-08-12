import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { prisma } from "@/lib/prisma";
import { isAuthorizedAdminRequest } from "@/lib/admin-auth";
import type { BlogPost as BlogPostRow } from "@/generated/prisma/client";

const BLOG_IMAGES_DIR = path.join(process.cwd(), "public", "images", "blogs");

function toApiShape(row: BlogPostRow) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    publishedAt: row.publishedAt.toISOString().split("T")[0],
    readTime: row.readTime,
    image: { src: row.imageSrc, alt: row.imageAlt },
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
    await prisma.blogPost.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[admin/blogs] Failed to delete", error);
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
    const contentType = request.headers.get("content-type") || "";

    let title = "";
    let excerpt = "";
    let category = "";
    let publishedAt = "";
    let readTime = "";
    let imageSrc = "";
    let imageAlt = "";
    let sections: unknown[] = [];
    let sectionsProvided = false;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      title = (formData.get("title") as string) || "";
      excerpt = (formData.get("excerpt") as string) || "";
      category = (formData.get("category") as string) || "";
      publishedAt = (formData.get("publishedAt") as string) || "";
      readTime = (formData.get("readTime") as string) || "";
      imageAlt = (formData.get("imageAlt") as string) || "";

      const sectionsRaw = formData.get("sections");
      if (sectionsRaw) {
        try {
          sections = JSON.parse(sectionsRaw as string);
          sectionsProvided = true;
        } catch {
          // ignore parse error, keep existing sections
        }
      }

      const file = formData.get("image") as File | null;
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const originalName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
        const fileName = `${Date.now()}-${originalName}`;
        const filePath = path.join(BLOG_IMAGES_DIR, fileName);
        await fs.writeFile(filePath, buffer);
        imageSrc = `/images/blogs/${fileName}`;
      }
    } else {
      const body = await request.json();
      title = body.title || "";
      excerpt = body.excerpt || "";
      category = body.category || "";
      publishedAt = body.publishedAt || "";
      readTime = body.readTime || "";
      imageSrc = body.imageSrc || "";
      imageAlt = body.imageAlt || "";
      if (body.sections !== undefined) {
        sections = body.sections;
        sectionsProvided = true;
      }
    }

    const row = await prisma.blogPost.update({
      where: { id },
      data: {
        ...(title ? { title } : {}),
        ...(excerpt ? { excerpt } : {}),
        ...(category ? { category } : {}),
        ...(publishedAt ? { publishedAt: new Date(publishedAt) } : {}),
        ...(readTime ? { readTime } : {}),
        ...(imageSrc ? { imageSrc } : {}),
        ...(imageAlt ? { imageAlt } : {}),
        ...(sectionsProvided ? { sections: JSON.stringify(sections) } : {}),
      },
    });

    return NextResponse.json({ success: true, post: toApiShape(row) });
  } catch (error) {
    console.error("[admin/blogs] Failed to update", error);
    return NextResponse.json({ success: false, message: "Update failed" }, { status: 500 });
  }
}

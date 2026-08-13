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

export async function GET() {
  try {
    const rows = await prisma.blogPost.findMany({ orderBy: { publishedAt: "desc" } });
    return NextResponse.json(rows.map(toApiShape));
  } catch (error) {
    console.error("[admin/blogs] Failed to list", error);
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthorizedAdminRequest(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const contentType = request.headers.get("content-type") || "";
    let title = "";
    let excerpt = "";
    let category = "";
    let slug = "";
    let publishedAt = "";
    let readTime = "5 min read";
    let imageSrc = "";
    let imageAlt = "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      title = (formData.get("title") as string) || "";
      excerpt = (formData.get("excerpt") as string) || "";
      category = (formData.get("category") as string) || "";
      slug = (formData.get("slug") as string) || "";
      publishedAt = (formData.get("publishedAt") as string) || "";
      readTime = (formData.get("readTime") as string) || "5 min read";
      imageAlt = (formData.get("imageAlt") as string) || "";

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
      slug = body.slug || "";
      publishedAt = body.publishedAt || "";
      readTime = body.readTime || "5 min read";
      imageSrc = body.imageSrc || "";
      imageAlt = body.imageAlt || "";
    }

    if (!title || !excerpt || !category || !slug) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const row = await prisma.blogPost.create({
      data: {
        slug,
        title,
        excerpt,
        category,
        publishedAt: new Date(publishedAt || new Date().toISOString().split("T")[0]),
        readTime,
        imageSrc: imageSrc || "/images/Gallery/RacNepal-1-300x225.jpg",
        imageAlt: imageAlt || title,
        sections: "[]",
      },
    });

    return NextResponse.json({ success: true, post: toApiShape(row) });
  } catch (error) {
    console.error("[admin/blogs] Failed to create", error);
    return NextResponse.json({ success: false, message: "Failed to create post" }, { status: 500 });
  }
}

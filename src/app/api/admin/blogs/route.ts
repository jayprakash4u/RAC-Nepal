import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: string;
  image: {
    src: string;
    alt: string;
  };
}

const BLOGS_JSON_PATH = path.join(process.cwd(), "src", "data", "blogs.json");
const BLOG_IMAGES_DIR = path.join(process.cwd(), "public", "images", "blogs");

export async function GET() {
  try {
    const data = await fs.readFile(BLOGS_JSON_PATH, "utf-8");
    const posts = JSON.parse(data) as BlogPost[];
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let title: string = "";
    let excerpt: string = "";
    let category: string = "";
    let slug: string = "";
    let publishedAt: string = "";
    let readTime: string = "5 min read";
    let imageSrc: string = "";
    let imageAlt: string = "";

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

    const posts = JSON.parse(await fs.readFile(BLOGS_JSON_PATH, "utf-8")) as BlogPost[];
    const newPost: BlogPost = {
      id: `post-${Date.now()}`,
      slug,
      title,
      excerpt,
      category,
      publishedAt: publishedAt || new Date().toISOString().split("T")[0],
      readTime,
      image: {
        src: imageSrc || "/images/Gallery/RacNepal-1-300x225.jpg",
        alt: imageAlt || title,
      },
    };
    posts.push(newPost);
    await fs.writeFile(BLOGS_JSON_PATH, JSON.stringify(posts, null, 2));

    await updateBlogsTsFile();

    return NextResponse.json({ success: true, post: newPost });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to create post" }, { status: 500 });
  }
}

async function updateBlogsTsFile() {
  try {
    const blogsTsPath = path.join(process.cwd(), "src", "data", "blogs.ts");

    const newContent = `export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: string;
  image: {
    src: string;
    alt: string;
  };
};

export const blogPage = {
  eyebrow: "Our Blog",
  title: "Health Insights &",
  titleAccent: "Expert Articles",
  description:
    "Evidence-based perspectives on arthritis, rheumatology, and living well — written by the specialists at RAC Nepal for patients and families across Nepal.",
  cta: {
    label: "Book a Consultation",
    href: "/contact",
  },
} as const;

import blogsJson from "./blogs.json";

export const blogPosts: readonly BlogPost[] = blogsJson;

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
`;

    await fs.writeFile(blogsTsPath, newContent, "utf-8");
  } catch {
    console.error("Failed to update blogs.ts");
  }
}

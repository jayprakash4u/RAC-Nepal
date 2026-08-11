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
    const body = await request.json();
    const { title, excerpt, category, publishedAt, readTime, imageSrc, imageAlt, slug } = body;

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
      readTime: readTime || "5 min read",
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

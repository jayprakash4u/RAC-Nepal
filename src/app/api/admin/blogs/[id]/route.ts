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

interface BlogArticleBlock {
  type: "paragraph" | "heading" | "list" | "callout";
  text?: string;
  items?: readonly string[];
}

interface BlogArticle {
  author: string;
  sections: readonly BlogArticleBlock[];
}

const BLOGS_JSON_PATH = path.join(process.cwd(), "src", "data", "blogs.json");
const BLOG_ARTICLES_JSON_PATH = path.join(process.cwd(), "src", "data", "blog-articles.json");

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const posts = JSON.parse(await fs.readFile(BLOGS_JSON_PATH, "utf-8")) as BlogPost[];
    const post = posts.find((p) => p.id === id);

    if (!post) {
      return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 });
    }

    const filtered = posts.filter((p) => p.id !== id);
    await fs.writeFile(BLOGS_JSON_PATH, JSON.stringify(filtered, null, 2));

    // Also delete the article content
    const articles = JSON.parse(await fs.readFile(BLOG_ARTICLES_JSON_PATH, "utf-8")) as Record<string, BlogArticle>;
    delete articles[post.slug];
    await fs.writeFile(BLOG_ARTICLES_JSON_PATH, JSON.stringify(articles, null, 2));

    await updateBlogsTsFile();
    await updateBlogArticlesTsFile();

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, message: "Delete failed" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, excerpt, category, publishedAt, readTime, imageSrc, imageAlt, sections } = body;

    const posts = JSON.parse(await fs.readFile(BLOGS_JSON_PATH, "utf-8")) as BlogPost[];
    const index = posts.findIndex((p) => p.id === id);

    if (index === -1) {
      return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 });
    }

    posts[index] = {
      ...posts[index],
      title: title || posts[index].title,
      excerpt: excerpt || posts[index].excerpt,
      category: category || posts[index].category,
      publishedAt: publishedAt || posts[index].publishedAt,
      readTime: readTime || posts[index].readTime,
      image: {
        src: imageSrc || posts[index].image.src,
        alt: imageAlt || posts[index].image.alt,
      },
    };

    await fs.writeFile(BLOGS_JSON_PATH, JSON.stringify(posts, null, 2));

    // Update article content if provided
    if (sections) {
      const articles = JSON.parse(await fs.readFile(BLOG_ARTICLES_JSON_PATH, "utf-8")) as Record<string, BlogArticle>;
      articles[posts[index].slug] = {
        author: "RAC Nepal Rheumatology Team",
        sections,
      };
      await fs.writeFile(BLOG_ARTICLES_JSON_PATH, JSON.stringify(articles, null, 2));
    }

    await updateBlogsTsFile();
    await updateBlogArticlesTsFile();

    return NextResponse.json({ success: true, post: posts[index] });
  } catch {
    return NextResponse.json({ success: false, message: "Update failed" }, { status: 500 });
  }
}

async function updateBlogsTsFile() {
  try {
    const blogsTsPath = path.join(process.cwd(), "src", "data", "blogs.ts");
    const posts = JSON.parse(await fs.readFile(BLOGS_JSON_PATH, "utf-8")) as BlogPost[];

    const postEntries = posts
      .map(
        (post) => `  {
    id: "${post.id}",
    slug: "${post.slug}",
    title: "${post.title.replace(/"/g, '\\"')}",
    excerpt: "${post.excerpt.replace(/"/g, '\\"')}",
    category: "${post.category}",
    publishedAt: "${post.publishedAt}",
    readTime: "${post.readTime}",
    image: {
      src: "${post.image.src}",
      alt: "${post.image.alt.replace(/"/g, '\\"')}",
    },
  }`,
      )
      .join(",\n");

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

async function updateBlogArticlesTsFile() {
  try {
    const blogArticlesTsPath = path.join(process.cwd(), "src", "data", "blog-articles.ts");
    const articles = JSON.parse(await fs.readFile(BLOG_ARTICLES_JSON_PATH, "utf-8")) as Record<string, BlogArticle>;

    const articleEntries = Object.entries(articles)
      .map(
        ([slug, article]) => `  "${slug}": {
    author: "${article.author}",
    sections: ${JSON.stringify(article.sections)},
  }`,
      )
      .join(",\n");

    const newContent = `import type { BlogArticle, BlogArticleBlock } from "@/types/blog-content";

export const author = "RAC Nepal Rheumatology Team";

export const blogArticles: Record<string, BlogArticle> = {
${articleEntries}
} as const;

export function getBlogArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles[slug];
}
`;

    await fs.writeFile(blogArticlesTsPath, newContent, "utf-8");
  } catch {
    console.error("Failed to update blog-articles.ts");
  }
}

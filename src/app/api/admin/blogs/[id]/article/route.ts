import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const BLOG_ARTICLES_JSON_PATH = path.join(process.cwd(), "src", "data", "blog-articles.json");

interface BlogArticle {
  author: string;
  sections: readonly BlogArticleBlock[];
}

interface BlogArticleBlock {
  type: "paragraph" | "heading" | "list" | "callout";
  text?: string;
  items?: readonly string[];
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const articles = JSON.parse(await fs.readFile(BLOG_ARTICLES_JSON_PATH, "utf-8")) as Record<string, BlogArticle>;
    const article = articles[id];

    if (!article) {
      return NextResponse.json({ article: { author: "RAC Nepal Rheumatology Team", sections: [] } });
    }

    return NextResponse.json({ article });
  } catch {
    return NextResponse.json({ article: { author: "RAC Nepal Rheumatology Team", sections: [] } });
  }
}

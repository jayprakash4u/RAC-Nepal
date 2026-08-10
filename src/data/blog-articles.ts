import type { BlogArticle, BlogArticleBlock } from "@/types/blog-content";

export const author = "RAC Nepal Rheumatology Team";

import blogArticlesJson from "./blog-articles.json";

export const blogArticles: Record<string, BlogArticle> = blogArticlesJson as Record<string, BlogArticle>;

export function getBlogArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles[slug];
}

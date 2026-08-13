import { BlogGrid } from "@/components/sections/blog-grid";
import { BlogPageHero } from "@/components/sections/blog-page-hero";
import { siteConfig } from "@/config/site";
import { getBlogPosts } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs",
  description: `Health insights and expert articles from ${siteConfig.name} — arthritis care, patient tips, and rheumatology guidance for Nepal.`,
};

export default async function BlogsPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <BlogPageHero postCount={posts.length} />
      <BlogGrid posts={posts} />
    </>
  );
}

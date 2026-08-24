import { promises as fs } from "fs";
import path from "path";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/config/site";
import type { Testimonial } from "@/data/testimonials";
import type { VideoItem } from "@/data/videos";
import type { GalleryImage } from "@/data/gallery";
import type { BlogPost } from "@/data/blogs";
import type { BlogArticle } from "@/types/blog-content";

const VIDEOS_JSON_PATH = path.join(process.cwd(), "src", "data", "videos.json");
const GALLERY_JSON_PATH = path.join(process.cwd(), "src", "data", "gallery.json");
const BLOGS_JSON_PATH = path.join(process.cwd(), "src", "data", "blogs.json");
const BLOG_ARTICLES_JSON_PATH = path.join(process.cwd(), "src", "data", "blog-articles.json");

async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data) as T;
  } catch {
    return fallback;
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const rows = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });
    return rows.map((row) => ({
      id: row.id,
      quote: row.quote,
      name: row.name,
      role: row.role,
      initials: row.initials,
      image: row.imageSrc ? { src: row.imageSrc, alt: row.imageAlt ?? row.name } : undefined,
    }));
  } catch (error) {
    console.error("[content] Failed to load testimonials from DB", error);
    return [];
  }
}

export type SocialLinks = Partial<Record<"facebook" | "instagram" | "tiktok" | "twitter" | "youtube", string>>;

export async function getSocialLinks(): Promise<SocialLinks> {
  try {
    const row = await prisma.siteSettings.findUnique({ where: { id: "singleton" } });
    if (!row) return siteConfig.topBar.social;

    const links: SocialLinks = {};
    if (row.facebook) links.facebook = row.facebook;
    if (row.instagram) links.instagram = row.instagram;
    if (row.tiktok) links.tiktok = row.tiktok;
    if (row.twitter) links.twitter = row.twitter;
    if (row.youtube) links.youtube = row.youtube;
    return links;
  } catch (error) {
    console.error("[content] Failed to load social links from DB", error);
    return siteConfig.topBar.social;
  }
}

export async function getVideos(): Promise<VideoItem[]> {
  return readJsonFile<VideoItem[]>(VIDEOS_JSON_PATH, []);
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  return readJsonFile<GalleryImage[]>(GALLERY_JSON_PATH, []);
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const posts = await readJsonFile<BlogPost[]>(BLOGS_JSON_PATH, []);
  return posts.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await readJsonFile<BlogPost[]>(BLOGS_JSON_PATH, []);
  return posts.find((post) => post.slug === slug);
}

export async function getBlogArticleBySlug(slug: string): Promise<BlogArticle | undefined> {
  const articles = await readJsonFile<Record<string, BlogArticle>>(BLOG_ARTICLES_JSON_PATH, {});
  return articles[slug];
}

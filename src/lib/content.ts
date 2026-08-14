import { promises as fs } from "fs";
import path from "path";
import type { Testimonial } from "@/data/testimonials";
import type { VideoItem } from "@/data/videos";
import type { GalleryImage } from "@/data/gallery";
import type { BlogPost } from "@/data/blogs";
import type { BlogArticle } from "@/types/blog-content";

const TESTIMONIALS_JSON_PATH = path.join(process.cwd(), "src", "data", "testimonials.json");
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
  return readJsonFile<Testimonial[]>(TESTIMONIALS_JSON_PATH, []);
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

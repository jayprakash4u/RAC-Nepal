import { prisma } from "@/lib/prisma";
import type { Testimonial } from "@/data/testimonials";
import type { VideoItem } from "@/data/videos";
import type { GalleryImage } from "@/data/gallery";
import type { BlogPost } from "@/data/blogs";
import type { BlogArticle, BlogArticleBlock } from "@/types/blog-content";

const BLOG_AUTHOR = "RAC Nepal Rheumatology Team";

export async function getTestimonials(): Promise<Testimonial[]> {
  const rows = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });
  return rows.map((row) => ({
    id: row.id,
    quote: row.quote,
    name: row.name,
    role: row.role,
    initials: row.initials,
    image: row.imageSrc ? { src: row.imageSrc, alt: row.imageAlt ?? row.name } : undefined,
  }));
}

export async function getVideos(): Promise<VideoItem[]> {
  const rows = await prisma.video.findMany({ orderBy: { order: "asc" } });
  return rows.map((row) => ({
    id: row.id,
    youtubeId: row.youtubeId,
    title: row.title,
    category: row.category as VideoItem["category"],
    startSeconds: row.startSeconds ?? undefined,
  }));
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const rows = await prisma.galleryImage.findMany({ orderBy: { order: "asc" } });
  return rows.map((row) => ({ id: row.id, src: row.src, alt: row.alt }));
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const rows = await prisma.blogPost.findMany({ orderBy: { publishedAt: "desc" } });
  return rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    publishedAt: row.publishedAt.toISOString().split("T")[0],
    readTime: row.readTime,
    image: { src: row.imageSrc, alt: row.imageAlt },
  }));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const row = await prisma.blogPost.findUnique({ where: { slug } });
  if (!row) return undefined;
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

export async function getBlogArticleBySlug(slug: string): Promise<BlogArticle | undefined> {
  const row = await prisma.blogPost.findUnique({ where: { slug } });
  if (!row) return undefined;

  let sections: BlogArticleBlock[] = [];
  try {
    sections = JSON.parse(row.sections);
  } catch {
    sections = [];
  }

  return { author: BLOG_AUTHOR, sections };
}

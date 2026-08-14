// One-time script: imports the existing flat-file content (gallery, testimonials,
// videos, blog posts + article sections) into the database. Safe to re-run —
// skips anything that already exists.
import "dotenv/config";
import { PrismaMssql } from "@prisma/adapter-mssql";
import { PrismaClient } from "../src/generated/prisma/client";
import galleryJson from "../src/data/gallery.json";
import testimonialsJson from "../src/data/testimonials.json";
import videosJson from "../src/data/videos.json";
import blogsJson from "../src/data/blogs.json";
import blogArticlesJson from "../src/data/blog-articles.json";

type GalleryImage = { id: string; src: string; alt: string };
type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  initials: string;
  image?: { src: string; alt: string };
};
type VideoItem = {
  id: string;
  youtubeId: string;
  title: string;
  category: string;
  startSeconds?: number;
};
type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: string;
  image: { src: string; alt: string };
};
type BlogArticle = { author: string; sections: unknown[] };

async function main() {
  const adapter = new PrismaMssql({
    server: process.env.DB_HOST ?? "localhost",
    port: Number(process.env.DB_PORT ?? 1433),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: { trustServerCertificate: true, encrypt: true },
  });
  const prisma = new PrismaClient({ adapter });

  // --- Gallery ---
  const existingGalleryCount = await prisma.galleryImage.count();
  if (existingGalleryCount === 0) {
    const images = galleryJson as GalleryImage[];
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      await prisma.galleryImage.create({
        data: { src: img.src, alt: img.alt, order: i },
      });
    }
    console.log(`Imported ${images.length} gallery images.`);
  } else {
    console.log(`Gallery already has ${existingGalleryCount} rows — skipping.`);
  }

  // --- Testimonials ---
  const existingTestimonialCount = await prisma.testimonial.count();
  if (existingTestimonialCount === 0) {
    const testimonials = testimonialsJson as Testimonial[];
    for (let i = 0; i < testimonials.length; i++) {
      const t = testimonials[i];
      await prisma.testimonial.create({
        data: {
          quote: t.quote,
          name: t.name,
          role: t.role,
          initials: t.initials,
          imageSrc: t.image?.src ?? null,
          imageAlt: t.image?.alt ?? null,
          order: i,
        },
      });
    }
    console.log(`Imported ${testimonials.length} testimonials.`);
  } else {
    console.log(`Testimonials already has ${existingTestimonialCount} rows — skipping.`);
  }

  // --- Videos ---
  const existingVideoCount = await prisma.video.count();
  if (existingVideoCount === 0) {
    const videos = videosJson as VideoItem[];
    for (let i = 0; i < videos.length; i++) {
      const v = videos[i];
      await prisma.video.create({
        data: {
          youtubeId: v.youtubeId,
          title: v.title,
          category: v.category,
          startSeconds: v.startSeconds ?? null,
          order: i,
        },
      });
    }
    console.log(`Imported ${videos.length} videos.`);
  } else {
    console.log(`Videos already has ${existingVideoCount} rows — skipping.`);
  }

  // --- Blog posts + article sections ---
  const existingBlogCount = await prisma.blogPost.count();
  if (existingBlogCount === 0) {
    const posts = blogsJson as BlogPost[];
    const articles = blogArticlesJson as Record<string, BlogArticle>;
    for (const post of posts) {
      const article = articles[post.slug];
      await prisma.blogPost.create({
        data: {
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          category: post.category,
          publishedAt: new Date(post.publishedAt),
          readTime: post.readTime,
          imageSrc: post.image.src,
          imageAlt: post.image.alt,
          sections: JSON.stringify(article?.sections ?? []),
        },
      });
    }
    console.log(`Imported ${posts.length} blog posts.`);
  } else {
    console.log(`Blog posts already has ${existingBlogCount} rows — skipping.`);
  }

  console.log("Content import complete.");
}

main()
  .catch((error) => {
    console.error("Import failed:", error);
    process.exitCode = 1;
  })
  .finally(() => {
    process.exit();
  });

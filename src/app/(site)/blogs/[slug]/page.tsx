import Image from "next/image";
import Link from "next/link";
import { BlogArticleBody } from "@/components/sections/blog-article-body";
import { BlogRelatedPosts } from "@/components/sections/blog-related-posts";
import { Button, Container, Section } from "@/components/ui";
import { getBlogArticleBySlug, getBlogPostBySlug, getBlogPosts } from "@/lib/content";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Article Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image.src, alt: post.image.alt }],
    },
  };
}

function formatDate(isoDate: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(isoDate));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const [post, article, allPosts] = await Promise.all([
    getBlogPostBySlug(slug),
    getBlogArticleBySlug(slug),
    getBlogPosts(),
  ]);

  if (!post || !article) {
    notFound();
  }

  return (
    <>
      <Section
        background="hero"
        spacing="none"
        className="border-b border-primary-dark/10"
      >
        <Container size="narrow" className="page-hero-padding">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-xs text-small font-semibold text-primary transition-colors hover:text-primary-dark"
          >
            <span aria-hidden="true">←</span>
            Back to all articles
          </Link>

          <div className="mt-lg flex flex-wrap items-center gap-md text-small text-slate-600">
            <span className="rounded-full bg-white/90 px-md py-xs font-semibold text-primary-dark shadow-sm">
              {post.category}
            </span>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span aria-hidden="true" className="text-slate-200">
              |
            </span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="text-h2 mt-lg font-bold text-navy lg:text-h1">{post.title}</h1>

          <p className="text-body mt-md text-slate-600">{post.excerpt}</p>
        </Container>
      </Section>

      <Section background="default" spacing="default">
        <Container size="narrow">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={post.image.src}
                alt={post.image.alt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 42rem"
              />
            </div>
          </div>

          <div className="mt-xl border-b border-slate-200 pb-lg">
            <p className="text-small text-slate-500">
              By <span className="font-semibold text-slate-700">{article.author}</span>
            </p>
          </div>

          <BlogArticleBody sections={article.sections} className="mt-2xl" />

          <div className="mt-3xl rounded-2xl border border-primary/20 bg-hero-surface px-lg py-xl sm:px-2xl sm:py-2xl">
            <h2 className="text-h3 font-bold text-navy">Need specialist guidance?</h2>
            <p className="text-body mt-sm text-slate-600">
              If symptoms in this article sound familiar, our rheumatology team at{" "}
              {siteConfig.shortName} can help with diagnosis, treatment, and long-term
              follow-up.
            </p>
            <div className="mt-lg flex flex-col gap-sm sm:flex-row sm:flex-wrap">
              <Button href={siteConfig.links.appointment} size="lg">
                Book a Consultation
              </Button>
              <Button href="/blogs" variant="outline" size="lg">
                More articles
              </Button>
            </div>
          </div>

          <BlogRelatedPosts
            posts={allPosts}
            currentSlug={post.slug}
            category={post.category}
            className="mt-3xl border-t border-slate-200 pt-3xl"
          />
        </Container>
      </Section>
    </>
  );
}

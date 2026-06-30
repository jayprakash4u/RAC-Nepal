import { Button, Container, Section } from "@/components/ui";
import { blogPosts, getBlogPostBySlug } from "@/data/blogs";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Article Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
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
  const post = getBlogPostBySlug(slug);

  if (!post) {
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
          <div className="flex flex-wrap items-center gap-md text-small text-slate-600">
            <span className="rounded-full bg-white/90 px-md py-xs font-semibold text-primary-dark shadow-sm">
              {post.category}
            </span>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span aria-hidden="true" className="text-slate-200">
              |
            </span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="text-h2 mt-lg font-bold text-navy lg:text-h1">
            {post.title}
          </h1>

          <p className="text-body mt-md text-slate-600">{post.excerpt}</p>
        </Container>
      </Section>

      <Section background="default" spacing="default">
        <Container size="narrow" className="text-center">
          <div className="rounded-2xl border border-dashed border-primary/25 bg-surface px-xl py-3xl">
            <p className="text-body text-slate-600">
              The full article is being prepared. Check back soon for the
              complete post from {siteConfig.shortName}.
            </p>
            <div className="mt-xl">
              <Button href="/blogs" variant="outline">
                Back to all articles
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

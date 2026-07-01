"use client";

import Link from "next/link";
import Image from "next/image";
import { blogPage, blogPosts, type BlogPost } from "@/data/blogs";
import { BlogMobileCarousel } from "@/components/sections/blog-mobile-carousel";
import { ServiceCardHoverOverlay } from "@/components/sections/service-icon-card";
import { Button, Container, Section } from "@/components/ui";
import { cn } from "@/lib/cn";

function formatDate(isoDate: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(isoDate));
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
    >
      <path
        d="M4 10h12M11 5l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const categoryGradients: Record<string, string> = {
  Awareness: "from-primary/20 via-primary-soft/40 to-white",
  "Our Team": "from-slate-200/80 via-primary-soft/30 to-white",
  "Patient Tips": "from-primary-soft/50 via-white to-primary/10",
  Conditions: "from-primary-dark/15 via-primary-soft/35 to-white",
  "नेपाली": "from-primary/15 via-primary-soft/45 to-white",
  Gout: "from-amber-100/60 via-primary-soft/30 to-white",
  Lifestyle: "from-emerald-100/50 via-primary-soft/35 to-white",
  Autoimmune: "from-violet-100/40 via-primary-soft/40 to-white",
  Physiotherapy: "from-sky-100/50 via-primary-soft/30 to-white",
  Telehealth: "from-primary/10 via-white to-primary-soft/50",
};

function BlogPlaceholder({ category }: { category: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-sm bg-linear-to-br",
        categoryGradients[category] ?? "from-primary-soft/40 via-white to-primary/5",
      )}
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/15 bg-white/90 text-primary shadow-sm">
        <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
          <path
            d="M4 5.5A1.5 1.5 0 015.5 4h9A1.5 1.5 0 0116 5.5v13A1.5 1.5 0 0114.5 20h-9A1.5 1.5 0 014 18.5v-13z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M8 9h8M8 12.5h8M8 16h5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </div>
  );
}

function BlogCardImage({ post }: { post: BlogPost }) {
  if (post.image.src) {
    return (
      <Image
        src={post.image.src}
        alt={post.image.alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    );
  }

  return <BlogPlaceholder category={post.category} />;
}

function PostMeta({ post }: { post: BlogPost }) {
  return (
    <div className="flex flex-wrap items-center gap-x-md gap-y-xs text-small text-slate-600">
      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
      <span aria-hidden="true" className="text-slate-200">
        |
      </span>
      <span>{post.readTime}</span>
    </div>
  );
}

function CategoryBadge({ category }: { category: string }) {
  return (
    <span className="inline-flex rounded-full bg-primary/10 px-md py-xs text-small font-semibold text-primary-dark">
      {category}
    </span>
  );
}

function FeaturedBlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group flex h-full flex-col">
      <Link
        href={`/blogs/${post.slug}`}
        className={cn(
          "relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white",
          "shadow-[0_12px_32px_rgba(15,23,42,0.08)] transition-all duration-300 ease-out",
          "hover:-translate-y-1 hover:border-primary/20",
          "hover:shadow-[0_18px_40px_rgba(20,150,168,0.14)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          "lg:grid lg:grid-cols-[1.1fr_1fr] lg:items-stretch",
          "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        )}
      >
        <ServiceCardHoverOverlay />

        <div className="relative min-h-[14rem] overflow-hidden bg-surface lg:min-h-full">
          <BlogCardImage post={post} />
          <span className="absolute top-md left-md">
            <CategoryBadge category={post.category} />
          </span>
          <span className="absolute top-md right-md rounded-full bg-primary px-md py-xs text-small font-semibold text-white shadow-sm">
            Featured
          </span>
        </div>

        <div className="relative flex flex-col justify-center p-lg lg:p-2xl">
          <p className="font-display text-eyebrow font-semibold tracking-[0.16em] text-primary uppercase">
            Latest article
          </p>
          <PostMeta post={post} />
          <h2 className="mt-md text-h3 font-bold leading-snug text-navy transition-colors duration-300 group-hover:text-primary">
            {post.title}
          </h2>
          <p className="mt-sm line-clamp-3 text-body leading-relaxed text-slate-600">
            {post.excerpt}
          </p>
          <span className="mt-lg inline-flex items-center gap-xs text-body font-semibold text-primary">
            Read article
            <ArrowIcon />
          </span>
        </div>
      </Link>
    </article>
  );
}

function BlogCard({ post, elevated = false }: { post: BlogPost; elevated?: boolean }) {
  return (
    <article className="group flex h-full flex-col">
      <Link
        href={`/blogs/${post.slug}`}
        className={cn(
          "relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white",
          "shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition-all duration-300 ease-out",
          elevated
            ? "-translate-y-1.5 border-primary/15 shadow-[0_14px_30px_rgba(20,150,168,0.12)] motion-reduce:translate-y-0"
            : "hover:-translate-y-1.5 hover:border-primary/15 hover:shadow-[0_14px_30px_rgba(20,150,168,0.12)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          !elevated && "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        )}
      >
        <ServiceCardHoverOverlay active={elevated} />

        <div className="relative aspect-[16/10] overflow-hidden bg-surface">
          <BlogCardImage post={post} />
          <span className="absolute top-md left-md">
            <CategoryBadge category={post.category} />
          </span>
        </div>

        <div className="flex flex-1 flex-col p-lg">
          <PostMeta post={post} />
          <h2
            className={cn(
              "mt-md line-clamp-2 text-[0.9375rem] font-bold leading-snug transition-colors duration-300 sm:text-body",
              elevated ? "text-primary" : "text-navy group-hover:text-primary",
            )}
          >
            {post.title}
          </h2>
          <p className="mt-sm line-clamp-3 flex-1 text-small leading-relaxed text-slate-600">
            {post.excerpt}
          </p>
          <span className="mt-md inline-flex items-center gap-xs text-small font-semibold text-primary">
            Read article
            <ArrowIcon />
          </span>
          <span
            aria-hidden="true"
            className={cn(
              "mt-md block h-0.5 rounded-full bg-primary transition-all duration-300",
              elevated ? "w-10" : "w-8 group-hover:w-10",
            )}
          />
        </div>
      </Link>
    </article>
  );
}

function BlogCta() {
  return (
    <div className="mt-3xl rounded-2xl border border-primary/15 bg-linear-to-br from-primary-soft/35 via-white to-primary/5 p-lg text-center sm:p-xl">
      <h2 className="font-display text-h3 font-bold text-navy">
        Need personalized rheumatology advice?
      </h2>
      <p className="text-body mt-sm mx-auto max-w-[32rem] text-slate-600">
        Our articles are for education. For diagnosis and treatment tailored to
        you, speak with a specialist at RAC Nepal.
      </p>
      <div className="mt-lg flex justify-center">
        <Button href={blogPage.cta.href} size="lg">
          {blogPage.cta.label}
        </Button>
      </div>
    </div>
  );
}

export function BlogGrid() {
  const [featuredPost, ...remainingPosts] = blogPosts;

  return (
    <Section background="surface" spacing="default" className="border-t border-slate-200">
      <Container size="wide">
        <div className="section-content">
          <FeaturedBlogCard post={featuredPost} />
        </div>

        {remainingPosts.length > 0 ? (
          <>
            <div className="mt-2xl mb-lg flex flex-col gap-xs sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-display text-eyebrow font-semibold tracking-[0.16em] text-primary uppercase">
                  All articles
                </p>
                <h2 className="mt-xs text-h3 font-bold text-navy">
                  More from our specialists
                </h2>
              </div>
              <p className="text-small text-slate-600">
                {remainingPosts.length} articles to explore
              </p>
            </div>

            <BlogMobileCarousel
              posts={remainingPosts}
              renderPost={(post) => <BlogCard post={post} elevated />}
            />

            <ul className="mt-xl hidden grid-cols-1 gap-lg sm:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-xl">
              {remainingPosts.map((post, index) => (
                <li
                  key={post.id}
                  className="flex motion-safe:animate-[fadeIn_0.55s_ease-out_both] motion-reduce:animate-none"
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  <BlogCard post={post} />
                </li>
              ))}
            </ul>
          </>
        ) : null}

        <BlogCta />
      </Container>
    </Section>
  );
}

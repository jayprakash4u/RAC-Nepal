import Link from "next/link";
import Image from "next/image";
import { blogPosts, type BlogPost } from "@/data/blogs";
import { cn } from "@/lib/cn";

function formatDate(isoDate: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(isoDate));
}

function RelatedPostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl",
        "border border-slate-200 bg-white shadow-sm",
        "transition-[box-shadow,border-color] duration-300",
        "hover:border-primary/25 hover:shadow-md",
      )}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface">
        <Image
          src={post.image.src}
          alt={post.image.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 20rem"
        />
      </div>
      <div className="flex flex-1 flex-col p-md sm:p-lg">
        <span className="text-[0.6875rem] font-semibold tracking-[0.1em] text-primary uppercase">
          {post.category}
        </span>
        <h3 className="mt-sm line-clamp-2 text-body font-bold text-navy group-hover:text-primary-dark">
          {post.title}
        </h3>
        <p className="mt-sm line-clamp-2 text-small text-slate-600">{post.excerpt}</p>
        <div className="mt-md flex items-center gap-sm text-small text-slate-500">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readTime}</span>
        </div>
      </div>
    </Link>
  );
}

export function BlogRelatedPosts({
  currentSlug,
  category,
  className,
}: {
  currentSlug: string;
  category: string;
  className?: string;
}) {
  const related = blogPosts
    .filter((post) => post.slug !== currentSlug)
    .sort((a, b) => {
      const aMatch = a.category === category ? 1 : 0;
      const bMatch = b.category === category ? 1 : 0;
      return bMatch - aMatch;
    })
    .slice(0, 3);

  if (related.length === 0) {
    return null;
  }

  return (
    <section className={className}>
      <h2 className="text-h3 font-bold text-navy">Related articles</h2>
      <div className="mt-xl grid gap-lg sm:grid-cols-2 lg:grid-cols-3">
        {related.map((post) => (
          <RelatedPostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}

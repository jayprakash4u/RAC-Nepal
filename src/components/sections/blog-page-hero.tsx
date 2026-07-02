import { CenteredPageHero } from "@/components/sections/centered-page-hero";
import { blogPage, blogPosts } from "@/data/blogs";

export function BlogPageHero() {
  const postCount = blogPosts.length;

  return (
    <CenteredPageHero
      content={{
        eyebrow: blogPage.eyebrow,
        title: blogPage.title,
        titleAccent: blogPage.titleAccent,
        description: blogPage.description,
        footer: (
          <p className="inline-flex items-center rounded-full border border-white/80 bg-white/80 px-md py-xs text-small font-medium text-slate-600 shadow-sm backdrop-blur-sm">
            {postCount} articles · Updated regularly
          </p>
        ),
      }}
    />
  );
}

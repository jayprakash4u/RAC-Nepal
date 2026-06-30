import { Container, Section } from "@/components/ui";
import { blogPage, blogPosts } from "@/data/blogs";

export function BlogPageHero() {
  const postCount = blogPosts.length;

  return (
    <Section
      background="hero"
      spacing="none"
      className="relative overflow-hidden border-b border-primary-dark/10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 h-48 w-48 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-primary-dark/10 blur-3xl"
      />

      <Container size="wide" className="relative pt-md pb-2xl lg:pt-lg lg:pb-3xl">
        <div className="section-intro mx-auto flex flex-col items-center text-center">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-10 bg-primary sm:w-12" />
            <p className="font-display text-eyebrow font-semibold tracking-[0.18em] text-primary uppercase">
              {blogPage.eyebrow}
            </p>
            <span aria-hidden="true" className="h-px w-10 bg-primary sm:w-12" />
          </div>

          <h1 className="font-display mt-sm text-h2 font-bold leading-[1.12] tracking-tight text-pretty text-navy lg:text-[2.75rem]">
            {blogPage.title}{" "}
            <span className="text-primary">{blogPage.titleAccent}</span>
          </h1>

          <span
            aria-hidden="true"
            className="mt-sm block h-1 w-14 rounded-full bg-primary"
          />

          <p className="text-body mt-md max-w-[40rem] text-pretty text-slate-600">
            {blogPage.description}
          </p>

          <p className="mt-md inline-flex items-center rounded-full border border-white/80 bg-white/80 px-md py-xs text-small font-medium text-slate-600 shadow-sm backdrop-blur-sm">
            {postCount} articles · Updated regularly
          </p>
        </div>
      </Container>
    </Section>
  );
}

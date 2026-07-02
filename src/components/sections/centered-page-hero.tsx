import { Button, Container, Section } from "@/components/ui";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export type CenteredPageHeroContent = {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  description?: string;
  decoratedEyebrow?: boolean;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  footer?: ReactNode;
};

export function CenteredPageHero({
  content,
  className,
}: {
  content: CenteredPageHeroContent;
  className?: string;
}) {
  const showDecoratedEyebrow =
    content.decoratedEyebrow !== false && Boolean(content.eyebrow);

  return (
    <Section
      background="hero"
      spacing="none"
      className={cn(
        "relative overflow-hidden border-b border-primary-dark/10",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 h-48 w-48 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-primary-dark/10 blur-3xl"
      />

      <Container size="wide" className="relative page-hero-padding">
        <div className="section-intro mx-auto flex flex-col items-center text-center">
          {content.eyebrow ? (
            showDecoratedEyebrow ? (
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-10 bg-primary sm:w-12" />
                <p className="font-display text-eyebrow font-semibold tracking-[0.18em] text-primary uppercase">
                  {content.eyebrow}
                </p>
                <span aria-hidden="true" className="h-px w-10 bg-primary sm:w-12" />
              </div>
            ) : (
              <p className="font-display text-eyebrow font-semibold tracking-[0.18em] text-primary uppercase">
                {content.eyebrow}
              </p>
            )
          ) : null}

          <h1
            className={cn(
              "font-display text-h2 w-full font-bold leading-[1.12] tracking-tight text-pretty text-navy lg:text-[2.75rem]",
              content.eyebrow && "mt-sm",
            )}
          >
            {content.title}
            {content.titleAccent ? (
              <>
                {" "}
                <span className="text-primary">{content.titleAccent}</span>
              </>
            ) : null}
          </h1>

          <span
            aria-hidden="true"
            className="mt-sm block h-1 w-14 rounded-full bg-primary"
          />

          {content.description ? (
            <p className="text-body mt-md max-w-[40rem] text-pretty text-slate-600">
              {content.description}
            </p>
          ) : null}

          {content.primaryCta || content.secondaryCta ? (
            <div className="mt-lg flex w-full max-w-[38rem] flex-col gap-sm sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-sm">
              {content.primaryCta ? (
                <Button
                  href={content.primaryCta.href}
                  size="lg"
                  className="w-full whitespace-normal sm:w-auto sm:whitespace-nowrap"
                >
                  {content.primaryCta.label}
                </Button>
              ) : null}
              {content.secondaryCta ? (
                <Button
                  href={content.secondaryCta.href}
                  variant="outline"
                  size="lg"
                  className="w-full whitespace-normal sm:w-auto sm:whitespace-nowrap"
                >
                  {content.secondaryCta.label}
                </Button>
              ) : null}
            </div>
          ) : null}

          {content.footer ? <div className="mt-md">{content.footer}</div> : null}
        </div>
      </Container>
    </Section>
  );
}

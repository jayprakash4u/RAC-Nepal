import Image from "next/image";
import { Button, Container, Section } from "@/components/ui";
import { cn } from "@/lib/cn";
import type { PageHeroContent } from "@/types/page-hero-content";

function HeroButtonIcon({
  src,
  alt,
  invert = false,
}: {
  src: string;
  alt: string;
  invert?: boolean;
}) {
  return (
    <span className="relative h-[1.125rem] w-[1.125rem] shrink-0">
      <Image
        src={src}
        alt={alt}
        fill
        className={cn("object-contain", invert && "brightness-0 invert")}
        sizes="1.125rem"
        unoptimized
      />
    </span>
  );
}

function HeroStat({
  value,
  label,
  icon,
  showDivider,
  compact = false,
}: {
  value: string;
  label: string;
  icon: { src: string; alt: string };
  showDivider: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 items-center gap-2.5 py-0.5 sm:gap-3",
        showDivider && "border-slate-200 sm:border-r sm:pr-4 lg:pr-5",
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full bg-primary-soft/50",
          compact ? "h-10 w-10 sm:h-11 sm:w-11" : "h-11 w-11 sm:h-12 sm:w-12",
        )}
      >
        <div className={cn("relative", compact ? "h-5 w-5 sm:h-6 sm:w-6" : "h-6 w-6 sm:h-7 sm:w-7")}>
          <Image
            src={icon.src}
            alt={icon.alt}
            fill
            className="object-contain"
            sizes="1.75rem"
            unoptimized
          />
        </div>
      </div>

      <div className="min-w-0">
        <p
          className={cn(
            "font-display font-bold leading-none text-navy",
            compact ? "text-[1.125rem] sm:text-[1.25rem]" : "text-[1.25rem] sm:text-[1.375rem]",
          )}
        >
          {value}
        </p>
        <p className="mt-1 text-[0.6875rem] leading-snug text-slate-600 sm:text-[0.75rem]">
          {label}
        </p>
      </div>
    </div>
  );
}

function SplitPageHeroCopy({
  content,
  className,
  compact = false,
}: {
  content: PageHeroContent;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div className={cn("flex flex-col items-start", className)}>
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden="true"
          className="h-[3px] w-8 shrink-0 rounded-full bg-primary"
        />
        <p className="font-display text-eyebrow font-semibold tracking-[0.16em] text-primary uppercase">
          {content.eyebrow}
        </p>
      </div>

      <h1
        className={cn(
          "font-display mt-3 font-bold leading-[1.15] tracking-tight text-pretty sm:mt-4",
          compact
            ? "text-[1.75rem] sm:text-[2.25rem] lg:text-[2.375rem] xl:text-[2.625rem]"
            : "text-[1.75rem] sm:text-[2.375rem] lg:text-[2.5rem] xl:text-[2.75rem]",
        )}
      >
        <span className="text-navy">{content.title}</span>
        <br />
        <span className="text-primary">{content.titleAccent}</span>
      </h1>

      <p
        className={cn(
          "text-body max-w-[32rem] text-pretty leading-relaxed text-slate-600",
          compact ? "mt-4 sm:mt-5" : "mt-4 sm:mt-5",
        )}
      >
        {content.description}
      </p>

      <div
        className={cn(
          "flex w-full max-w-[34rem] flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4",
          compact ? "mt-6 sm:mt-7" : "mt-6 sm:mt-7",
        )}
      >
        <Button
          href={content.primaryCta.href}
          size="lg"
          className="w-full whitespace-normal sm:w-auto sm:whitespace-nowrap"
        >
          <HeroButtonIcon
            src={content.primaryCta.icon.src}
            alt={content.primaryCta.icon.alt}
            invert
          />
          {content.primaryCta.label}
        </Button>
        <Button
          href={content.secondaryCta.href}
          variant="outline"
          size="lg"
          className="w-full whitespace-normal sm:w-auto sm:whitespace-nowrap"
        >
          <HeroButtonIcon
            src={content.secondaryCta.icon.src}
            alt={content.secondaryCta.icon.alt}
          />
          {content.secondaryCta.label}
        </Button>
      </div>

      <div
        className={cn(
          "flex w-full max-w-[34rem] flex-col gap-3 sm:flex-row sm:gap-0",
          compact ? "mt-7 sm:mt-8" : "mt-8 gap-4 sm:mt-10",
        )}
      >
        {content.stats.map((stat, index) => (
          <HeroStat
            key={stat.label}
            value={stat.value}
            label={stat.label}
            icon={stat.icon}
            showDivider={index < content.stats.length - 1}
            compact={compact}
          />
        ))}
      </div>
    </div>
  );
}

function SplitPageHeroVisual({
  content,
  className,
  compact = false,
}: {
  content: PageHeroContent;
  className?: string;
  compact?: boolean;
}) {
  const { image } = content;

  return (
    <div className={cn("relative w-full", className)}>
      <div
        className={cn(
          "relative w-full overflow-hidden",
          compact
            ? "aspect-[16/10] max-h-[17rem] sm:max-h-[20rem] lg:aspect-[4/3] lg:max-h-[23rem] xl:max-h-[26rem]"
            : "aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/5] xl:aspect-[3/4]",
        )}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          className={cn(
            compact
              ? "object-cover object-center lg:rounded-xl"
              : "object-contain object-center lg:object-right",
          )}
          sizes="(max-width: 1024px) 100vw, 38rem"
        />
      </div>
    </div>
  );
}

export function SplitPageHero({
  content,
  compact = false,
}: {
  content: PageHeroContent;
  compact?: boolean;
}) {
  return (
    <Section background="default" spacing="none" className="border-b border-slate-200/80">
      <Container
        size="wide"
        className={cn("page-hero-padding", compact && "page-hero-padding-compact")}
      >
        <div
          className={cn(
            "flex flex-col lg:flex-row lg:items-center lg:justify-between",
            compact
              ? "gap-5 sm:gap-7 lg:gap-11 xl:gap-14"
              : "gap-5 sm:gap-8 lg:gap-12 xl:gap-16",
          )}
        >
          <div className="hero-copy flex w-full flex-col items-start">
            <SplitPageHeroCopy content={content} compact={compact} />
          </div>

          <div
            className={cn(
              "hero-media order-first w-full lg:order-none",
              compact
                ? "max-w-[36rem] lg:max-w-[34rem] xl:max-w-[36rem]"
                : "max-w-[36rem] lg:max-w-[40rem] xl:max-w-[42rem]",
            )}
          >
            <SplitPageHeroVisual content={content} compact={compact} />
          </div>
        </div>
      </Container>
    </Section>
  );
}

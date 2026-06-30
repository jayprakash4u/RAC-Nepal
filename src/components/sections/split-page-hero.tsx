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
}: {
  value: string;
  label: string;
  icon: { src: string; alt: string };
  showDivider: boolean;
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 items-center gap-3 py-1 sm:gap-3.5",
        showDivider && "border-slate-200 sm:border-r sm:pr-5 lg:pr-6",
      )}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-soft/50 sm:h-12 sm:w-12">
        <div className="relative h-6 w-6 sm:h-7 sm:w-7">
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
        <p className="font-display text-[1.25rem] font-bold leading-none text-navy sm:text-[1.375rem]">
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
}: {
  content: PageHeroContent;
  className?: string;
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

      <h1 className="font-display mt-4 text-[1.75rem] font-bold leading-[1.15] tracking-tight text-pretty sm:mt-5 sm:text-[2.375rem] lg:text-[2.5rem] xl:text-[2.75rem]">
        <span className="text-navy">{content.title}</span>
        <br />
        <span className="text-primary">{content.titleAccent}</span>
      </h1>

      <p className="text-body mt-4 max-w-[32rem] text-pretty leading-relaxed text-slate-600 sm:mt-5">
        {content.description}
      </p>

      <div className="mt-6 flex w-full max-w-[34rem] flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
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

      <div className="mt-8 flex w-full max-w-[34rem] flex-col gap-4 sm:mt-10 sm:flex-row sm:gap-0">
        {content.stats.map((stat, index) => (
          <HeroStat
            key={stat.label}
            value={stat.value}
            label={stat.label}
            icon={stat.icon}
            showDivider={index < content.stats.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

function SplitPageHeroVisual({
  content,
  className,
}: {
  content: PageHeroContent;
  className?: string;
}) {
  const { image } = content;

  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative aspect-[4/3] w-full sm:aspect-[5/4] lg:aspect-[4/5] xl:aspect-[3/4]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          className="object-contain object-center lg:object-right"
          sizes="(max-width: 1024px) 100vw, 38rem"
        />
      </div>
    </div>
  );
}

export function SplitPageHero({ content }: { content: PageHeroContent }) {
  return (
    <Section background="default" spacing="none" className="border-b border-slate-200/80">
      <Container size="wide" className="pt-md pb-2xl lg:pt-lg lg:pb-3xl">
        <div className="flex flex-col gap-8 sm:gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12 xl:gap-16">
          <div className="hero-copy flex w-full flex-col items-start">
            <SplitPageHeroCopy content={content} />
          </div>

          <div className="hero-media order-first w-full max-w-[36rem] lg:order-none lg:max-w-[40rem] xl:max-w-[42rem]">
            <SplitPageHeroVisual content={content} />
          </div>
        </div>
      </Container>
    </Section>
  );
}

import Image from "next/image";
import { heroContent } from "@/data/hero";
import { HeroStat } from "@/components/sections/hero-stats";
import { Button, Container, Section } from "@/components/ui";
import { cn } from "@/lib/cn";

function CalendarIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
      <path
        d="M6 2v2M14 2v2M3.5 7h13M5 4h10a1.5 1.5 0 011.5 1.5v11A1.5 1.5 0 0115 18.5H5A1.5 1.5 0 013.5 17V5.5A1.5 1.5 0 015 4z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HeartCareIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
      <path
        d="M10 16.5s-5.5-3.6-5.5-7.2C4.5 7.2 6.4 5.5 8.4 5.5c1.1 0 2.1.5 2.6 1.3.5-.8 1.5-1.3 2.6-1.3 2 0 3.9 1.7 3.9 3.8C17.5 12.9 10 16.5 10 16.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const statIconTypes = ["expertise", "patients", "conditions"] as const;

function HeroStats() {
  return (
    <div className="mt-md w-full max-w-[30rem] overflow-hidden rounded-xl border border-white/70 bg-white/90 shadow-sm backdrop-blur-sm sm:mt-lg">
      <div className="grid grid-cols-3 divide-x divide-slate-200/90">
        {heroContent.stats.map((stat, index) => (
          <HeroStat
            key={stat.label}
            value={stat.value}
            label={stat.label}
            iconType={statIconTypes[index] ?? "expertise"}
          />
        ))}
      </div>
    </div>
  );
}

function HeroCopy({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-start", className)}>
      <p className="font-display text-[0.6875rem] font-semibold tracking-[0.14em] text-primary uppercase sm:text-eyebrow sm:tracking-[0.16em]">
        {heroContent.eyebrow}
      </p>

      <h1 className="mt-sm w-full text-pretty font-display text-[1.75rem] leading-[1.14] font-normal tracking-[-0.02em] text-navy sm:text-[2.125rem] lg:text-[2.5rem] xl:text-[2.75rem]">
        {heroContent.title}{" "}
        <span className="text-primary">{heroContent.titleAccent}</span>
      </h1>

      <span
        aria-hidden="true"
        className="mt-sm block h-1 w-12 rounded-full bg-primary sm:w-14"
      />

      <p className="text-body mt-sm max-w-[30rem] text-pretty leading-relaxed text-slate-600 sm:mt-md">
        {heroContent.description}
      </p>

      <div className="mt-md flex w-full max-w-[30rem] flex-col gap-sm sm:flex-row sm:flex-wrap sm:items-center">
        <Button
          href={heroContent.primaryCta.href}
          size="lg"
          className="w-full whitespace-normal sm:w-auto sm:whitespace-nowrap"
        >
          <CalendarIcon />
          {heroContent.primaryCta.label}
        </Button>
        <Button
          href={heroContent.secondaryCta.href}
          variant="outline"
          size="lg"
          className="w-full whitespace-normal sm:w-auto sm:whitespace-nowrap"
        >
          <HeartCareIcon />
          {heroContent.secondaryCta.label}
        </Button>
      </div>

      <HeroStats />
    </div>
  );
}

function HeroVisual({ className }: { className?: string }) {
  const { image } = heroContent;

  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative overflow-hidden rounded-2xl shadow-[0_22px_50px_-32px_rgba(11,93,107,0.35)] ring-1 ring-primary/10 lg:rounded-3xl">
        <div className="relative aspect-[5/4] w-full sm:aspect-[16/11] lg:aspect-[16/12]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            className="object-cover object-center sm:object-[84%_center] lg:object-right"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 34rem"
          />
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <Section
      background="hero"
      spacing="none"
      className="border-b border-primary-dark/10"
    >
      <Container
        size="wide"
        className="pt-md pb-xl sm:pt-2xl sm:pb-2xl lg:pt-[var(--spacing-section-y-lg)] lg:pb-[var(--spacing-3xl)]"
      >
        <div className="flex flex-col gap-lg sm:gap-xl lg:flex-row lg:items-center lg:justify-between lg:gap-3xl">
          <div className="hero-copy flex w-full flex-col items-start">
            <HeroCopy />
          </div>

          <div className="hero-media order-first w-full max-w-[34rem] lg:order-none lg:max-w-[36rem] xl:max-w-[38rem]">
            <HeroVisual />
          </div>
        </div>
      </Container>
    </Section>
  );
}

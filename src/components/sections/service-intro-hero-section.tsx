import Image from "next/image";
import Link from "next/link";
import { Container, Section } from "@/components/ui";
import type { ServiceIntroHeroSectionData } from "@/types/service-content";
import { cn } from "@/lib/cn";

function CheckBadge({ variant }: { variant: "primary" | "outline" }) {
  return (
    <span
      className={cn(
        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
        variant === "primary"
          ? "bg-white/20 text-white"
          : "bg-primary/10 text-primary",
      )}
    >
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-3.5 w-3.5">
        <path
          d="M3.5 8.25l2.75 2.75L12.5 5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function StatItem({
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
        "flex min-w-0 flex-1 items-center gap-3 px-4 py-5 sm:gap-4 sm:px-5 sm:py-6",
        showDivider && "border-slate-200 sm:border-r",
      )}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-soft/45 sm:h-14 sm:w-14">
        <div className="relative h-7 w-7 sm:h-8 sm:w-8">
          <Image
            src={icon.src}
            alt={icon.alt}
            fill
            className="object-contain"
            sizes="2rem"
            unoptimized
          />
        </div>
      </div>

      <div className="min-w-0">
        <p className="font-display text-[1.375rem] font-bold leading-none text-navy sm:text-[1.5rem]">
          {value}
        </p>
        <p className="mt-1 text-[0.75rem] leading-snug text-slate-600 sm:text-[0.8125rem]">
          {label}
        </p>
      </div>
    </div>
  );
}

function HeroSideImage({ image }: { image: { src: string; alt: string } }) {
  return (
    <div className="flex h-full w-full justify-center self-stretch lg:justify-end">
      <div className="relative min-h-[14rem] w-full overflow-hidden rounded-2xl shadow-[0_16px_40px_-28px_rgba(15,23,42,0.28)] sm:min-h-[22rem] lg:min-h-[28rem] xl:min-h-[32rem]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover object-[center_20%]"
          sizes="(max-width: 1024px) 90vw, 40rem"
          priority
        />
      </div>
    </div>
  );
}

export function ServiceIntroHeroSection({
  section,
}: {
  section: ServiceIntroHeroSectionData;
}) {
  return (
    <Section background="default" spacing="default">
      <Container size="wide">
        <div className="relative">
          <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-12">
            <div className="flex flex-col justify-center lg:py-2">
              <div className="flex items-center gap-2.5">
                <div className="relative h-8 w-8 shrink-0 sm:h-9 sm:w-9">
                  <Image
                    src={section.eyebrowIcon.src}
                    alt={section.eyebrowIcon.alt}
                    fill
                    className="object-contain"
                    sizes="2.25rem"
                    priority
                    unoptimized
                  />
                </div>
                <p className="font-display text-eyebrow font-semibold tracking-[0.16em] text-primary uppercase">
                  {section.eyebrow}
                </p>
              </div>

              <h1 className="font-display mt-5 text-[1.625rem] font-semibold leading-[1.12] tracking-tight text-pretty sm:mt-6 sm:text-[2.5rem] lg:text-[2.75rem]">
                <span className="text-navy">{section.title.prefix} </span>
                <span className="text-primary">{section.title.highlight}</span>
              </h1>

              <p className="mt-5 max-w-[32rem] text-small leading-relaxed text-slate-600 sm:mt-6 sm:text-body">
                {section.description}
              </p>

              <div className="mt-7 flex w-full flex-col gap-3 sm:mt-8 sm:max-w-[20rem]">
                <Link
                  href={section.primaryCta.href}
                  className={cn(
                    "inline-flex h-12 items-center justify-center gap-3 rounded-full bg-primary px-6",
                    "text-body font-medium text-white transition-colors duration-300 hover:bg-primary-dark",
                  )}
                >
                  <CheckBadge variant="primary" />
                  {section.primaryCta.label}
                </Link>

                <Link
                  href={section.secondaryCta.href}
                  className={cn(
                    "inline-flex h-12 items-center justify-center gap-3 rounded-full border-2 border-primary bg-transparent px-6",
                    "text-body font-medium text-primary transition-colors duration-300 hover:bg-primary-soft/30",
                  )}
                >
                  <CheckBadge variant="outline" />
                  {section.secondaryCta.label}
                </Link>
              </div>
            </div>

            <HeroSideImage image={section.sideImage} />
          </div>

          <div
            className={cn(
              "relative z-10 mt-6 overflow-hidden rounded-t-2xl border border-slate-100 bg-white sm:-mt-8",
              "shadow-[0_12px_40px_-20px_rgba(15,23,42,0.14)]",
            )}
          >
            <div className="grid grid-cols-1 divide-y divide-slate-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4 lg:divide-y-0">
              {section.stats.map((stat, index) => (
                <StatItem
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  icon={stat.icon}
                  showDivider={index < section.stats.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

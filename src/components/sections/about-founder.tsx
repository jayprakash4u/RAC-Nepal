import Link from "next/link";
import Image from "next/image";
import {
  aboutFounderSection,
  type BioSegment,
  type FounderStat,
} from "@/data/about-founder";
import { Container, Section } from "@/components/ui";
import { cn } from "@/lib/cn";

function FounderStatItem({
  value,
  label,
  icon,
  showDivider,
}: FounderStat & { showDivider: boolean }) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 items-center gap-3 px-4 py-4 sm:gap-4 sm:px-5 sm:py-5",
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

function FounderPortrait({
  image,
}: {
  image: { src: string; alt: string; width: number; height: number };
}) {
  return (
    <div className="flex h-full w-full justify-center self-stretch lg:justify-end">
      <div className="relative w-full max-w-[20rem] overflow-hidden rounded-2xl bg-linear-to-b from-primary-soft/20 to-white shadow-[0_22px_50px_-32px_rgba(15,23,42,0.28)] sm:max-w-[24rem] lg:max-w-[28rem]">
        <div className="relative aspect-[4/5] w-full">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-contain object-bottom p-4 sm:p-5"
            sizes="(max-width: 1024px) 88vw, 28rem"
            priority
          />
        </div>
      </div>
    </div>
  );
}

function FounderBio({ segments }: { segments: readonly BioSegment[] }) {
  return (
    <p className="max-w-[36rem] text-small leading-[1.85] text-pretty text-slate-600 sm:text-[0.9375rem]">
      {segments.map((segment, index) => {
        if (segment.type === "link") {
          return (
            <Link
              key={`${segment.label}-${index}`}
              href={segment.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline-offset-2 transition-colors duration-normal hover:text-primary-dark hover:underline"
            >
              {segment.label}
            </Link>
          );
        }

        return <span key={index}>{segment.value}</span>;
      })}
    </p>
  );
}

export function AboutFounder() {
  const { badge, title, founderName, founderRole, intro, image, stats, bio } =
    aboutFounderSection;

  return (
    <Section background="default" spacing="default">
      <Container size="wide">
        <div className="relative">
          <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-12">
            <div className="order-2 flex flex-col justify-center pb-2 lg:order-1 lg:pb-8 lg:py-2">
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="h-[3px] w-8 shrink-0 rounded-full bg-primary"
                />
                <p className="font-display text-eyebrow font-semibold tracking-[0.16em] text-primary uppercase">
                  {badge}
                </p>
              </div>

              <h2 className="font-display mt-4 text-[1.875rem] font-semibold leading-[1.12] tracking-tight text-pretty sm:mt-5 sm:text-[2.25rem] lg:text-[2.5rem]">
                <span className="text-navy">{title.prefix} </span>
                <span className="text-primary">{title.highlight}</span>
              </h2>

              <div className="mt-4 max-w-[36rem] sm:mt-5">
                <p className="font-display text-[1rem] font-semibold text-navy sm:text-body">
                  {founderName}
                </p>
                <p className="mt-1 text-small text-primary">{founderRole}</p>
              </div>

              <p className="mt-5 max-w-[36rem] text-small leading-relaxed text-slate-600 sm:mt-6 sm:text-body">
                {intro}
              </p>

              <div
                aria-hidden="true"
                className="mt-6 h-px w-full max-w-[36rem] bg-slate-200 sm:mt-7"
              />

              <div className="mt-6 sm:mt-7">
                <FounderBio segments={bio} />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <FounderPortrait image={image} />
            </div>
          </div>

          <div
            className={cn(
              "relative z-10 mt-8 overflow-hidden rounded-2xl border border-slate-100 bg-white sm:mt-10",
              "shadow-[0_12px_40px_-20px_rgba(15,23,42,0.14)]",
            )}
          >
            <div className="grid grid-cols-1 divide-y divide-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {stats.map((stat, index) => (
                <FounderStatItem
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  icon={stat.icon}
                  showDivider={index < stats.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

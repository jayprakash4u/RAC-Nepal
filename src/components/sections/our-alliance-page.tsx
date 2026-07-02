import Link from "next/link";
import { SplitPageHero } from "@/components/sections/split-page-hero";
import { ourAlliancePage } from "@/data/our-alliance-page";
import {
  ServiceCardHoverOverlay,
  serviceIconCardClasses,
} from "@/components/sections/service-icon-card";
import { Container, Section } from "@/components/ui";
import { cn } from "@/lib/cn";

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: { prefix: string; highlight: string };
  description?: string;
}) {
  return (
    <header className="mx-auto flex max-w-[42rem] flex-col items-center text-center">
      {eyebrow ? (
        <p className="font-display text-eyebrow font-semibold tracking-[0.18em] text-primary uppercase">
          {eyebrow}
        </p>
      ) : null}

      <h2
        className={cn(
          "font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-pretty text-navy sm:text-h2 lg:text-[2.375rem]",
          eyebrow && "mt-sm",
        )}
      >
        <span>{title.prefix} </span>
        <span className="text-primary">{title.highlight}</span>
      </h2>

      <span
        aria-hidden="true"
        className="mt-md block h-1 w-14 rounded-full bg-primary"
      />

      {description ? (
        <p className="text-body mt-md text-pretty text-slate-600">{description}</p>
      ) : null}
    </header>
  );
}

export function OurAllianceHero() {
  const { hero } = ourAlliancePage;

  return (
    <SplitPageHero content={hero} compact />
  );
}

export function OurAllianceTrustedBy() {
  const { trustedBy } = ourAlliancePage;

  return (
    <Section background="surface" spacing="default" className="border-y border-slate-200">
      <Container size="wide">
        <SectionHeading
          eyebrow={trustedBy.eyebrow}
          title={trustedBy.title}
          description={trustedBy.description}
        />

        <ul className="section-content grid grid-cols-2 gap-sm sm:grid-cols-3 sm:gap-md lg:grid-cols-4 xl:grid-cols-6">
          {trustedBy.items.map((item, index) => (
            <li
              key={item.name}
              className="motion-safe:animate-[fadeIn_0.55s_ease-out_both] motion-reduce:animate-none"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <article
                className={cn(
                  "group flex h-full flex-col items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white px-sm py-md text-center shadow-[0_6px_18px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-[0_12px_28px_rgba(20,150,168,0.14)]",
                  "grayscale opacity-80 hover:grayscale-0 hover:opacity-100",
                  "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                )}
              >
                <span className="font-display text-small font-bold tracking-wide text-slate-700 transition-colors duration-300 group-hover:text-primary">
                  {item.name}
                </span>
                <span className="text-[0.7rem] leading-snug tracking-[0.08em] text-slate-500 uppercase transition-colors duration-300 group-hover:text-primary/80">
                  {item.type}
                </span>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

const allianceTypeIcons = {
  hospital: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path
        d="M4 21V6a1 1 0 0 1 1-1h5V3h4v2h5a1 1 0 0 1 1 1v15M4 21h16M9 21v-4h6v4M12 8v4M10 10h4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  lab: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path
        d="M9 3h6M10 3v6l-4.5 8.2A2 2 0 0 0 7.3 20h9.4a2 2 0 0 0 1.8-2.8L14 9V3M8 14h8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  pharmacy: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path
        d="M10.5 3.5 3.5 10.5a4.95 4.95 0 0 0 7 7l7-7a4.95 4.95 0 0 0-7-7ZM7 7l10 10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  insurance: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path
        d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3ZM9.5 12l1.8 1.8L15 10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
} as const;

export function OurAllianceTypes() {
  const { allianceTypes } = ourAlliancePage;

  return (
    <Section background="surface" spacing="default" className="border-y border-slate-200">
      <Container size="wide">
        <SectionHeading
          eyebrow={allianceTypes.eyebrow}
          title={allianceTypes.title}
          description={allianceTypes.description}
        />

        <ul className="section-content grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-4 lg:gap-lg">
          {allianceTypes.items.map((item, index) => (
            <li
              key={item.title}
              className="flex motion-safe:animate-[fadeIn_0.55s_ease-out_both] motion-reduce:animate-none"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <article
                className={cn(
                  serviceIconCardClasses,
                  "items-start px-md py-lg sm:px-lg sm:py-xl",
                  "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                )}
              >
                <ServiceCardHoverOverlay />

                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft/60 text-primary transition-transform duration-300 group-hover:scale-105"
                >
                  {allianceTypeIcons[item.icon]}
                </span>

                <h3 className="mt-md text-body font-bold text-navy transition-colors duration-300 group-hover:text-primary">
                  {item.title}
                </h3>
                <p className="mt-sm text-small leading-relaxed text-slate-600">
                  {item.description}
                </p>

                <span
                  aria-hidden="true"
                  className="mt-md block h-0.5 w-8 rounded-full bg-primary transition-all duration-300 group-hover:w-10"
                />
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export function OurAllianceCollaborationImpact() {
  const { collaborationImpact } = ourAlliancePage;

  return (
    <Section
      background="hero"
      spacing="default"
      className="relative overflow-hidden border-y border-primary-dark/10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
      />

      <Container size="wide" className="relative">
        <SectionHeading
          eyebrow={collaborationImpact.eyebrow}
          title={collaborationImpact.title}
          description={collaborationImpact.description}
        />

        <ul className="section-content grid grid-cols-1 gap-md sm:grid-cols-3 sm:gap-lg">
          {collaborationImpact.stats.map((stat, index) => (
            <li
              key={stat.label}
              className={cn(
                "motion-safe:animate-[fadeIn_0.55s_ease-out_both] motion-reduce:animate-none",
                index > 0 && "sm:border-l sm:border-primary/15 sm:pl-lg",
              )}
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className="flex flex-col items-center rounded-2xl border border-white/60 bg-white/80 px-lg py-xl text-center shadow-[0_10px_30px_rgba(20,150,168,0.1)] backdrop-blur-sm">
                <p className="font-display text-[2.5rem] font-bold leading-none tracking-tight text-primary sm:text-[3rem] lg:text-[3.25rem]">
                  {stat.value}
                </p>
                <p className="mt-sm text-body font-semibold text-navy">{stat.label}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export function OurAllianceKeyPartners() {
  const { keyPartners } = ourAlliancePage;

  return (
    <Section background="default" spacing="default">
      <Container size="wide">
        <SectionHeading
          eyebrow={keyPartners.eyebrow}
          title={keyPartners.title}
          description={keyPartners.description}
        />

        <ul className="section-content grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-4 lg:gap-lg">
          {keyPartners.items.map((item, index) => (
            <li
              key={item.name}
              className="motion-safe:animate-[fadeIn_0.55s_ease-out_both] motion-reduce:animate-none"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <article
                className={cn(
                  serviceIconCardClasses,
                  "h-full items-start px-md py-lg sm:px-lg sm:py-xl",
                  "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                )}
              >
                <ServiceCardHoverOverlay />

                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft/60 font-display text-small font-bold tracking-wide text-primary"
                >
                  {item.logoText}
                </span>

                <h3 className="mt-md text-body font-bold text-navy transition-colors duration-300 group-hover:text-primary">
                  {item.name}
                </h3>

                <p className="mt-sm text-small leading-relaxed text-slate-600">
                  {item.description}
                </p>

                {item.href ? (
                  <Link
                    href={item.href}
                    className="mt-md inline-flex items-center gap-2 text-small font-semibold text-primary transition-colors hover:text-primary-dark"
                  >
                    View Details
                    <span aria-hidden="true">→</span>
                  </Link>
                ) : null}
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

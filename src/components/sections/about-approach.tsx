"use client";

import Image from "next/image";
import { aboutApproachSection } from "@/data/about-approach";
import { ResponsiveItemCarousel } from "@/components/sections/responsive-item-carousel";
import {
  ServiceCardHoverOverlay,
  serviceIconCardClasses,
  serviceIconCardElevatedClasses,
  serviceIconImageElevatedClasses,
  serviceIconRingClasses,
  serviceIconRingElevatedClasses,
} from "@/components/sections/service-icon-card";
import { Container, Section } from "@/components/ui";
import { cn } from "@/lib/cn";

function ApproachHeader() {
  const { eyebrow, title, description } = aboutApproachSection;

  return (
    <header className="section-intro mx-auto flex max-w-[40rem] flex-col items-center text-center">
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="h-px w-10 bg-primary sm:w-12" />
        <p className="font-display text-eyebrow font-semibold tracking-[0.18em] text-primary uppercase">
          {eyebrow}
        </p>
        <span aria-hidden="true" className="h-px w-10 bg-primary sm:w-12" />
      </div>

      <h2 className="font-display mt-sm text-h2 font-bold leading-[1.15] tracking-tight text-pretty text-navy lg:text-[2.5rem]">
        {title.prefix}{" "}
        <span className="text-primary">{title.highlight}</span>
      </h2>

      <span
        aria-hidden="true"
        className="mt-sm block h-1 w-14 rounded-full bg-primary"
      />

      <p className="text-body mt-md text-pretty text-slate-600">{description}</p>
    </header>
  );
}

function CardDotPattern() {
  return (
    <div
      aria-hidden="true"
      className="mt-auto grid grid-cols-5 gap-1.5 pt-lg"
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <span
          key={index}
          className="mx-auto h-1.5 w-1.5 rounded-full bg-primary/20 transition-colors duration-300 group-hover:bg-primary/35"
        />
      ))}
    </div>
  );
}

function CardWave() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 240 48"
      preserveAspectRatio="none"
      className="pointer-events-none absolute right-0 bottom-0 left-0 h-12 w-full text-primary/10 transition-colors duration-300 group-hover:text-primary/15"
    >
      <path
        fill="currentColor"
        d="M0 32c30-18 50-18 80 0s50 18 80 0 50-18 80 0v16H0V32z"
      />
    </svg>
  );
}

function ApproachCard({
  title,
  description,
  icon,
  accent,
  elevated = false,
}: {
  title: string;
  description: string;
  icon: { src: string; alt: string };
  accent: "primary" | "navy";
  elevated?: boolean;
}) {
  return (
    <article
      className={cn(
        serviceIconCardClasses,
        "items-center bg-gradient-to-b from-white to-primary-soft/15 px-md py-xl text-center sm:px-lg sm:py-2xl",
        elevated && serviceIconCardElevatedClasses,
        !elevated && "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
      )}
    >
      <ServiceCardHoverOverlay active={elevated} />
      <CardWave />

      <div className="relative z-10 flex w-full flex-col items-center">
        <div
        className={cn(
          serviceIconRingClasses,
          "h-20 w-20 p-2.5 sm:h-[5.5rem] sm:w-[5.5rem] sm:p-3",
          elevated && serviceIconRingElevatedClasses,
        )}
      >
        <Image
          src={icon.src}
          alt={icon.alt}
          width={128}
          height={128}
          className={cn(
            "service-icon-bounce h-full w-full object-contain transition-transform duration-300",
            elevated
              ? serviceIconImageElevatedClasses
              : "group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100",
          )}
            sizes="5rem"
            unoptimized
          />
        </div>

        <span
          aria-hidden="true"
          className={cn(
            "mt-md block h-1 rounded-full transition-all duration-300",
            accent === "primary" ? "bg-primary" : "bg-navy",
            elevated ? "w-10" : "w-8 group-hover:w-10",
          )}
        />

        <h3
          className={cn(
            "mt-md text-body font-bold transition-colors duration-300",
            elevated ? "text-primary" : "text-navy group-hover:text-primary",
          )}
        >
          {title}
        </h3>

        <p className="mt-sm max-w-[14rem] text-small leading-relaxed text-slate-600 transition-colors duration-300 group-hover:text-slate-700">
          {description}
        </p>
      </div>

      <CardDotPattern />
    </article>
  );
}

export function AboutApproach() {
  const accents = ["primary", "navy", "primary", "navy"] as const;

  return (
    <Section background="default" spacing="default">
      <Container size="wide">
        <ApproachHeader />

        <ResponsiveItemCarousel
          items={aboutApproachSection.items}
          getItemKey={(item) => item.id}
          ariaLabel="Our approach"
          dotLabel={(item) => `Go to ${item.title}`}
          mobileCarouselClassName="section-content sm:hidden"
          desktopGridClassName="section-content grid-cols-1 gap-lg sm:grid-cols-2 lg:grid-cols-4 lg:gap-xl"
          listItemClassName="flex"
          renderItem={(item, { elevated }) => {
            const index = aboutApproachSection.items.findIndex(
              (entry) => entry.id === item.id,
            );

            return (
              <ApproachCard
                title={item.title}
                description={item.description}
                icon={item.icon}
                accent={accents[index] ?? "primary"}
                elevated={elevated}
              />
            );
          }}
        />
      </Container>
    </Section>
  );
}

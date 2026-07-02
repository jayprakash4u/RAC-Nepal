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
import { Container, Section, SectionHeader } from "@/components/ui";
import { cn } from "@/lib/cn";

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
        "items-center bg-gradient-to-b from-white to-primary-soft/15 px-md py-lg text-center sm:px-md sm:py-lg",
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
            "h-[4.75rem] w-[4.75rem] bg-primary-soft/35 p-2.5 sm:h-20 sm:w-20 sm:p-3",
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

        <p
          className={cn(
            "mt-md text-[0.8125rem] font-semibold leading-snug tracking-normal transition-colors duration-300 sm:text-small",
            elevated ? "text-primary" : "text-navy group-hover:text-primary",
          )}
        >
          {title}
        </p>

        <p className="mt-1 max-w-[14rem] text-[0.75rem] leading-relaxed text-slate-600 transition-colors duration-300 group-hover:text-slate-700 sm:text-[0.8125rem]">
          {description}
        </p>

        <span
          aria-hidden="true"
          className={cn(
            "mt-md block h-0.5 rounded-full transition-all duration-300",
            accent === "primary" ? "bg-primary" : "bg-navy",
            elevated ? "w-10" : "w-8 group-hover:w-10",
          )}
        />
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
        <SectionHeader
          align="center"
          eyebrow={aboutApproachSection.eyebrow}
          title={aboutApproachSection.title}
          description={aboutApproachSection.description}
          decoratedEyebrow
          className="section-intro mx-auto"
        />

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

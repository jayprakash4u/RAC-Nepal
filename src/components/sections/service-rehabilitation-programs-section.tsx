"use client";

import Image from "next/image";
import { ResponsiveItemCarousel } from "@/components/sections/responsive-item-carousel";
import { Container, Section } from "@/components/ui";
import {
  ServiceCardHoverOverlay,
  serviceIconCardClasses,
  serviceIconCardElevatedClasses,
  serviceIconRingClasses,
  serviceIconRingElevatedClasses,
} from "@/components/sections/service-icon-card";
import type { ServiceRehabilitationProgramsSectionData } from "@/types/service-content";
import { cn } from "@/lib/cn";

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className={cn("h-3.5 w-3.5", className)}
    >
      <path
        d="M4 10h12M11 5l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProgramCard({
  title,
  description,
  photo,
  icon,
  elevated = false,
}: {
  title: string;
  description: string;
  photo: { src: string; alt: string };
  icon: { src: string; alt: string };
  elevated?: boolean;
}) {
  return (
    <article
      className={cn(
        serviceIconCardClasses,
        "relative flex h-full w-full flex-col overflow-hidden rounded-2xl",
        elevated
          ? cn(
              serviceIconCardElevatedClasses,
              "shadow-[0_18px_36px_-16px_color-mix(in_srgb,var(--color-primary)_42%,transparent)]",
            )
          : "hover:-translate-y-2 hover:shadow-[0_18px_36px_-16px_color-mix(in_srgb,var(--color-primary)_42%,transparent)]",
        !elevated && "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
      )}
    >
      <ServiceCardHoverOverlay active={elevated} />

      <div className="relative aspect-[5/4] shrink-0 overflow-hidden rounded-t-2xl bg-slate-100">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className={cn(
            "object-cover object-center transition-transform duration-500 ease-out motion-reduce:transition-none motion-reduce:group-hover:scale-100",
            elevated
              ? "scale-[1.04]"
              : "group-hover:scale-[1.04]",
          )}
          sizes="(max-width: 640px) 46vw, (max-width: 1024px) 22vw, 18vw"
        />
      </div>

      <div className="relative flex min-h-[6.5rem] flex-1 flex-col px-4 pb-4 pt-9 sm:px-[1.125rem] sm:pb-[1.125rem]">
        <div
          className={cn(
            serviceIconRingClasses,
            "absolute top-0 left-2.5 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center sm:left-3",
            "overflow-hidden shadow-[0_3px_12px_-2px_rgba(15,23,42,0.14)]",
            elevated && serviceIconRingElevatedClasses,
          )}
        >
          <div className="relative h-[70%] w-[70%]">
            <Image
              src={icon.src}
              alt={icon.alt}
              fill
              className="service-icon-bounce scale-[1.28] object-contain object-center"
              sizes="2.5rem"
              unoptimized
            />
          </div>
        </div>

        <div className="flex flex-1 items-end justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p
              className={cn(
                "text-[0.8125rem] font-semibold leading-snug tracking-normal transition-colors duration-300 sm:text-small",
                elevated ? "text-primary" : "text-navy group-hover:text-primary",
              )}
            >
              {title}
            </p>

            <span
              aria-hidden="true"
              className={cn(
                "mt-1 block h-0.5 rounded-full bg-primary transition-all duration-300",
                elevated ? "w-8" : "w-0 group-hover:w-8",
              )}
            />

            <p
              className={cn(
                "mt-1.5 text-[0.8125rem] leading-relaxed transition-colors duration-300",
                elevated ? "text-slate-700" : "text-slate-600 group-hover:text-slate-700",
              )}
            >
              {description}
            </p>
          </div>

          <span
            aria-hidden="true"
            className={cn(
              "mb-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white",
              "transition-all duration-300 ease-out",
              elevated
                ? "scale-110 bg-primary-dark"
                : "group-hover:scale-110 group-hover:bg-primary-dark",
              "motion-reduce:transition-none motion-reduce:group-hover:scale-100",
            )}
          >
            <ArrowIcon
              className={cn(
                "transition-transform duration-300 motion-reduce:transition-none",
                elevated ? "translate-x-0.5" : "group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0",
              )}
            />
          </span>
        </div>
      </div>
    </article>
  );
}

export function ServiceRehabilitationProgramsSection({
  section,
}: {
  section: ServiceRehabilitationProgramsSectionData;
}) {
  return (
    <Section
      background="surface"
      spacing="default"
      className="border-t border-slate-200"
    >
      <Container size="wide">
        <header className="mx-auto flex max-w-[42rem] flex-col items-center text-center">
          <p className="font-display text-eyebrow font-semibold tracking-[0.18em] text-primary uppercase">
            {section.eyebrow ?? "Our Rehabilitation Programs"}
          </p>

          <h2 className="font-display mt-sm text-[1.75rem] font-semibold leading-tight tracking-tight text-pretty text-navy sm:mt-md sm:text-h2 lg:text-[2.375rem]">
            {section.title ?? "Personalized Programs for Your Recovery"}
          </h2>

          <p className="mt-md max-w-[38rem] text-small leading-relaxed text-slate-600 sm:text-[0.9375rem]">
            {section.description ??
              "Evidence-based rehabilitation programs designed to reduce pain, restore function, and improve your quality of life."}
          </p>
        </header>

        <ResponsiveItemCarousel
          items={section.items}
          getItemKey={(item) => item.title}
          ariaLabel="Rehabilitation programs"
          dotLabel={(item) => `Go to ${item.title}`}
          desktopGridClassName="mt-3xl grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6"
          mobileCarouselClassName="mt-xl sm:hidden sm:mt-3xl"
          listItemClassName="flex"
          renderItem={(item, { elevated }) => (
            <ProgramCard
              title={item.title}
              description={item.description}
              photo={item.photo}
              icon={item.icon}
              elevated={elevated}
            />
          )}
        />
      </Container>
    </Section>
  );
}

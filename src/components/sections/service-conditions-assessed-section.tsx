"use client";

import Image from "next/image";
import Link from "next/link";
import { ResponsiveItemCarousel } from "@/components/sections/responsive-item-carousel";
import { Container, Section, SectionHeader } from "@/components/ui";
import type { ServiceConditionsAssessedSectionData } from "@/types/service-content";
import { cn } from "@/lib/cn";

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-3.5 w-3.5 transition-transform duration-normal group-hover:translate-x-0.5"
    >
      <path
        d="M4 10h12M11 5l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ConditionAssessedCard({
  label,
  href,
  image,
  elevated = false,
}: {
  label: string;
  href: string;
  image?: { src: string; alt: string };
  elevated?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full w-full flex-col overflow-hidden rounded-lg",
        "border border-slate-200 bg-white",
        "transition-colors duration-normal",
        elevated ? "border-primary/35 bg-white" : "hover:border-primary/35",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        elevated &&
          "-translate-y-1 shadow-[0_14px_30px_-14px_color-mix(in_srgb,var(--color-primary)_38%,transparent)] motion-reduce:translate-y-0",
        !elevated && "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
      )}
    >
      <div
        className={cn(
          "relative flex h-36 w-full items-center justify-center border-b border-slate-100 bg-white p-md transition-colors duration-normal",
          elevated ? "bg-slate-50" : "group-hover:bg-slate-50",
        )}
      >
        {image?.src ? (
          <div className="relative h-full w-full">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 12vw"
            />
          </div>
        ) : null}
      </div>

      <div className="border-t border-slate-100 px-md py-sm">
        <h3
          className={cn(
            "text-center text-small font-semibold leading-snug transition-colors duration-normal",
            elevated ? "text-primary" : "text-navy group-hover:text-primary",
          )}
        >
          {label}
        </h3>

        <span
          aria-hidden="true"
          className={cn(
            "mt-xs flex items-center justify-center gap-1",
            "text-[0.8125rem] font-medium text-primary",
            "transition-opacity duration-normal",
            elevated ? "opacity-100" : "opacity-0 group-hover:opacity-100",
          )}
        >
          View details
          <ArrowIcon />
        </span>
      </div>
    </Link>
  );
}

export function ServiceConditionsAssessedSection({
  section,
}: {
  section: ServiceConditionsAssessedSectionData;
}) {
  return (
    <Section
      background="surface"
      spacing="default"
      className="border-t border-slate-200"
    >
      <Container size="wide">
        <SectionHeader
          eyebrow={section.eyebrow ?? "What We Evaluate"}
          title={
            section.title ?? {
              prefix: "Conditions We",
              highlight: "Assess",
            }
          }
          align="center"
          className="mx-auto"
        />

        <ResponsiveItemCarousel
          items={section.items}
          getItemKey={(item) => item.label}
          ariaLabel="Conditions assessed"
          dotLabel={(item) => `Go to ${item.label}`}
          desktopGridClassName="mt-3xl grid-cols-2 gap-md md:grid-cols-3 lg:grid-cols-5 lg:gap-lg"
          mobileCarouselClassName="mt-xl sm:hidden sm:mt-3xl"
          listItemClassName="flex"
          renderItem={(item, { elevated }) => (
            <ConditionAssessedCard
              label={item.label}
              href={item.href}
              image={item.image}
              elevated={elevated}
            />
          )}
        />
      </Container>
    </Section>
  );
}

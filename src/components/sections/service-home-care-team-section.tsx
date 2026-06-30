"use client";

import Image from "next/image";
import { ResponsiveItemCarousel } from "@/components/sections/responsive-item-carousel";
import { Container, Section } from "@/components/ui";
import {
  ServiceCardHoverOverlay,
  serviceIconRingClasses,
  serviceIconRingElevatedClasses,
} from "@/components/sections/service-icon-card";
import type { ServiceHomeCareTeamSectionData } from "@/types/service-content";
import { cn } from "@/lib/cn";

function TeamMemberCard({
  title,
  subtitle,
  image,
  elevated = false,
}: {
  title: string;
  subtitle: string;
  image: { src: string; alt: string };
  elevated?: boolean;
}) {
  return (
    <article
      className={cn(
        "group relative flex h-full w-full flex-col items-center overflow-hidden",
        "rounded-2xl border border-slate-200/80 border-b-[3px] border-b-primary/70 bg-white",
        "px-md py-lg text-center shadow-sm sm:px-lg sm:py-xl",
        "transition-all duration-300 ease-out",
        elevated
          ? "-translate-y-1.5 border-primary/25 shadow-[0_14px_30px_-14px_color-mix(in_srgb,var(--color-primary)_38%,transparent)] motion-reduce:translate-y-0"
          : "hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-[0_14px_30px_-14px_color-mix(in_srgb,var(--color-primary)_38%,transparent)]",
        !elevated && "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
      )}
    >
      <ServiceCardHoverOverlay active={elevated} />

      <div
        className={cn(
          serviceIconRingClasses,
          "h-[5.5rem] w-[5.5rem] border-primary/20 bg-primary-soft/35 p-2.5 sm:h-24 sm:w-24 sm:p-3",
          elevated && serviceIconRingElevatedClasses,
        )}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={160}
          height={160}
          className={cn(
            "service-icon-bounce h-full w-full object-contain transition-transform duration-300",
            elevated ? "scale-105" : "group-hover:scale-105",
          )}
          sizes="6rem"
          unoptimized
        />
      </div>

      <p
        className={cn(
          "mt-lg text-body font-semibold leading-snug transition-colors duration-300",
          elevated ? "text-primary" : "text-navy group-hover:text-primary",
        )}
      >
        {title}
      </p>

      <span
        aria-hidden="true"
        className={cn(
          "mt-sm block h-0.5 rounded-full bg-primary transition-all duration-300",
          elevated ? "w-12" : "w-10 group-hover:w-12",
        )}
      />

      <p className="mt-sm text-small font-medium leading-snug text-navy/85">
        {subtitle}
      </p>
    </article>
  );
}

export function ServiceHomeCareTeamSection({
  section,
}: {
  section: ServiceHomeCareTeamSectionData;
}) {
  const title = section.title ?? {
    prefix: "Meet Our",
    highlight: "Home Care Team",
  };

  return (
    <Section
      background="default"
      spacing="default"
      className="border-t border-slate-200"
    >
      <Container size="wide">
        <header className="mx-auto flex max-w-[42rem] flex-col items-center text-center">
          <h2 className="font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-pretty sm:text-h2 lg:text-[2.375rem]">
            <span className="text-navy">{title.prefix} </span>
            <span className="text-primary">{title.highlight}</span>
          </h2>

          <span
            aria-hidden="true"
            className="mt-md block h-1 w-14 rounded-full bg-primary"
          />
        </header>

        <ResponsiveItemCarousel
          items={section.items}
          getItemKey={(item) => item.title}
          ariaLabel="Home care team"
          dotLabel={(item) => `Go to ${item.title}`}
          desktopGridClassName="mt-3xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
          mobileCarouselClassName="mt-xl sm:hidden sm:mt-3xl"
          listItemClassName="flex"
          renderItem={(item, { elevated }) => (
            <TeamMemberCard
              title={item.title}
              subtitle={item.subtitle}
              image={item.image}
              elevated={elevated}
            />
          )}
        />
      </Container>
    </Section>
  );
}

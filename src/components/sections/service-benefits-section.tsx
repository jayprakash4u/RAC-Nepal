"use client";

import Image from "next/image";
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
import type { ServiceBenefitsSectionData } from "@/types/service-content";
import { cn } from "@/lib/cn";

function BenefitCard({
  title,
  description,
  icon,
  elevated = false,
}: {
  title: string;
  description: string;
  icon: { src: string; alt: string };
  elevated?: boolean;
}) {
  return (
    <article
      className={cn(
        serviceIconCardClasses,
        "items-center px-sm py-md text-center sm:px-md sm:py-lg",
        elevated && serviceIconCardElevatedClasses,
        !elevated && "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
      )}
    >
      <ServiceCardHoverOverlay active={elevated} />

      <div
        className={cn(
          serviceIconRingClasses,
          "h-[4.75rem] w-[4.75rem] p-2 sm:h-20 sm:w-20 sm:p-2.5",
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
              : "group-hover:scale-105",
          )}
          sizes="5rem"
          unoptimized
        />
      </div>

      <p
        className={cn(
          "mt-md text-[0.9375rem] font-semibold leading-snug tracking-normal transition-colors duration-300 sm:text-body",
          elevated ? "text-primary" : "text-navy group-hover:text-primary",
        )}
      >
        {title}
      </p>

      <p className="mt-2 max-w-[14rem] text-[0.8125rem] leading-relaxed text-slate-600 sm:text-small">
        {description}
      </p>

      <span
        aria-hidden="true"
        className={cn(
          "mt-md block h-0.5 rounded-full bg-primary transition-all duration-300",
          elevated ? "w-10" : "w-8 group-hover:w-10",
        )}
      />
    </article>
  );
}

export function ServiceBenefitsSection({
  section,
}: {
  section: ServiceBenefitsSectionData;
}) {
  const title = section.title ?? {
    prefix: "Benefits of",
    highlight: "Physiotherapy",
  };

  return (
    <Section
      background="surface"
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
          ariaLabel="Service benefits"
          dotLabel={(item) => `Go to ${item.title}`}
          desktopGridClassName="mt-3xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
          mobileCarouselClassName="mt-xl sm:hidden sm:mt-3xl"
          renderItem={(item, { elevated }) => (
            <BenefitCard
              title={item.title}
              description={item.description}
              icon={item.icon}
              elevated={elevated}
            />
          )}
        />
      </Container>
    </Section>
  );
}

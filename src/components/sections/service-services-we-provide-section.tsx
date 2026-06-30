"use client";

import Image from "next/image";
import { ResponsiveItemCarousel } from "@/components/sections/responsive-item-carousel";
import { Container, Section } from "@/components/ui";
import {
  ServiceCardHoverOverlay,
  serviceIconCardClasses,
  serviceIconCardElevatedClasses,
  serviceIconImageElevatedClasses,
  serviceIconRingClasses,
  serviceIconRingElevatedClasses,
} from "@/components/sections/service-icon-card";
import type { ServiceServicesWeProvideSectionData } from "@/types/service-content";
import { cn } from "@/lib/cn";

function ServiceProvideCard({
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
          "h-[4.75rem] w-[4.75rem] border-primary/20 bg-primary-soft/35 p-2 sm:h-20 sm:w-20 sm:p-2.5",
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

      <p className="mt-2 text-[0.8125rem] leading-relaxed text-slate-600 sm:text-small">
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

function ServicesGrid({
  items,
  gridClassName,
}: {
  items: ServiceServicesWeProvideSectionData["items"];
  gridClassName: string;
}) {
  return (
    <ul className={cn("mt-3xl grid gap-3 sm:gap-4", gridClassName)}>
      {items.map((item, index) => (
        <li
          key={item.title}
          className="flex motion-safe:animate-[fadeIn_0.55s_ease-out_both] motion-reduce:animate-none"
          style={{ animationDelay: `${index * 70}ms` }}
        >
          <ServiceProvideCard
            title={item.title}
            description={item.description}
            icon={item.icon}
          />
        </li>
      ))}
    </ul>
  );
}

export function ServiceServicesWeProvideSection({
  section,
}: {
  section: ServiceServicesWeProvideSectionData;
}) {
  const title = section.title ?? {
    prefix: "Home Care Services",
    highlight: "We Provide",
  };
  const headerAlign = section.headerAlign ?? "left";
  const gridColumns = section.gridColumns ?? 4;
  const isInlineTitle = section.titleInline ?? Boolean(title.suffix);

  const gridClassName =
    gridColumns === 3
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      : gridColumns === 2
        ? "grid-cols-1 sm:grid-cols-2"
        : "grid-cols-2 sm:grid-cols-4";

  const useMobileCarousel = gridColumns === 4;

  return (
    <Section
      background="surface"
      spacing="default"
      className="border-t border-slate-200"
    >
      <Container size="wide">
        <header
          className={cn(
            "max-w-[40rem]",
            headerAlign === "center" && "mx-auto text-center",
          )}
        >
          <h2 className="font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-pretty sm:text-h2 lg:text-[2.375rem]">
            {isInlineTitle ? (
              <>
                <span className="text-navy">{title.prefix} </span>
                <span className="text-primary">{title.highlight}</span>
                {title.suffix ? (
                  <span className="text-navy"> {title.suffix}</span>
                ) : null}
              </>
            ) : (
              <>
                <span className="text-navy">{title.prefix}</span>
                <br />
                <span className="text-primary">{title.highlight}</span>
              </>
            )}
          </h2>

          <span
            aria-hidden="true"
            className={cn(
              "mt-md block h-1 w-14 rounded-full bg-primary",
              headerAlign === "center" && "mx-auto",
            )}
          />
        </header>

        {useMobileCarousel ? (
          <ResponsiveItemCarousel
            items={section.items}
            getItemKey={(item) => item.title}
            ariaLabel="Services we provide"
            dotLabel={(item) => `Go to ${item.title}`}
            desktopGridClassName={cn("mt-3xl gap-3 sm:gap-4", gridClassName)}
            mobileCarouselClassName="mt-xl sm:hidden sm:mt-3xl"
            listItemClassName="flex"
            renderItem={(item, { elevated }) => (
              <ServiceProvideCard
                title={item.title}
                description={item.description}
                icon={item.icon}
                elevated={elevated}
              />
            )}
          />
        ) : (
          <ServicesGrid items={section.items} gridClassName={gridClassName} />
        )}
      </Container>
    </Section>
  );
}

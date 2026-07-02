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
import type { ServiceConditionsWeTreatSectionData } from "@/types/service-content";
import { cn } from "@/lib/cn";

function ConditionCard({
  title,
  description,
  image,
  elevated = false,
}: {
  title: string;
  description?: string;
  image: { src: string; alt: string };
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
          "h-[4.5rem] w-[4.5rem] p-2 sm:h-20 sm:w-20 sm:p-2.5",
          elevated && serviceIconRingElevatedClasses,
        )}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={128}
          height={128}
          className={cn(
            "service-icon-bounce h-full w-full object-contain transition-transform duration-300",
            elevated
              ? serviceIconImageElevatedClasses
              : "group-hover:scale-105",
          )}
          sizes="5rem"
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

      {description ? (
        <p className="mt-1 text-[0.75rem] leading-relaxed text-slate-600 sm:text-[0.8125rem]">
          {description}
        </p>
      ) : null}

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

function ArchedSideImage({ image }: { image: { src: string; alt: string } }) {
  return (
    <div className="relative mx-auto w-full max-w-[22rem] lg:mx-0 lg:max-w-none lg:self-stretch">
      <div
        className={cn(
          "relative min-h-[14rem] w-full overflow-hidden",
          "rounded-[2rem] rounded-tl-[4.5rem] sm:min-h-[24rem] sm:rounded-tl-[5.5rem]",
          "lg:min-h-[36rem] lg:rounded-tl-[7rem] xl:min-h-[40rem]",
          "shadow-[0_22px_50px_-32px_rgba(15,23,42,0.28)]",
        )}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover object-[center_20%]"
          sizes="(max-width: 1024px) 90vw, 28rem"
          priority={false}
        />
      </div>
    </div>
  );
}

export function ServiceConditionsWeTreatSection({
  section,
}: {
  section: ServiceConditionsWeTreatSectionData;
}) {
  const title = section.title ?? {
    prefix: "We Help You Move Better,",
    highlight: "Live Better.",
  };

  const desktopGridClassName =
    section.cardGridColumns === 2
      ? "mt-6 grid gap-3 sm:mt-8 sm:gap-4 grid-cols-1 sm:grid-cols-2"
      : "mt-6 grid gap-3 sm:mt-8 sm:gap-4 grid-cols-2 sm:grid-cols-4";

  return (
    <Section
      background="default"
      spacing="default"
      className="border-t border-slate-200"
    >
      <Container size="wide">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10 xl:gap-12">
          <div className="min-w-0">
            <header className="max-w-[40rem]">
              {section.eyebrow ? (
                <p className="font-display text-eyebrow font-semibold tracking-[0.18em] text-primary uppercase">
                  <span aria-hidden="true">- </span>
                  {section.eyebrow}
                  <span aria-hidden="true"> -</span>
                </p>
              ) : null}

              <h2
                className={cn(
                  "font-display font-semibold leading-tight tracking-tight text-pretty sm:text-h2 lg:text-[2.125rem]",
                  section.eyebrow ? "mt-sm" : undefined,
                  section.stackedTitle
                    ? "text-[1.75rem] lg:text-[2.375rem]"
                    : "text-[1.75rem] lg:text-[2.125rem]",
                )}
              >
                {section.stackedTitle ? (
                  <>
                    <span className="text-navy">{title.prefix}</span>
                    <br />
                    <span className="text-primary">{title.highlight}</span>
                    {title.suffix ? (
                      <>
                        <br />
                        <span className="text-navy">{title.suffix}</span>
                      </>
                    ) : null}
                  </>
                ) : (
                  <>
                    <span className="text-navy">{title.prefix} </span>
                    <span className="text-primary">{title.highlight}</span>
                    {title.suffix ? (
                      <span className="text-navy"> {title.suffix}</span>
                    ) : null}
                  </>
                )}
              </h2>

              {section.stackedTitle ? (
                <span
                  aria-hidden="true"
                  className="mt-md block h-1 w-14 rounded-full bg-primary"
                />
              ) : null}
            </header>

            <ResponsiveItemCarousel
              items={section.items}
              getItemKey={(item) => item.title}
              ariaLabel="Conditions we treat"
              dotLabel={(item) => `Go to ${item.title}`}
              desktopGridClassName={desktopGridClassName}
              mobileCarouselClassName="mt-6 sm:hidden sm:mt-8"
              listItemClassName="flex"
              renderItem={(item, { elevated }) => (
                <ConditionCard
                  title={item.title}
                  description={item.description}
                  image={item.image}
                  elevated={elevated}
                />
              )}
            />
          </div>

          <ArchedSideImage image={section.sideImage} />
        </div>
      </Container>
    </Section>
  );
}

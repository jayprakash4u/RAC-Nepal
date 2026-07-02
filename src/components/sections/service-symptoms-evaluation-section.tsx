"use client";

import Image from "next/image";
import { ResponsiveItemCarousel } from "@/components/sections/responsive-item-carousel";
import { ServiceIconCard } from "@/components/sections/service-icon-card";
import { Container, Section } from "@/components/ui";
import type { ServiceSymptomsEvaluationSectionData } from "@/types/service-content";
import { cn } from "@/lib/cn";

function SectionHeroImage({
  image,
  className,
}: {
  image: { src: string; alt: string };
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover object-[center_20%] lg:object-[right_center]"
        sizes="(max-width: 1024px) 100vw, 36rem"
        priority={false}
      />

      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0",
          "bg-linear-to-r from-surface from-0% via-surface/20 via-[16%] to-transparent to-[42%]",
        )}
      />

      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0",
          "bg-linear-to-t from-surface from-0% via-surface/35 via-[14%] to-transparent",
        )}
      />
    </div>
  );
}

export function ServiceSymptomsEvaluationSection({
  section,
}: {
  section: ServiceSymptomsEvaluationSectionData;
}) {
  return (
    <Section
      background="surface"
      spacing="default"
      className="relative overflow-hidden border-t border-slate-200"
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute top-0 right-0 z-0 hidden",
          "h-[24rem] w-[min(54%,34rem)] lg:block xl:h-[28rem] xl:w-[min(52%,38rem)]",
        )}
      >
        <SectionHeroImage image={section.heroImage} className="h-full w-full" />
      </div>

      <Container size="wide" className="relative z-10">
        <header className="max-w-[36rem] lg:max-w-[46%]">
          <h2 className="font-display text-[1.625rem] font-semibold leading-tight text-navy sm:text-[2.25rem]">
            {section.title}
          </h2>

          <span
            aria-hidden="true"
            className="mt-sm block h-1 w-16 rounded-full bg-primary"
          />

          {section.description ? (
            <p className="text-body mt-lg max-w-[32rem] leading-relaxed text-slate-600">
              {section.description}
            </p>
          ) : null}
        </header>

        <div className="relative mt-lg overflow-hidden rounded-2xl lg:mt-xl lg:hidden">
          <SectionHeroImage
            image={section.heroImage}
            className="aspect-[16/10] w-full sm:aspect-[5/3]"
          />
        </div>

        <ResponsiveItemCarousel
          items={section.items}
          getItemKey={(item) => item.label}
          ariaLabel="Symptoms we evaluate"
          dotLabel={(item) => `Go to ${item.label}`}
          desktopGridClassName="mt-2xl grid-cols-2 gap-4 sm:gap-5 md:grid-cols-5"
          mobileCarouselClassName="mt-lg sm:hidden sm:mt-2xl"
          carouselTrackClassName="mx-auto max-w-[18rem]"
          listItemClassName="flex aspect-square"
          renderItem={(item, { elevated }) => (
            <ServiceIconCard
              label={item.label}
              image={item.image}
              elevated={elevated}
              imageClassName="h-14 w-14 sm:h-[4.5rem] sm:w-[4.5rem]"
              sizes="(max-width: 640px) 3.5rem, 4.5rem"
            />
          )}
        />
      </Container>
    </Section>
  );
}

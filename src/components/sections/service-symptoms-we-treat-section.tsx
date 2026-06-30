"use client";

import { Container, Section } from "@/components/ui";
import { ResponsiveItemCarousel } from "@/components/sections/responsive-item-carousel";
import { ServiceIconCard } from "@/components/sections/service-icon-card";
import type { ServiceSymptomsWeTreatSectionData } from "@/types/service-content";

function SectionEyebrow({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-sm sm:gap-md">
      <span
        aria-hidden="true"
        className="h-px w-10 bg-primary sm:w-14"
      />
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full bg-primary"
      />
      <p className="font-display text-eyebrow font-semibold tracking-[0.18em] text-primary uppercase">
        {label}
      </p>
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full bg-primary"
      />
      <span
        aria-hidden="true"
        className="h-px w-10 bg-primary sm:w-14"
      />
    </div>
  );
}

export function ServiceSymptomsWeTreatSection({
  section,
}: {
  section: ServiceSymptomsWeTreatSectionData;
}) {
  const title = section.title ?? {
    prefix: "Common",
    highlight: "Symptoms",
    suffix: "We Treat",
  };

  return (
    <Section
      background="surface"
      spacing="default"
      className="border-t border-slate-200"
    >
      <Container size="wide">
        <header className="mx-auto flex max-w-[40rem] flex-col items-center text-center">
          <SectionEyebrow label={section.eyebrow ?? "Symptoms We Treat"} />

          <h2 className="font-display mt-md text-h2 font-semibold leading-tight tracking-tight text-pretty lg:text-[2.5rem]">
            <span className="text-navy">{title.prefix} </span>
            <span className="text-primary">{title.highlight}</span>
            {title.suffix ? (
              <span className="text-navy"> {title.suffix}</span>
            ) : null}
          </h2>

          <span
            aria-hidden="true"
            className="mt-md block h-1 w-16 rounded-full bg-primary"
          />
        </header>

        <ResponsiveItemCarousel
          items={section.items}
          getItemKey={(item) => item.label}
          ariaLabel="Symptoms we treat"
          dotLabel={(item) => `Go to ${item.label}`}
          desktopGridClassName="mt-3xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5"
          mobileCarouselClassName="mt-xl sm:hidden sm:mt-3xl"
          listItemClassName="aspect-square"
          renderItem={(item, { elevated }) => (
            <ServiceIconCard
              label={item.label}
              image={item.image}
              elevated={elevated}
            />
          )}
        />
      </Container>
    </Section>
  );
}

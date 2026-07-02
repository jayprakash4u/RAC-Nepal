"use client";

import { ConditionWeTreatCard } from "@/components/sections/condition-we-treat-card";
import { ResponsiveItemCarousel } from "@/components/sections/responsive-item-carousel";
import { Container, Section, SectionHeader } from "@/components/ui";
import { telehealthPage } from "@/data/telehealth-page";

function SectionDecor() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-6 left-6 grid grid-cols-5 gap-1.5 opacity-60"
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <span
            key={`left-${index}`}
            className="h-1.5 w-1.5 rounded-full bg-primary/20"
          />
        ))}
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-6 bottom-6 grid grid-cols-5 gap-1.5 opacity-60"
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <span
            key={`right-${index}`}
            className="h-1.5 w-1.5 rounded-full bg-primary/20"
          />
        ))}
      </div>
    </>
  );
}

export function TelehealthConditions() {
  const { conditions } = telehealthPage;

  return (
    <Section
      background="default"
      spacing="default"
      className="relative overflow-hidden border-y border-slate-200"
      aria-labelledby="telehealth-conditions-heading"
    >
      <SectionDecor />

      <Container size="wide" className="relative">
        <SectionHeader
          eyebrow={conditions.eyebrow}
          title={conditions.title}
          description={conditions.description}
          align="center"
          decoratedEyebrow
          className="mx-auto"
        />

        <ResponsiveItemCarousel
          items={conditions.items}
          getItemKey={(item) => item.id}
          ariaLabel="Conditions we can manage online"
          dotLabel={(item) => `Go to ${item.title}`}
          desktopGridClassName="section-content mt-3xl grid-cols-2 gap-md md:grid-cols-3 lg:grid-cols-4 lg:gap-lg"
          mobileCarouselClassName="mt-xl sm:hidden sm:mt-3xl"
          carouselTrackClassName="mx-auto max-w-[18rem]"
          listItemClassName="flex"
          renderItem={(item, { elevated }) => (
            <ConditionWeTreatCard
              title={item.title}
              description={item.description}
              href={item.href}
              icon={item.icon}
              elevated={elevated}
            />
          )}
        />
      </Container>
    </Section>
  );
}

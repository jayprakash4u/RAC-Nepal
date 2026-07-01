"use client";

import { ResponsiveItemCarousel } from "@/components/sections/responsive-item-carousel";
import { ServiceLinkCard } from "@/components/sections/service-link-card";
import { Container, Section, SectionHeader } from "@/components/ui";
import type { ServiceConditionsAssessedSectionData } from "@/types/service-content";

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
            <ServiceLinkCard
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

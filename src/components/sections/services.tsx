"use client";

import { ResponsiveItemCarousel } from "@/components/sections/responsive-item-carousel";
import { ServiceLinkCard } from "@/components/sections/service-link-card";
import { Container, Section, SectionHeader } from "@/components/ui";
import { servicesSection } from "@/data/services";

export function Services() {
  return (
    <Section background="surface" spacing="default">
      <Container size="wide">
        <SectionHeader
          eyebrow={servicesSection.eyebrow}
          title={servicesSection.title}
          align="center"
          decoratedEyebrow
        />

        <ResponsiveItemCarousel
          items={servicesSection.items}
          getItemKey={(item) => item.id}
          ariaLabel="Our specialized services"
          dotLabel={(item) => `Go to ${item.title}`}
          desktopGridClassName="section-content grid-cols-2 gap-md md:grid-cols-3 lg:grid-cols-5 lg:gap-lg"
          mobileCarouselClassName="section-content sm:hidden"
          listItemClassName="flex"
          renderItem={(item, { elevated }) => (
            <ServiceLinkCard
              label={item.title}
              href={item.href}
              image={item.image}
              elevated={elevated}
              imageVariant="banner"
            />
          )}
        />
      </Container>
    </Section>
  );
}

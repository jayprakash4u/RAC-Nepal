import { journeySection } from "@/data/journey";
import { JourneyDesktop } from "@/components/sections/journey-desktop";
import { JourneyMobileCarousel } from "@/components/sections/journey-mobile-carousel";
import { Container, Section, SectionHeader } from "@/components/ui";

export function Journey() {
  return (
    <Section background="surface" spacing="default">
      <Container size="wide">
        <SectionHeader
          eyebrow={journeySection.eyebrow}
          title={journeySection.title}
          description={journeySection.description}
          align="center"
          decoratedEyebrow
        />

        <div className="section-content">
          <JourneyDesktop />
          <JourneyMobileCarousel />
        </div>
      </Container>
    </Section>
  );
}

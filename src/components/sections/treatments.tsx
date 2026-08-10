import { treatmentsSection } from "@/data/treatments";
import { ConditionWeTreatCard } from "@/components/sections/condition-we-treat-card";
import { TreatmentsMobileCarousel } from "@/components/sections/treatments-mobile-carousel";
import { Container, Section, SectionHeader } from "@/components/ui";
import { cn } from "@/lib/cn";

export function Treatments() {
  const { eyebrow, title, items } = treatmentsSection;

  return (
    <Section background="default" spacing="default">
      <Container size="wide">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          align="center"
          decoratedEyebrow
        />

        <TreatmentsMobileCarousel items={items} />

        <ul className="section-content hidden grid-cols-1 gap-md sm:grid sm:grid-cols-2 lg:grid-cols-4 lg:gap-lg">
          {items.map((item, index) => (
            <li
              key={item.id}
              className="flex motion-safe:animate-[fadeIn_0.55s_ease-out_both] motion-reduce:animate-none"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <ConditionWeTreatCard
                title={item.title}
                description={item.description}
                href={item.href}
                icon={item.icon}
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}


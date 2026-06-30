import Image from "next/image";
import { Container, Section, SectionHeader } from "@/components/ui";
import { ServiceIconCard } from "@/components/sections/service-icon-card";
import type { ServiceDiagnosticServicesSectionData } from "@/types/service-content";
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

export function ServiceDiagnosticServicesSection({
  section,
}: {
  section: ServiceDiagnosticServicesSectionData;
}) {
  return (
    <Section
      background="surface"
      spacing="default"
      className="relative overflow-hidden border-t border-slate-200"
    >
      {section.heroImage ? (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute top-0 right-0 z-0 hidden",
            "h-[24rem] w-[min(54%,34rem)] lg:block xl:h-[28rem] xl:w-[min(52%,38rem)]",
          )}
        >
          <SectionHeroImage
            image={section.heroImage}
            className="h-full w-full"
          />
        </div>
      ) : null}

      <Container size="wide" className="relative z-10">
        <SectionHeader
          eyebrow={section.eyebrow ?? "Our Services"}
          title={
            section.title ?? {
              prefix: "Diagnostic Services",
              highlight: "Available",
            }
          }
          description={section.description}
          align="left"
          className={section.heroImage ? "max-w-[46%]" : undefined}
        />

        {section.heroImage ? (
          <div className="relative mt-xl overflow-hidden rounded-2xl lg:hidden">
            <SectionHeroImage
              image={section.heroImage}
              className="aspect-[5/3] w-full"
            />
          </div>
        ) : null}

        <ul className="mt-3xl grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {section.items.map((item) => (
            <li key={item.label} className="flex">
              <ServiceIconCard
                label={item.label}
                image={item.image}
                imageWidth={236}
                imageHeight={230}
                className="w-full"
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

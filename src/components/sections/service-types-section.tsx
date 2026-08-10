import Image from "next/image";
import { Container, Section, SectionHeader } from "@/components/ui";
import type {
  ServiceArthritisTypeItem,
  ServiceTypesSectionData,
} from "@/types/service-content";
import { cn } from "@/lib/cn";

function TypeCard({ item }: { item: ServiceArthritisTypeItem }) {
  return (
    <article
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200",
        "border-t-4 border-t-primary bg-white shadow-sm",
        "transition-shadow duration-normal hover:shadow-md",
      )}
    >
      <div className="relative aspect-[16/9] w-full bg-slate-50 sm:aspect-[4/3]">
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-lg">
        <h3 className="text-[0.9375rem] font-semibold text-navy sm:text-body">
          {item.name}
          {item.shortName ? (
            <span className="ml-xs font-medium text-primary">{item.shortName}</span>
          ) : null}
        </h3>

        <ul className="mt-2 flex flex-col gap-1 sm:mt-md sm:gap-sm">
          {item.points.map((point) => (
            <li key={point} className="text-[0.75rem] leading-relaxed text-slate-600 sm:text-small">
              {point}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function ServiceTypesSection({
  section,
}: {
  section: ServiceTypesSectionData;
}) {
  return (
    <Section
      background="surface"
      spacing="default"
      className="border-t border-slate-200"
    >
      <Container size="wide">
        <SectionHeader
          eyebrow="Patient Education"
          title={{ prefix: "Types of", highlight: "Arthritis" }}
          align="center"
          className="mx-auto"
        />

        <div className="mt-3xl grid grid-cols-2 gap-3 sm:gap-xl lg:grid-cols-4">
          {section.items.map((item) => (
            <TypeCard key={item.name} item={item} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

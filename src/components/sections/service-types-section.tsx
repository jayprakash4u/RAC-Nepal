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
      <div className="relative aspect-[4/3] w-full bg-slate-50">
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      <div className="flex flex-1 flex-col p-lg">
        <h3 className="font-display text-body font-semibold text-navy">
          {item.name}
          {item.shortName ? (
            <span className="ml-xs font-medium text-primary">{item.shortName}</span>
          ) : null}
        </h3>

        <ul className="mt-md flex flex-col gap-sm">
          {item.points.map((point) => (
            <li key={point} className="text-small leading-relaxed text-slate-600">
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

        <div className="mt-3xl grid grid-cols-1 gap-xl sm:grid-cols-2 lg:grid-cols-4">
          {section.items.map((item) => (
            <TypeCard key={item.name} item={item} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

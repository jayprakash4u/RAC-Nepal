import Image from "next/image";
import { Container, Section, SectionHeader } from "@/components/ui";
import type {
  ServiceStageItem,
  ServiceStagesSectionData,
} from "@/types/service-content";
import { cn } from "@/lib/cn";

function StageTimelineStep({
  item,
  index,
  isLast,
}: {
  item: ServiceStageItem;
  index: number;
  isLast: boolean;
}) {
  return (
    <li className="relative flex gap-lg sm:gap-xl">
      <div className="flex w-10 shrink-0 flex-col items-center sm:w-12">
        <span
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full sm:h-12 sm:w-12",
            "bg-primary font-display text-small font-bold text-white shadow-sm",
          )}
        >
          {index + 1}
        </span>
        {!isLast ? (
          <span
            aria-hidden="true"
            className="mt-sm w-px flex-1 bg-linear-to-b from-primary/40 to-primary/10"
          />
        ) : null}
      </div>

      <div className={cn("min-w-0 flex-1", !isLast && "pb-2xl sm:pb-3xl")}>
        <div className="flex flex-col gap-lg sm:flex-row sm:items-start sm:gap-xl">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-50 sm:h-24 sm:w-24">
            <Image
              src={item.image.src}
              alt={item.image.alt}
              fill
              className="object-contain p-sm"
              sizes="96px"
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="font-display text-eyebrow font-semibold tracking-[0.14em] text-primary uppercase">
              {item.stage}
            </p>
            <h3 className="mt-xs font-display text-body font-semibold text-navy sm:text-h3">
              {item.label}
            </h3>
            <p className="text-body mt-sm leading-relaxed text-slate-600">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}

export function ServiceStagesSection({
  section,
}: {
  section: ServiceStagesSectionData;
}) {
  return (
    <Section
      background="default"
      spacing="default"
      className="border-t border-slate-200"
    >
      <Container size="wide">
        <div className="lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-4xl">
          <SectionHeader
            eyebrow="Understanding the Condition"
            title={{
              prefix: "How Rheumatoid Arthritis",
              highlight: "Progresses",
            }}
            align="left"
            className="lg:sticky lg:top-28"
          />

          <div className="mt-3xl lg:mt-0">
            <p className="text-body mb-2xl font-medium text-primary-dark">
              {section.title}
            </p>

            <ol className="relative">
              {section.items.map((item, index) => (
                <StageTimelineStep
                  key={item.stage}
                  item={item}
                  index={index}
                  isLast={index === section.items.length - 1}
                />
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </Section>
  );
}

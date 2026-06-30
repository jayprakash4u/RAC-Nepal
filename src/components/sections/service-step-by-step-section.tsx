import Image from "next/image";
import { Container, Section } from "@/components/ui";
import { ServiceCardHoverOverlay } from "@/components/sections/service-icon-card";
import type { ServiceStepByStepSectionData } from "@/types/service-content";
import { cn } from "@/lib/cn";

function StepCard({
  step,
  index,
}: {
  step: {
    title: string;
    description: string;
    icon: { src: string; alt: string };
  };
  index: number;
}) {
  const stepNumber = String(index + 1).padStart(2, "0");

  return (
    <article
      className={cn(
        "group relative flex items-center overflow-hidden",
        "rounded-2xl border border-slate-100 bg-white px-4 py-4 sm:px-5 sm:py-5",
        "shadow-[0_8px_28px_-12px_rgba(15,23,42,0.12)]",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:border-primary/15",
        "hover:shadow-[0_14px_30px_-14px_color-mix(in_srgb,var(--color-primary)_32%,transparent)]",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
      )}
    >
      <ServiceCardHoverOverlay />

      <div className="flex w-[4.5rem] shrink-0 items-center justify-center sm:w-20">
        <div
          className={cn(
            "flex h-[4.25rem] w-[4.25rem] items-center justify-center overflow-hidden rounded-full sm:h-[4.5rem] sm:w-[4.5rem]",
            "bg-primary-soft/45 transition-colors duration-300 group-hover:bg-primary-soft/65",
          )}
        >
          <div className="relative h-[78%] w-[78%]">
            <Image
              src={step.icon.src}
              alt={step.icon.alt}
              fill
              className="scale-[1.45] object-contain object-center transition-transform duration-300 group-hover:scale-[1.55] motion-reduce:transition-none motion-reduce:group-hover:scale-[1.45]"
              sizes="3.5rem"
              unoptimized
            />
          </div>
        </div>
      </div>

      <div
        className={cn(
          "absolute top-1/2 z-20 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:h-11 sm:w-11",
          "left-[calc(1rem+4.5rem+1.375rem)] sm:left-[calc(1.25rem+5rem+1.5rem)]",
          "rounded-full bg-primary font-display text-[0.8125rem] font-bold text-white shadow-md sm:text-small",
          "transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100",
        )}
      >
        {stepNumber}
      </div>

      <div className="min-w-0 flex-1 pl-10 sm:pl-12">
        <p className="text-[0.9375rem] font-semibold leading-snug tracking-normal text-navy transition-colors duration-300 group-hover:text-primary sm:text-body">
          {step.title}
        </p>

        <span
          aria-hidden="true"
          className="mt-1 block h-0.5 w-0 rounded-full bg-primary transition-all duration-300 group-hover:w-8"
        />

        <p className="mt-2 text-[0.8125rem] leading-relaxed text-slate-600 sm:text-small">
          {step.description}
        </p>
      </div>
    </article>
  );
}

export function ServiceStepByStepSection({
  section,
}: {
  section: ServiceStepByStepSectionData;
}) {
  return (
    <Section
      background="default"
      spacing="default"
      className="border-t border-slate-200"
    >
      <Container size="wide">
        <header className="mx-auto flex max-w-[42rem] flex-col items-center text-center">
          <p className="font-display text-eyebrow font-semibold tracking-[0.18em] text-primary uppercase">
            {section.eyebrow ?? "Our Rehabilitation Process"}
          </p>

          <h2 className="font-display mt-sm text-[1.75rem] font-semibold leading-tight tracking-tight text-pretty text-navy sm:mt-md sm:text-h2 lg:text-[2.375rem]">
            {section.title ?? "Step-by-Step Care for Lasting Results"}
          </h2>

          <span
            aria-hidden="true"
            className="mt-md block h-1 w-14 rounded-full bg-primary"
          />
        </header>

        <div className="relative mx-auto mt-3xl max-w-[42rem]">
          <div
            aria-hidden="true"
            className={cn(
              "absolute top-8 bottom-8 w-px -translate-x-1/2 bg-slate-200",
              "left-[calc(1rem+4.5rem+1.375rem)] sm:left-[calc(1.25rem+5rem+1.5rem)]",
            )}
          />

          <ol className="flex flex-col gap-5 sm:gap-6">
            {section.items.map((item, index) => (
              <li
                key={item.title}
                className="relative motion-safe:animate-[fadeIn_0.55s_ease-out_both] motion-reduce:animate-none"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                {index > 0 ? (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute top-0 z-10 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary",
                      "left-[calc(1rem+4.5rem+1.375rem)] sm:left-[calc(1.25rem+5rem+1.5rem)]",
                    )}
                  />
                ) : null}

                <StepCard step={item} index={index} />
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}

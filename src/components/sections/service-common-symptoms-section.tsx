"use client";

import { Button, Container, Section } from "@/components/ui";
import { ResponsiveItemCarousel } from "@/components/sections/responsive-item-carousel";
import { ServiceIconCard } from "@/components/sections/service-icon-card";
import { siteConfig } from "@/config/site";
import type { ServiceCommonSymptomsSectionData } from "@/types/service-content";
import { cn } from "@/lib/cn";

function SectionEyebrow({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-sm sm:gap-md">
      <span aria-hidden="true" className="h-px w-10 bg-primary sm:w-14" />
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full bg-primary"
      />
      <p className="font-display text-eyebrow font-semibold tracking-[0.18em] text-primary uppercase">
        {label}
      </p>
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full bg-primary"
      />
      <span aria-hidden="true" className="h-px w-10 bg-primary sm:w-14" />
    </div>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn("h-5 w-5", className)}
    >
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn("h-6 w-6", className)}
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M3 9h18M8 3v4M16 3v4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SymptomsCtaBanner({
  cta,
}: {
  cta: NonNullable<ServiceCommonSymptomsSectionData["cta"]>;
}) {
  const buttonHref = cta.buttonHref ?? siteConfig.links.appointment;
  const buttonLabel = cta.buttonLabel ?? "Book Appointment";

  return (
    <div
      className={cn(
        "mt-3xl overflow-hidden rounded-2xl bg-primary-soft/30",
        "px-lg py-xl sm:px-xl sm:py-2xl",
      )}
    >
      <div className="grid gap-xl lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-2xl">
        <div className="flex items-start gap-md">
          <div
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center",
              "rounded-full bg-primary text-white",
            )}
          >
            <PlusIcon />
          </div>
          <p className="text-body pt-1 leading-relaxed text-slate-600">
            {cta.message}
          </p>
        </div>

        <div
          aria-hidden="true"
          className="hidden h-full w-px bg-primary/20 lg:block"
        />

        <div className="flex flex-col gap-lg sm:flex-row sm:items-center sm:justify-between lg:justify-start lg:gap-xl">
          <div className="flex items-start gap-md">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CalendarIcon />
            </div>
            <div>
              <h3 className="text-body font-semibold text-primary">
                {cta.scheduleTitle}
              </h3>
              <p className="mt-1 text-small leading-relaxed text-slate-600">
                {cta.scheduleDescription}
              </p>
            </div>
          </div>

          <Button href={buttonHref} size="lg" className="shrink-0">
            {buttonLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ServiceCommonSymptomsSection({
  section,
}: {
  section: ServiceCommonSymptomsSectionData;
}) {
  const title = section.title ?? {
    prefix: "Common",
    highlight: "Symptoms",
    suffix: "of Autoimmune Disease",
  };

  return (
    <Section
      background="surface"
      spacing="default"
      className="border-t border-slate-200"
    >
      <Container size="wide">
        <header className="mx-auto flex max-w-[44rem] flex-col items-center text-center">
          <SectionEyebrow label={section.eyebrow ?? "Common Symptoms"} />

          <h2 className="font-display mt-md text-h2 font-semibold leading-tight tracking-tight text-pretty lg:text-[2.5rem]">
            <span className="text-navy">{title.prefix} </span>
            <span className="text-primary">{title.highlight}</span>
            {title.suffix ? (
              <span className="text-navy"> {title.suffix}</span>
            ) : null}
          </h2>

          <span
            aria-hidden="true"
            className="mt-md block h-1 w-16 rounded-full bg-primary"
          />
        </header>

        <ResponsiveItemCarousel
          items={section.items}
          getItemKey={(item) => item.label}
          ariaLabel="Common symptoms"
          dotLabel={(item) => `Go to ${item.label}`}
          desktopGridClassName="mt-3xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5"
          mobileCarouselClassName="mt-xl sm:hidden sm:mt-3xl"
          listItemClassName="aspect-square"
          renderItem={(item, { elevated }) => (
            <ServiceIconCard
              label={item.label}
              image={item.image}
              imageWidth={151}
              imageHeight={172}
              imageClassName="h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]"
              sizes="(max-width: 640px) 4rem, 4.5rem"
              elevated={elevated}
            />
          )}
        />

        {section.cta ? <SymptomsCtaBanner cta={section.cta} /> : null}
      </Container>
    </Section>
  );
}

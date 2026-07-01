import { treatmentsSection } from "@/data/treatments";
import { ConditionWeTreatCard } from "@/components/sections/condition-we-treat-card";
import { TreatmentsMobileCarousel } from "@/components/sections/treatments-mobile-carousel";
import { Button, Container, Section, SectionHeader } from "@/components/ui";
import { cn } from "@/lib/cn";

function SectionDecor() {
  return (
    <>
      <svg
        aria-hidden="true"
        viewBox="0 0 200 400"
        className="pointer-events-none absolute top-1/2 -left-8 hidden h-[28rem] w-40 -translate-y-1/2 text-primary/8 lg:block"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0 80c60-40 120-20 160 40s20 120-40 160-80 40-200 0-240 40-200-80-120-40z"
        />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 200 400"
        className="pointer-events-none absolute top-1/2 -right-8 hidden h-[28rem] w-40 -translate-y-1/2 text-primary/8 lg:block"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M200 80c-60-40-120-20-160 40s-20 120 40 160-80-40-200 0 240-40 200-80 120 40z"
        />
      </svg>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-6 left-6 grid grid-cols-5 gap-1.5 opacity-60"
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <span
            key={`left-${index}`}
            className="h-1.5 w-1.5 rounded-full bg-primary/20"
          />
        ))}
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-6 bottom-6 grid grid-cols-5 gap-1.5 opacity-60"
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <span
            key={`right-${index}`}
            className="h-1.5 w-1.5 rounded-full bg-primary/20"
          />
        ))}
      </div>
    </>
  );
}

function ChevronIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
      <path
        d="M7.5 5l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ListIcon({ invert = false }: { invert?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className={cn("h-4 w-4", invert && "text-white")}
    >
      <path
        d="M6 6h8M6 10h8M6 14h5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="4" cy="6" r="1" fill="currentColor" />
      <circle cx="4" cy="10" r="1" fill="currentColor" />
      <circle cx="4" cy="14" r="1" fill="currentColor" />
    </svg>
  );
}

function SpecialistIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
      <circle cx="10" cy="6.5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5 16c0-2.8 2.2-5 5-5s5 2.2 5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Treatments() {
  const { eyebrow, title, items, primaryCta, secondaryCta } =
    treatmentsSection;

  return (
    <Section background="default" spacing="default" className="relative overflow-hidden">
      <SectionDecor />

      <Container size="wide" className="relative">
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

        <div className="mt-3xl flex flex-wrap items-center justify-center gap-sm">
          <Button href={primaryCta.href} size="lg" className="gap-sm">
            <ListIcon invert />
            {primaryCta.label}
            <ChevronIcon />
          </Button>
          <Button href={secondaryCta.href} variant="outline" size="lg" className="gap-sm">
            <SpecialistIcon />
            {secondaryCta.label}
            <ChevronIcon />
          </Button>
        </div>
      </Container>
    </Section>
  );
}

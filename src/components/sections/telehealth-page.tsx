import Image from "next/image";
import { telehealthPage } from "@/data/telehealth-page";
import { Container, Section, SectionHeader } from "@/components/ui";
import { cn } from "@/lib/cn";

function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: { prefix: string; highlight: string };
  description?: string;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "mx-auto flex max-w-[42rem] flex-col items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="font-display text-eyebrow font-semibold tracking-[0.18em] text-primary uppercase">
          {eyebrow}
        </p>
      ) : null}

      <h2
        className={cn(
          "font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-pretty text-navy sm:text-h2 lg:text-[2.375rem]",
          eyebrow && "mt-sm",
        )}
      >
        <span>{title.prefix} </span>
        <span className="text-primary">{title.highlight}</span>
      </h2>

      <span
        aria-hidden="true"
        className="mt-md block h-1 w-14 rounded-full bg-primary"
      />

      {description ? (
        <p className="text-body mt-md text-pretty text-slate-600">{description}</p>
      ) : null}
    </header>
  );
}

function CheckListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-sm">
      <span
        aria-hidden="true"
        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
      >
        <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3">
          <path
            d="M3.5 8.25l2.75 2.75L12.5 5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-small leading-relaxed text-slate-600 sm:text-body">
        {children}
      </span>
    </li>
  );
}

export function TelehealthWhatIs() {
  const { whatIs } = telehealthPage;

  return (
    <Section background="default" spacing="default" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full bg-primary/6 blur-3xl"
      />

      <Container size="wide" className="relative">
        <div className="motion-safe:animate-[fadeIn_0.55s_ease-out_both] motion-reduce:animate-none">
          <SectionHeader
            eyebrow={whatIs.eyebrow}
            title={whatIs.title}
            align="center"
            decoratedEyebrow
            className="mx-auto"
          />
        </div>

        <p
          className={cn(
            "section-content text-body w-full max-w-none text-pretty leading-[1.85] text-slate-600",
            "motion-safe:animate-[fadeIn_0.55s_ease-out_both] motion-reduce:animate-none",
          )}
          style={{ animationDelay: "100ms" }}
        >
          {whatIs.description}
        </p>
      </Container>
    </Section>
  );
}

function ComparisonColumn({
  title,
  image,
  items,
}: {
  title: string;
  image: { src: string; alt: string };
  items: readonly string[];
}) {
  return (
    <div className="flex flex-col">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-100 sm:aspect-[3/2]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 1024px) 90vw, 22rem"
          className="object-cover object-center"
        />
      </div>

      <div className="mt-md flex items-center gap-2.5">
        <span
          aria-hidden="true"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-soft/55 text-primary"
        >
          <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
            <path
              d="M3.5 8.25l2.75 2.75L12.5 5"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h3 className="text-body font-bold text-primary">{title}</h3>
      </div>

      <ul className="mt-sm flex flex-col gap-sm">
        {items.map((item) => (
          <CheckListItem key={item}>{item}</CheckListItem>
        ))}
      </ul>
    </div>
  );
}

export function TelehealthComparison() {
  const { comparison } = telehealthPage;

  return (
    <Section background="surface" spacing="default">
      <Container size="wide">
        <div className="grid gap-xl lg:grid-cols-[minmax(0,0.85fr)_minmax(0,2fr)] lg:items-start lg:gap-2xl xl:gap-3xl">
          <header className="flex flex-col text-left">
            <p className="font-display text-eyebrow font-semibold tracking-[0.18em] text-primary uppercase">
              {comparison.eyebrow}
            </p>
            <h2 className="font-display mt-sm text-[1.75rem] font-semibold leading-tight tracking-tight text-navy sm:text-h2 lg:text-[2.125rem]">
              <span>{comparison.title.prefix} </span>
              <span className="text-primary">{comparison.title.highlight}</span>
            </h2>
            <span
              aria-hidden="true"
              className="mt-md block h-1 w-14 rounded-full bg-primary"
            />
            <p className="text-body mt-md max-w-[22rem] text-pretty leading-relaxed text-slate-600">
              {comparison.description}
            </p>
          </header>

          <div className="relative grid gap-lg sm:grid-cols-2 sm:gap-xl">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-[7rem] left-1/2 z-10 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-navy font-display text-small font-semibold text-white shadow-md sm:flex"
            >
              or
            </span>

            <ComparisonColumn
              title={comparison.telehealth.title}
              image={comparison.telehealth.image}
              items={comparison.telehealth.items}
            />
            <ComparisonColumn
              title={comparison.inPerson.title}
              image={comparison.inPerson.image}
              items={comparison.inPerson.items}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function TelehealthHowItWorks() {
  const { howItWorks } = telehealthPage;

  return (
    <Section background="surface" spacing="default" className="border-y border-slate-200">
      <Container size="wide">
        <SectionHeading eyebrow={howItWorks.eyebrow} title={howItWorks.title} />

        <ol className="section-content relative mx-auto max-w-[42rem]">
          <div
            aria-hidden="true"
            className="absolute top-6 bottom-6 left-[1.125rem] w-px bg-slate-200 sm:left-5"
          />

          {howItWorks.steps.map((step, index) => (
            <li
              key={step.title}
              className={cn(
                "relative pl-12 sm:pl-14",
                index > 0 && "mt-6 sm:mt-8",
                "motion-safe:animate-[fadeIn_0.55s_ease-out_both] motion-reduce:animate-none",
              )}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 flex h-9 w-9 items-center justify-center rounded-full bg-primary font-display text-small font-bold text-white shadow-md sm:h-10 sm:w-10"
              >
                {index + 1}
              </span>

              <h3 className="text-body font-bold text-navy">{step.title}</h3>
              <p className="mt-sm text-small leading-relaxed text-slate-600 sm:text-body">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

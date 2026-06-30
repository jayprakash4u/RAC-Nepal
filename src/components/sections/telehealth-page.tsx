import Link from "next/link";
import { telehealthPage } from "@/data/telehealth-page";
import {
  ServiceCardHoverOverlay,
  serviceIconCardClasses,
} from "@/components/sections/service-icon-card";
import { Button, Container, Section } from "@/components/ui";
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

export function TelehealthHero() {
  const { hero } = telehealthPage;

  return (
    <Section
      background="hero"
      spacing="none"
      className="border-b border-primary-dark/10"
    >
      <Container size="wide" className="page-hero-padding">
        <div className="section-intro mx-auto flex flex-col items-center text-center">
          <p className="font-display text-eyebrow font-semibold tracking-[0.18em] text-primary uppercase">
            {hero.eyebrow}
          </p>

          <h1 className="font-display mt-sm text-h2 font-bold leading-[1.12] tracking-tight text-pretty text-navy lg:text-[2.75rem]">
            {hero.title}
            <br />
            <span className="text-primary">{hero.titleAccent}</span>
          </h1>

          <span
            aria-hidden="true"
            className="mt-sm block h-1 w-14 rounded-full bg-primary"
          />

          <p className="text-body mt-md max-w-[38rem] text-pretty text-slate-600">
            {hero.description}
          </p>

          <div className="mt-lg flex w-full max-w-[38rem] flex-col gap-sm sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-sm">
            <Button
              href={hero.primaryCta.href}
              size="lg"
              className="w-full whitespace-normal sm:w-auto sm:whitespace-nowrap"
            >
              {hero.primaryCta.label}
            </Button>
            <Button
              href={hero.secondaryCta.href}
              variant="outline"
              size="lg"
              className="w-full whitespace-normal sm:w-auto sm:whitespace-nowrap"
            >
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function TelehealthWhatIs() {
  const { whatIs } = telehealthPage;

  return (
    <Section background="default" spacing="default">
      <Container size="wide">
        <div className="mx-auto grid max-w-[56rem] gap-xl lg:grid-cols-2 lg:items-start lg:gap-4xl">
          <header className="text-left">
            <p className="font-display text-eyebrow font-semibold tracking-[0.18em] text-primary uppercase">
              {whatIs.eyebrow}
            </p>
            <h2 className="font-display mt-sm text-[1.75rem] font-semibold leading-tight tracking-tight text-navy sm:text-h2 lg:text-[2.375rem]">
              {whatIs.title.prefix}{" "}
              <span className="text-primary">{whatIs.title.highlight}</span>
            </h2>
            <span
              aria-hidden="true"
              className="mt-md block h-1 w-14 rounded-full bg-primary"
            />
          </header>

          <div className="flex flex-col gap-md">
            {whatIs.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-body leading-relaxed text-slate-600"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function TelehealthConditions() {
  const { conditions } = telehealthPage;

  return (
    <Section background="surface" spacing="default" className="border-y border-slate-200">
      <Container size="wide">
        <SectionHeading
          eyebrow={conditions.eyebrow}
          title={conditions.title}
          description={conditions.description}
        />

        <ul className="section-content grid grid-cols-1 gap-sm sm:grid-cols-2 lg:grid-cols-3 lg:gap-md">
          {conditions.items.map((item, index) => (
            <li
              key={item.label}
              className="motion-safe:animate-[fadeIn_0.55s_ease-out_both] motion-reduce:animate-none"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <Link
                href={item.href}
                className={cn(
                  serviceIconCardClasses,
                  "flex-row items-center gap-md px-md py-md sm:px-lg sm:py-lg",
                  "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                )}
              >
                <ServiceCardHoverOverlay />
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft/55 font-display text-small font-bold text-primary"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-left text-body font-semibold text-navy transition-colors duration-300 group-hover:text-primary">
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

function ComparisonCard({
  title,
  items,
  variant,
}: {
  title: string;
  items: readonly string[];
  variant: "telehealth" | "in-person";
}) {
  return (
    <article
      className={cn(
        "h-full rounded-2xl border p-lg sm:p-xl",
        variant === "telehealth"
          ? "border-primary/20 bg-white shadow-[0_10px_30px_rgba(20,150,168,0.08)]"
          : "border-slate-200 bg-background",
      )}
    >
      <h3 className="text-body font-bold text-navy">{title}</h3>
      <ul className="mt-md flex flex-col gap-sm">
        {items.map((item) => (
          <CheckListItem key={item}>{item}</CheckListItem>
        ))}
      </ul>
    </article>
  );
}

export function TelehealthComparison() {
  const { comparison } = telehealthPage;

  return (
    <Section background="default" spacing="default">
      <Container size="wide">
        <SectionHeading
          eyebrow={comparison.eyebrow}
          title={comparison.title}
          description={comparison.description}
        />

        <div className="section-content grid gap-lg lg:grid-cols-2 lg:gap-xl">
          <ComparisonCard
            title={comparison.telehealth.title}
            items={comparison.telehealth.items}
            variant="telehealth"
          />
          <ComparisonCard
            title={comparison.inPerson.title}
            items={comparison.inPerson.items}
            variant="in-person"
          />
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

function BenefitCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <article
      className={cn(
        serviceIconCardClasses,
        "items-start px-md py-lg sm:px-lg sm:py-xl",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
      )}
    >
      <ServiceCardHoverOverlay />

      <span
        aria-hidden="true"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-soft/55 text-primary"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path
            d="M12 3.5l7 3.5v5c0 4.5-3 7.5-7 8.5-4-1-7-4-7-8.5V7l7-3.5z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <h3 className="mt-md text-body font-bold text-navy transition-colors duration-300 group-hover:text-primary">
        {title}
      </h3>
      <p className="mt-sm text-small leading-relaxed text-slate-600">
        {description}
      </p>

      <span
        aria-hidden="true"
        className="mt-md block h-0.5 w-8 rounded-full bg-primary transition-all duration-300 group-hover:w-10"
      />
    </article>
  );
}

export function TelehealthBenefits() {
  const { benefits } = telehealthPage;

  return (
    <Section background="default" spacing="default">
      <Container size="wide">
        <SectionHeading eyebrow={benefits.eyebrow} title={benefits.title} />

        <ul className="section-content grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-3 lg:gap-lg">
          {benefits.items.map((item, index) => (
            <li
              key={item.title}
              className="flex motion-safe:animate-[fadeIn_0.55s_ease-out_both] motion-reduce:animate-none"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <BenefitCard
                title={item.title}
                description={item.description}
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export function TelehealthPricing() {
  const { pricing } = telehealthPage;

  return (
    <Section background="hero" spacing="default" className="border-t border-primary-dark/10">
      <Container size="wide">
        <SectionHeading
          eyebrow={pricing.eyebrow}
          title={pricing.title}
          description={pricing.description}
        />

        <div className="section-content mx-auto max-w-[40rem] rounded-2xl border border-white/70 bg-white/90 p-lg shadow-sm backdrop-blur-sm sm:p-xl">
          <dl className="flex flex-col gap-lg">
            {pricing.items.map((item) => (
              <div key={item.label}>
                <dt className="text-body font-bold text-navy">{item.label}</dt>
                <dd className="mt-sm text-small leading-relaxed text-slate-600 sm:text-body">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-xl flex justify-center">
            <Button href={pricing.cta.href} size="lg">
              {pricing.cta.label}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}

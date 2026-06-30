import Image from "next/image";
import Link from "next/link";
import { Button, Container, Section } from "@/components/ui";
import { siteConfig } from "@/config/site";
import type { ConditionPageData, ConditionTextSegment } from "@/types/condition-content";
import { cn } from "@/lib/cn";

function ConditionParagraph({
  segments,
}: {
  segments: readonly ConditionTextSegment[];
}) {
  return (
    <p className="text-body-loose text-pretty text-slate-600">
      {segments.map((segment, index) =>
        segment.type === "strong" ? (
          <strong
            key={index}
            className="font-semibold text-primary-dark"
          >
            {segment.value}
          </strong>
        ) : (
          <span key={index}>{segment.value}</span>
        ),
      )}
    </p>
  );
}

export function ConditionContent({ condition }: { condition: ConditionPageData }) {
  return (
    <Section background="default" spacing="default">
      <Container size="wide">
        <div className="flex flex-col items-center gap-3xl lg:flex-row lg:items-start lg:gap-4xl">
          <div className="flex w-full shrink-0 justify-center lg:w-[38%]">
            <div
              className={cn(
                "relative flex h-[17.5rem] w-[17.5rem] items-center justify-center",
                "rounded-full border-4 border-primary bg-background p-lg shadow-sm",
                "sm:h-[20rem] sm:w-[20rem]",
              )}
            >
              <div className="relative h-full w-full overflow-hidden rounded-full bg-surface">
                <Image
                  src={condition.image.src}
                  alt={condition.image.alt}
                  fill
                  className="object-contain p-lg"
                  sizes="(max-width: 1024px) 70vw, 20rem"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[62%] lg:pt-md">
            <h1 className="font-display text-[2.5rem] leading-none font-normal text-slate-300 sm:text-[3rem] lg:text-[3.25rem]">
              {condition.title}
            </h1>

            <div className="mt-2xl flex flex-col gap-xl">
              {condition.paragraphs.map((paragraph, index) => (
                <ConditionParagraph key={index} segments={paragraph} />
              ))}
            </div>

            <div className="mt-2xl flex flex-wrap gap-md">
              <Button href={siteConfig.links.appointment} size="lg">
                Book a Consultation
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function ConditionBreadcrumb({
  conditionTitle,
}: {
  conditionTitle: string;
}) {
  return (
    <Section
      background="surface"
      spacing="none"
      className="border-b border-slate-200"
    >
      <Container size="wide" className="py-md">
        <nav aria-label="Breadcrumb" className="text-small text-slate-600">
          <ol className="flex flex-wrap items-center gap-xs">
            <li>
              <Link
                href="/"
                className="transition-colors duration-normal hover:text-primary"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-300">
              /
            </li>
            <li>
              <span>Conditions Treated</span>
            </li>
            <li aria-hidden="true" className="text-slate-300">
              /
            </li>
            <li>
              <span className="font-medium text-navy">{conditionTitle}</span>
            </li>
          </ol>
        </nav>
      </Container>
    </Section>
  );
}

import Image from "next/image";
import { Container, Section } from "@/components/ui";
import {
  ServiceCardHoverOverlay,
  serviceIconCardClasses,
  serviceIconRingClasses,
} from "@/components/sections/service-icon-card";
import type { ServiceAdvancedDiagnosticSectionData } from "@/types/service-content";
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

function DiagnosticServiceCard({
  title,
  description,
  icon,
  image,
}: {
  title: string;
  description: string;
  icon: { src: string; alt: string };
  image: { src: string; alt: string };
}) {
  return (
    <article className={cn(serviceIconCardClasses, "h-full w-full")}>
      <ServiceCardHoverOverlay />

      <div className="flex items-start gap-md p-lg pb-md sm:p-xl sm:pb-lg">
        <div
          className={cn(
            serviceIconRingClasses,
            "h-12 w-12 overflow-hidden p-1.5 sm:h-14 sm:w-14 sm:p-2",
          )}
        >
          <Image
            src={icon.src}
            alt={icon.alt}
            width={124}
            height={161}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
            sizes="2.5rem"
          />
        </div>

        <div className="min-w-0 flex-1 pt-0.5">
          <h3 className="text-body font-semibold leading-snug text-navy transition-colors duration-300 group-hover:text-primary">
            {title}
          </h3>
          <span
            aria-hidden="true"
            className="mt-1.5 block h-0.5 w-10 rounded-full bg-primary transition-all duration-300 group-hover:w-14"
          />
          <p className="mt-2 text-small leading-relaxed text-slate-600">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-auto px-lg pb-lg sm:px-xl sm:pb-xl">
        <Image
          src={image.src}
          alt={image.alt}
          width={157}
          height={180}
          className="h-auto w-full rounded-xl object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20rem"
        />
      </div>
    </article>
  );
}

export function ServiceAdvancedDiagnosticSection({
  section,
}: {
  section: ServiceAdvancedDiagnosticSectionData;
}) {
  const title = section.title ?? {
    prefix: "Advanced",
    highlight: "Diagnostic Services",
  };

  return (
    <Section
      background="surface"
      spacing="default"
      className="border-t border-slate-200"
    >
      <Container size="wide">
        <header className="mx-auto flex max-w-[44rem] flex-col items-center text-center">
          <SectionEyebrow
            label={section.eyebrow ?? "Advanced Diagnostic Services"}
          />

          <h2 className="font-display mt-md text-h2 font-semibold leading-tight tracking-tight text-pretty lg:text-[2.5rem]">
            <span className="text-navy">{title.prefix} </span>
            <span className="text-primary">{title.highlight}</span>
          </h2>

          <span
            aria-hidden="true"
            className="mt-md block h-1 w-16 rounded-full bg-primary"
          />

          {section.description ? (
            <p className="text-body mt-lg max-w-[40rem] leading-relaxed text-slate-600">
              {section.description}
            </p>
          ) : null}
        </header>

        <ul
          className={cn(
            "mt-3xl grid grid-cols-1 gap-4",
            "sm:grid-cols-2 sm:gap-5",
            "lg:grid-cols-3",
          )}
        >
          {section.items.map((item) => (
            <li key={item.title} className="flex">
              <DiagnosticServiceCard
                title={item.title}
                description={item.description}
                icon={item.icon}
                image={item.image}
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

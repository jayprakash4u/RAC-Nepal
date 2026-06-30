import Image from "next/image";
import { Container, Section } from "@/components/ui";
import {
  ServiceCardHoverOverlay,
  serviceIconCardClasses,
} from "@/components/sections/service-icon-card";
import type { ServiceInjectionTypesSectionData } from "@/types/service-content";
import { cn } from "@/lib/cn";

function InjectionTypeCard({
  title,
  description,
  illustration,
  icon,
}: {
  title: string;
  description: string;
  illustration: { src: string; alt: string };
  icon: { src: string; alt: string };
}) {
  return (
    <article
      className={cn(
        serviceIconCardClasses,
        "items-center px-sm py-md text-center sm:px-md sm:py-lg",
      )}
    >
      <ServiceCardHoverOverlay />

      <div className="relative mx-auto w-full max-w-[14rem] pt-2 pb-6 sm:max-w-[15rem] sm:pb-7">
        <div className="relative mx-auto aspect-square w-[78%] overflow-hidden rounded-full bg-primary-soft/35 p-3 sm:w-[82%] sm:p-4">
          <Image
            src={illustration.src}
            alt={illustration.alt}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            sizes="12rem"
            unoptimized
          />
        </div>

        <div
          className={cn(
            "absolute bottom-0 left-1/2 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center",
            "rounded-full bg-primary p-2.5 shadow-md transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14 sm:p-3",
          )}
        >
          <Image
            src={icon.src}
            alt={icon.alt}
            width={64}
            height={64}
            className="h-full w-full object-contain"
            sizes="2.5rem"
            unoptimized
          />
        </div>
      </div>

      <p className="mt-1 text-[0.9375rem] font-semibold leading-snug text-navy transition-colors duration-300 group-hover:text-primary sm:text-body">
        {title}
      </p>

      <p className="mt-2 max-w-[16rem] text-[0.8125rem] leading-relaxed text-slate-600 sm:text-small">
        {description}
      </p>

      <span
        aria-hidden="true"
        className="mt-md block h-0.5 w-8 rounded-full bg-primary transition-all duration-300 group-hover:w-10"
      />
    </article>
  );
}

export function ServiceInjectionTypesSection({
  section,
}: {
  section: ServiceInjectionTypesSectionData;
}) {
  const title = section.title ?? {
    prefix: "Types of",
    highlight: "Joint",
    suffix: "Injections",
  };

  return (
    <Section
      background="default"
      spacing="default"
      className="border-t border-slate-200"
    >
      <Container size="wide">
        <header className="mx-auto flex max-w-[44rem] flex-col items-center text-center">
          <h2 className="font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-pretty sm:text-h2 lg:text-[2.375rem]">
            <span className="text-navy">{title.prefix} </span>
            <span className="text-primary">{title.highlight}</span>
            {title.suffix ? (
              <span className="text-navy"> {title.suffix}</span>
            ) : null}
          </h2>

          <span
            aria-hidden="true"
            className="mt-md block h-1 w-14 rounded-full bg-primary"
          />
        </header>

        <ul className="mt-3xl grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {section.items.map((item, index) => (
            <li
              key={item.title}
              className="flex motion-safe:animate-[fadeIn_0.55s_ease-out_both] motion-reduce:animate-none"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <InjectionTypeCard
                title={item.title}
                description={item.description}
                illustration={item.illustration}
                icon={item.icon}
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

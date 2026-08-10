import Image from "next/image";
import { Container, Section } from "@/components/ui";
import {
  ServiceCardHoverOverlay,
  serviceIconCardClasses,
  serviceIconRingClasses,
} from "@/components/sections/service-icon-card";
import type { ServiceTreatmentSolutionsSectionData } from "@/types/service-content";
import { cn } from "@/lib/cn";

function TreatmentSolutionCard({
  index,
  title,
  description,
  image,
}: {
  index: number;
  title: string;
  description: string;
  image: { src: string; alt: string };
}) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className={cn(serviceIconCardClasses, "p-3 sm:p-lg")}>
      <ServiceCardHoverOverlay />

      <div className="relative mb-1 sm:mb-sm">
        <span
          aria-hidden="true"
          className="block h-0.5 w-6 rounded-full bg-primary transition-all duration-300 group-hover:w-10"
        />
        <span className="mt-1 block font-display text-[1.125rem] leading-none font-semibold text-primary sm:text-[1.375rem]">
          {number}
        </span>
      </div>

      <div className="relative flex flex-1 items-start gap-2 sm:gap-md">
        <div
          className={cn(
            serviceIconRingClasses,
            "h-11 w-11 overflow-hidden p-1 sm:h-14 sm:w-14 sm:p-2",
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={81}
            height={80}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
            sizes="3rem"
          />
        </div>

        <div className="min-w-0 flex-1 pt-0.5">
          <h3 className="text-[0.8125rem] font-semibold leading-snug text-navy transition-colors duration-300 group-hover:text-primary sm:text-small">
            {title}
          </h3>
          <p className="mt-1 text-[0.75rem] leading-relaxed text-slate-600">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}

function SideImage({ image }: { image: { src: string; alt: string } }) {
  return (
    <div className="relative mt-4 w-full max-w-[14rem] sm:max-w-[18.75rem] lg:max-w-[20rem]">
      <Image
        src={image.src}
        alt={image.alt}
        width={475}
        height={440}
        className="h-auto w-full object-contain object-left"
        sizes="(max-width: 1024px) 75vw, 20rem"
      />
    </div>
  );
}

export function ServiceTreatmentSolutionsSection({
  section,
}: {
  section: ServiceTreatmentSolutionsSectionData;
}) {
  const title = section.title ?? {
    prefix: "Comprehensive Joint Pain",
    highlight: "Treatment",
    suffix: "Solutions",
  };

  return (
    <Section
      background="surface"
      spacing="default"
      className="border-t border-slate-200"
    >
      <Container size="wide">
        <div className="grid items-start gap-6 lg:items-center lg:gap-2xl xl:gap-3xl">
          <div className="w-full">
            <header className="w-full">
              <p className="font-display text-eyebrow font-semibold tracking-[0.18em] text-primary uppercase">
                {section.eyebrow ?? "Treatment Options"}
              </p>

              <h2 className="font-display mt-sm text-[1.5rem] font-semibold leading-tight tracking-tight text-pretty sm:text-h2 lg:text-[2.125rem]">
                <span className="text-navy">{title.prefix} </span>
                <span className="text-primary">{title.highlight}</span>
                {title.suffix ? (
                  <span className="text-navy"> {title.suffix}</span>
                ) : null}
              </h2>

              <span
                aria-hidden="true"
                className="mt-sm block h-1 w-14 rounded-full bg-primary"
              />

              {section.description ? (
                <p className="mt-3 max-w-[24rem] text-[0.8125rem] leading-relaxed text-slate-600 sm:text-body">
                  {section.description}
                </p>
              ) : null}
            </header>

            {section.sideImage ? <SideImage image={section.sideImage} /> : null}
          </div>

          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5">
            {section.items.map((item, index) => (
              <li key={item.title} className="flex">
                <TreatmentSolutionCard
                  index={index}
                  title={item.title}
                  description={item.description}
                  image={item.image}
                />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

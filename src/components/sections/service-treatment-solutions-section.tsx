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
    <article className={cn(serviceIconCardClasses, "h-full p-md sm:p-lg")}>
      <ServiceCardHoverOverlay />

      <div className="relative mb-sm">
        <span
          aria-hidden="true"
          className="block h-0.5 w-8 rounded-full bg-primary transition-all duration-300 group-hover:w-10"
        />
        <span className="mt-1 block font-display text-[1.375rem] leading-none font-semibold text-primary">
          {number}
        </span>
      </div>

      <div className="relative flex flex-1 items-start gap-md">
        <div
          className={cn(
            serviceIconRingClasses,
            "h-12 w-12 overflow-hidden p-1.5 sm:h-14 sm:w-14 sm:p-2",
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={81}
            height={80}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
            sizes="3.5rem"
          />
        </div>

        <div className="min-w-0 flex-1 pt-0.5">
          <h3 className="text-small font-semibold leading-snug text-navy transition-colors duration-300 group-hover:text-primary sm:text-body">
            {title}
          </h3>
          <p className="mt-1 text-[0.8125rem] leading-relaxed text-slate-600">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}

function SideImage({ image }: { image: { src: string; alt: string } }) {
  return (
    <div className="relative mt-lg w-full max-w-[18.75rem] sm:max-w-[20rem] lg:max-w-[23.75rem]">
      <Image
        src={image.src}
        alt={image.alt}
        width={475}
        height={440}
        className="h-auto w-full object-contain object-left"
        sizes="(max-width: 1024px) 75vw, 23.75rem"
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
        <div className="grid items-center gap-xl lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:gap-2xl xl:gap-3xl">
          <div className="w-full">
            <header className="w-full">
              <p className="font-display text-eyebrow font-semibold tracking-[0.18em] text-primary uppercase">
                {section.eyebrow ?? "Treatment Options"}
              </p>

              <h2 className="font-display mt-sm text-[1.75rem] font-semibold leading-tight tracking-tight text-pretty sm:text-h2 lg:text-[2.125rem]">
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
                <p className="mt-md max-w-[24rem] text-small leading-relaxed text-slate-600 sm:text-body">
                  {section.description}
                </p>
              ) : null}
            </header>

            {section.sideImage ? <SideImage image={section.sideImage} /> : null}
          </div>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
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

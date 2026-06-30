import Image from "next/image";
import { Container, Section } from "@/components/ui";
import type { ServiceInfographicSectionData } from "@/types/service-content";

export function ServiceInfographicSection({
  section,
}: {
  section: ServiceInfographicSectionData;
}) {
  const title = section.title ?? {
    prefix: "Benefits of",
    highlight: "Osteoporosis Care",
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
          </h2>

          <span
            aria-hidden="true"
            className="mt-md block h-1 w-14 rounded-full bg-primary"
          />
        </header>

        <div className="mt-3xl">
          <Image
            src={section.image.src}
            alt={section.image.alt}
            width={1400}
            height={900}
            className="mx-auto h-auto w-full max-w-[72rem] object-contain"
            sizes="(max-width: 1280px) 100vw, 72rem"
            unoptimized
          />
        </div>
      </Container>
    </Section>
  );
}

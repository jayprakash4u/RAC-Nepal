import { Container, Section, SectionDisplayTitle } from "@/components/ui";
import type { ServiceIntroductionSectionData } from "@/types/service-content";
import { cn } from "@/lib/cn";

export function ServiceIntroductionSection({
  section,
}: {
  section: ServiceIntroductionSectionData;
}) {
  const title = section.title ?? {
    prefix: "Understanding",
    highlight: "Joint Pain",
  };

  const paragraphs =
    section.paragraphs ??
    (section.description ? [section.description] : []);

  return (
    <Section
      background="default"
      spacing="default"
      className="border-t border-slate-200"
    >
      <Container size="wide">
        <article className="w-full">
          <header className="mx-auto flex max-w-[40rem] flex-col items-center text-center">
            <p className="font-display text-eyebrow font-semibold tracking-[0.18em] text-primary uppercase">
              {section.eyebrow ?? "Introduction"}
            </p>

            <SectionDisplayTitle
              title={title}
              className="mt-sm text-center lg:text-[2.5rem]"
            />

            <span
              aria-hidden="true"
              className="mt-md block h-1 w-16 rounded-full bg-primary"
            />
          </header>

          {(section.description ?? paragraphs[0]) ? (
            <p
              className={cn(
                "mt-2xl w-full max-w-none text-pretty text-slate-600",
                "text-[1.0625rem] leading-[1.85]",
                "sm:text-[1.125rem] sm:leading-[1.9]",
                "lg:mt-3xl lg:text-[1.1875rem] lg:leading-[1.95]",
              )}
            >
              {section.description ?? paragraphs.join(" ")}
            </p>
          ) : null}
        </article>
      </Container>
    </Section>
  );
}

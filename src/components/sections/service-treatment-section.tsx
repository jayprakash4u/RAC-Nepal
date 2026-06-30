import Image from "next/image";
import { Container, Section } from "@/components/ui";
import type { ServiceTreatmentSectionData } from "@/types/service-content";
import { cn } from "@/lib/cn";

const imageFrameClip =
  "[clip-path:polygon(0_0,100%_0,100%_100%,2.5rem_100%,0_calc(100%-2.5rem))]";

function PanelBullet({ item }: { item: string }) {
  return (
    <li className="flex items-start gap-md">
      <span
        aria-hidden="true"
        className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-white"
      />
      <span className="text-body leading-relaxed text-white/95">{item}</span>
    </li>
  );
}

export function ServiceTreatmentSection({
  section,
}: {
  section: ServiceTreatmentSectionData;
}) {
  const headingPrefix = section.headingPrefix ?? "Treatment for";
  const modalitiesLabel = section.modalitiesLabel ?? "Modalities:";
  const exercisesLabel = section.exercisesLabel ?? "Exercises:";

  return (
    <Section
      background="surface"
      spacing="default"
      className="border-t border-slate-200"
    >
      <Container size="wide">
        <div className="overflow-hidden rounded-2xl shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div
              className={cn(
                "relative z-10 flex items-center justify-center",
                "bg-white px-xl py-2xl sm:px-2xl sm:py-3xl",
                "lg:min-h-[24rem] lg:py-4xl",
              )}
            >
              <div
                className={cn(
                  "relative w-full max-w-[20rem] bg-primary p-1.5 sm:max-w-[22rem]",
                  imageFrameClip,
                )}
              >
                <div
                  className={cn(
                    "relative aspect-[3/4] bg-white p-md sm:p-lg",
                    imageFrameClip,
                  )}
                >
                  <Image
                    key={section.image.src}
                    src={section.image.src}
                    alt={section.image.alt}
                    fill
                    unoptimized
                    className="object-contain object-center"
                    sizes="(max-width: 1024px) 85vw, 22rem"
                  />
                </div>
              </div>
            </div>

            <div
              className={cn(
                "flex flex-col justify-center",
                "bg-primary-dark px-xl py-2xl sm:px-2xl sm:py-3xl lg:px-3xl lg:py-4xl",
              )}
            >
              <h2 className="font-display text-[1.75rem] leading-tight text-white sm:text-[2rem] lg:text-[2.25rem]">
                <span className="font-normal">{headingPrefix} </span>
                <span className="font-bold">{section.title}</span>
              </h2>

              <span
                aria-hidden="true"
                className="mt-xl mb-xl block h-px w-full max-w-[18rem] bg-white/35"
              />

              <h3 className="text-body font-bold text-white">
                {modalitiesLabel}
              </h3>

              <ul className="mt-lg flex flex-col gap-md">
                {section.modalities.map((item) => (
                  <PanelBullet key={item} item={item} />
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 bg-primary-dark px-xl py-2xl sm:px-2xl sm:py-3xl lg:px-3xl">
            <h3 className="text-body font-bold text-white">{exercisesLabel}</h3>

            <div className="mt-lg grid grid-cols-1 gap-x-3xl gap-y-md sm:grid-cols-2">
              <ul className="flex flex-col gap-md">
                {section.exercises.left.map((item) => (
                  <PanelBullet key={item} item={item} />
                ))}
              </ul>
              <ul className="flex flex-col gap-md">
                {section.exercises.right.map((item) => (
                  <PanelBullet key={item} item={item} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

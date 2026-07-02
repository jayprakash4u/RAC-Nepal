import Image from "next/image";
import { Container, Section } from "@/components/ui";
import type { ServicePanelSectionData } from "@/types/service-content";
import { cn } from "@/lib/cn";

const frameClips = {
  "top-right":
    "[clip-path:polygon(0_0,calc(100%-2.5rem)_0,100%_2.5rem,100%_100%,0_100%)]",
  diagonal:
    "[clip-path:polygon(2.5rem_0,100%_0,100%_calc(100%-2.5rem),calc(100%-2.5rem)_100%,0_100%,0_2.5rem)]",
} as const;

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

export function ServiceSplitPanelSection({
  section,
  variant = "symptoms",
}: {
  section: ServicePanelSectionData;
  variant?: "symptoms" | "causes";
}) {
  const frameClip = frameClips[variant === "causes" ? "diagonal" : "top-right"];
  const imageBackground = variant === "causes" ? "bg-white" : "bg-black";
  const imageFit =
    variant === "causes" ? "object-cover object-center" : "object-contain object-center p-md";

  return (
    <Section
      background={variant === "causes" ? "default" : "surface"}
      spacing="default"
      className="border-t border-slate-200"
    >
      <Container size="wide">
        <div
          className={cn(
            "overflow-hidden rounded-2xl shadow-xl",
            "grid grid-cols-1 lg:grid-cols-2",
          )}
        >
          <div
            className={cn(
              "relative flex items-center justify-center",
              "bg-linear-to-br from-slate-100 to-white",
              "px-lg py-xl sm:px-2xl sm:py-3xl lg:py-4xl",
              variant === "causes" && "lg:pr-2xl",
            )}
          >
            {variant === "causes" ? (
              <span
                aria-hidden="true"
                className="absolute top-0 bottom-0 left-0 hidden w-4 bg-white lg:block"
              />
            ) : null}

            <div
              className={cn(
                "relative w-full max-w-[18rem] bg-primary p-1 sm:max-w-[20rem]",
                frameClip,
              )}
            >
              <div
                className={cn(
                  "relative aspect-[4/5] bg-white p-1.5",
                  frameClip,
                )}
              >
                <div
                  className={cn(
                    "relative h-full w-full overflow-hidden",
                    imageBackground,
                    frameClip,
                  )}
                >
                  <Image
                    key={section.image.src}
                    src={section.image.src}
                    alt={section.image.alt}
                    fill
                    unoptimized
                    className={imageFit}
                    sizes="(max-width: 1024px) 80vw, 20rem"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className={cn(
              "flex flex-col justify-center",
              "bg-primary-dark px-lg py-xl sm:px-2xl sm:py-3xl lg:px-3xl lg:py-4xl",
            )}
          >
            <h2 className="font-display text-[1.5rem] leading-tight text-white sm:text-[2rem] lg:text-[2.25rem]">
              <span className="font-normal">{section.headingPrefix} </span>
              <span className="font-bold">{section.title}</span>
            </h2>

            <span
              aria-hidden="true"
              className="mt-xl mb-xl block h-px w-full max-w-[18rem] bg-white/35"
            />

            <ul className="flex flex-col gap-lg">
              {section.items.map((item) => (
                <PanelBullet key={item} item={item} />
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}

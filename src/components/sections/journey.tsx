import Image from "next/image";
import { journeySection, type JourneyStage } from "@/data/journey";
import { JourneyMobileCarousel } from "@/components/sections/journey-mobile-carousel";
import { Container, Section } from "@/components/ui";

function JourneyStageCopy({ stage }: { stage: JourneyStage }) {
  return (
    <div className="px-1 text-center">
      <p className="text-small leading-snug">
        <span className="font-semibold text-primary">{stage.step}</span>{" "}
        <span className="font-semibold text-navy">{stage.label}</span>
      </p>
      <p className="mt-1 text-[0.8125rem] leading-relaxed text-slate-600">
        {stage.description}
      </p>
    </div>
  );
}

function JourneyStageIcon({ stage }: { stage: JourneyStage }) {
  return (
    <div className="relative mx-auto h-20 w-full max-w-[6.5rem] sm:h-24 sm:max-w-[7.5rem] lg:h-28 lg:max-w-[8.5rem] xl:h-32 xl:max-w-[9.5rem]">
      <Image
        src={stage.icon.src}
        alt={stage.icon.alt}
        fill
        className="object-contain object-bottom"
        sizes="(max-width: 1024px) 28vw, 9.5rem"
      />
    </div>
  );
}

function JourneyTimelineDot() {
  return (
    <span
      aria-hidden="true"
      className="relative z-10 h-2 w-2 rounded-full bg-primary ring-4 ring-surface"
    />
  );
}

function JourneyDesktop() {
  const { stages } = journeySection;

  return (
    <div className="hidden lg:grid lg:grid-cols-6 lg:gap-x-3">
      {stages.map((stage) => (
        <div key={`${stage.step}-icon`} className="flex justify-center">
          <JourneyStageIcon stage={stage} />
        </div>
      ))}

      <div className="relative col-span-6 grid grid-cols-6 py-4 lg:py-5">
        <div
          aria-hidden="true"
          className="absolute top-1/2 right-[8%] left-[8%] h-px -translate-y-1/2 bg-primary/30"
        />
        {stages.map((stage) => (
          <div key={`${stage.step}-dot`} className="flex justify-center">
            <JourneyTimelineDot />
          </div>
        ))}
      </div>

      {stages.map((stage) => (
        <div key={`${stage.step}-copy`}>
          <JourneyStageCopy stage={stage} />
        </div>
      ))}
    </div>
  );
}

export function Journey() {
  return (
    <Section background="surface" spacing="default">
      <Container size="wide">
        <JourneyDesktop />
        <JourneyMobileCarousel />
      </Container>
    </Section>
  );
}

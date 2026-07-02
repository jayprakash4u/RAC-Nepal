import Image from "next/image";
import {
  aboutMissionSection,
  type MissionItemKey,
} from "@/data/about-mission";
import { Container, Section, SectionHeader } from "@/components/ui";
import { cn } from "@/lib/cn";

const nodeThemes: Record<
  MissionItemKey,
  { ring: string; dash: string; text: string; dot: string }
> = {
  mission: {
    ring: "border-primary",
    dash: "border-primary/35",
    text: "text-primary",
    dot: "bg-primary",
  },
  vision: {
    ring: "border-primary-dark",
    dash: "border-primary-dark/30",
    text: "text-primary-dark",
    dot: "bg-primary-dark",
  },
  goal: {
    ring: "border-navy",
    dash: "border-navy/25",
    text: "text-navy",
    dot: "bg-navy",
  },
};

function MissionHub({
  src,
  alt,
  objectPosition,
}: {
  src: string;
  alt: string;
  objectPosition?: string;
}) {
  return (
    <div className="relative flex h-44 w-44 items-center justify-center sm:h-48 sm:w-48 lg:h-52 lg:w-52">
      <div
        aria-hidden="true"
        className="absolute -inset-2 rounded-full border-2 border-dashed border-primary/40"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full border-[4px] border-primary shadow-[0_12px_40px_rgba(15,23,42,0.12)]"
      />
      <div className="relative z-10 h-[calc(100%-1rem)] w-[calc(100%-1rem)] overflow-hidden rounded-full bg-slate-900 ring-2 ring-white/90">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          style={{ objectPosition: objectPosition ?? "center" }}
          sizes="(max-width: 1024px) 11rem, 13rem"
          unoptimized
        />
      </div>
    </div>
  );
}

function VisionIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={cn("h-7 w-7", className)}>
      <path
        d="M2.5 12.5s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12.5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function MissionIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={cn("h-7 w-7", className)}>
      <path
        d="M12 3l7 4v6c0 4-2.5 7-7 9-4.5-2-7-5-7-9V7l7-4z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9.5 12.5 11 14l3.5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GoalIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={cn("h-7 w-7", className)}>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
    </svg>
  );
}

const missionIcons: Record<
  MissionItemKey,
  React.ComponentType<{ className?: string }>
> = {
  mission: MissionIcon,
  vision: VisionIcon,
  goal: GoalIcon,
};

function MissionConnector() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 320"
      className="h-full min-h-[18rem] w-full"
      preserveAspectRatio="none"
    >
      <path
        d="M 0 160 C 42 160, 42 52, 100 52"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-slate-200"
      />
      <path
        d="M 0 160 L 100 160"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-slate-200"
      />
      <path
        d="M 0 160 C 42 160, 42 268, 100 268"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-slate-200"
      />
      <circle cx="0" cy="160" r="5" className="fill-primary/20" />
      <circle cx="100" cy="52" r="5" className="fill-primary" />
      <circle cx="100" cy="160" r="5" className="fill-primary-dark" />
      <circle cx="100" cy="268" r="5" className="fill-navy" />
    </svg>
  );
}

function MissionNode({
  id,
  title,
}: {
  id: MissionItemKey;
  title: string;
}) {
  const theme = nodeThemes[id];
  const Icon = missionIcons[id];

  return (
    <div className="relative flex h-[5.5rem] w-[5.5rem] shrink-0 items-center justify-center sm:h-24 sm:w-24">
      <div
        className={cn(
          "absolute inset-0 rounded-full border-2 border-dashed",
          theme.dash,
        )}
      />
      <div
        className={cn(
          "relative flex h-[4.75rem] w-[4.75rem] flex-col items-center justify-center gap-1 rounded-full border-[3px] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.08)] sm:h-[5.25rem] sm:w-[5.25rem]",
          theme.ring,
        )}
      >
        <Icon className={theme.text} />
        <span className={cn("font-display text-[0.6875rem] font-bold sm:text-small", theme.text)}>
          {title}
        </span>
      </div>
    </div>
  );
}

function MissionInfographicRow({
  id,
  title,
  description,
}: {
  id: MissionItemKey;
  title: string;
  description: string;
}) {
  return (
    <li className="flex items-center gap-md sm:gap-lg">
      <MissionNode id={id} title={title} />
      <p className="text-body max-w-[28rem] text-pretty leading-relaxed text-slate-600">
        {description}
      </p>
    </li>
  );
}

export function AboutMission() {
  const { description, items, image } = aboutMissionSection;

  return (
    <Section background="default" spacing="default">
      <Container size="wide">
        <SectionHeader
          align="center"
          eyebrow={aboutMissionSection.eyebrow}
          title={aboutMissionSection.title}
          description={description}
          decoratedEyebrow
          className="section-intro mx-auto"
        />

        <div className="section-content relative mt-2xl lg:mt-3xl">
          <div className="relative mx-auto w-full max-w-[44rem] lg:max-w-[58rem] xl:max-w-[62rem]">
            <div className="grid grid-cols-1 items-center gap-2xl lg:grid-cols-[auto_5rem_minmax(0,34rem)] lg:gap-x-0 xl:grid-cols-[auto_6rem_minmax(0,36rem)]">
              <div className="relative shrink-0 justify-self-center lg:justify-self-end lg:-translate-x-8 xl:-translate-x-10">
                <MissionHub
                  src={image.src}
                  alt={image.alt}
                  objectPosition={image.objectPosition}
                />
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none hidden min-h-[18rem] self-stretch py-6 lg:-ml-2 lg:block"
              >
                <MissionConnector />
              </div>

              <ul className="relative z-10 flex w-full max-w-[40rem] flex-col gap-xl justify-self-center sm:gap-2xl lg:max-w-none lg:justify-self-start lg:pl-2 xl:pl-4">
                {items.map((item) => (
                  <MissionInfographicRow
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    description={item.description}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

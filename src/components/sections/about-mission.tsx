import Image from "next/image";
import {
  aboutMissionSection,
  type MissionGallerySlot,
  type MissionItemKey,
} from "@/data/about-mission";
import { MissionMobileGallery } from "@/components/sections/about-mission-mobile-gallery";
import { Container, Section } from "@/components/ui";
import { cn } from "@/lib/cn";

function VisionIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path
        d="M2.5 12.5s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12.5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function MissionsIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path
        d="M9 18h6M10 22h4M12 2v1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 3a6 6 0 014 10.5V16a2 2 0 01-2 2h-4a2 2 0 01-2-2v-2.5A6 6 0 0112 3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GoalsIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
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
  vision: VisionIcon,
  missions: MissionsIcon,
  goals: GoalsIcon,
};

function MissionHeader() {
  const { eyebrow, title } = aboutMissionSection;

  return (
    <header className="w-full text-left">
      <p className="font-display text-eyebrow font-semibold tracking-[0.18em] text-primary uppercase">
        {eyebrow}
      </p>

      <h2 className="font-display mt-sm text-[2rem] font-bold leading-[1.15] tracking-tight text-navy sm:text-h2 lg:text-[2.5rem]">
        <span className="block">{title.prefix}</span>
        <span
          aria-hidden="true"
          className="mt-2 block h-1 w-12 rounded-full bg-primary"
        />
        <span className="mt-2 block">{title.highlight}</span>
      </h2>
    </header>
  );
}

function MissionItemRow({
  id,
  title,
  description,
}: {
  id: MissionItemKey;
  title: string;
  description: string;
}) {
  const Icon = missionIcons[id];

  return (
    <li className="flex gap-lg">
      <div className="flex h-14 w-14 shrink-0 rotate-45 items-center justify-center rounded-xl border border-primary/20 bg-primary-soft/55 shadow-[0_4px_14px_rgba(20,150,168,0.12)]">
        <div className="-rotate-45 text-primary">
          <Icon />
        </div>
      </div>

      <div className="flex-1 pt-0.5">
        <h3 className="text-body font-bold text-navy">{title}</h3>
        <p className="mt-sm w-full text-pretty text-small leading-relaxed text-slate-600">
          {description}
        </p>
      </div>
    </li>
  );
}

function FloatingDiamond({
  className,
  size = "sm",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  const sizeClass = size === "md" ? "h-5 w-5" : "h-3.5 w-3.5";

  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute rotate-45 rounded-[3px] bg-primary/25",
        sizeClass,
        className,
      )}
    />
  );
}

function GalleryDecor() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-[47%] h-[17rem] w-[17rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/8 sm:h-[20rem] sm:w-[20rem] lg:h-[24rem] lg:w-[24rem]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-[47%] h-[12rem] w-[12rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10 sm:h-[14rem] sm:w-[14rem] lg:h-[17rem] lg:w-[17rem]"
      />
      <FloatingDiamond className="top-[10%] left-[20%] opacity-70" />
      <FloatingDiamond className="bottom-[14%] left-[12%] opacity-60" />
      <FloatingDiamond className="top-[16%] right-[14%] opacity-60" size="md" />
    </>
  );
}

function DiamondFrame({
  slot,
  className,
}: {
  slot: MissionGallerySlot;
  className?: string;
}) {
  const sizeClass =
    slot.size === "lg"
      ? "h-52 w-52 sm:h-60 sm:w-60 lg:h-64 lg:w-64"
      : "h-36 w-36 sm:h-40 sm:w-40";

  return (
    <div
      className={cn(
        "relative rotate-45 overflow-hidden rounded-2xl bg-primary-soft/30 ring-2 ring-white shadow-[0_10px_30px_rgba(15,23,42,0.1)]",
        sizeClass,
        className,
      )}
    >
      <div
        className="absolute inset-0"
        style={{
          transform: `rotate(-45deg) scale(${slot.imageScale ?? 1.42})`,
        }}
      >
        <Image
          src={slot.src}
          alt={slot.alt}
          fill
          className="object-cover"
          style={{ objectPosition: slot.objectPosition ?? "center" }}
          sizes={slot.size === "lg" ? "256px" : "160px"}
          unoptimized
        />
      </div>
    </div>
  );
}

function MissionGallery() {
  const slots = Object.fromEntries(
    aboutMissionSection.gallery.map((slot) => [slot.id, slot]),
  ) as Record<MissionGallerySlot["id"], MissionGallerySlot>;

  return (
    <div className="relative mx-auto h-[24rem] w-full max-w-[26rem] sm:h-[27rem] lg:mx-0 lg:ml-auto lg:h-[30rem] lg:max-w-none lg:pr-4">
      <GalleryDecor />

      <DiamondFrame
        slot={slots.top}
        className="absolute top-[6%] left-[48%] z-10 -translate-x-1/2"
      />
      <DiamondFrame
        slot={slots.left}
        className="absolute top-1/2 left-[6%] z-10 -translate-y-1/2"
      />
      <DiamondFrame
        slot={slots.bottom}
        className="absolute bottom-[6%] left-[48%] z-10 -translate-x-1/2"
      />
      <DiamondFrame
        slot={slots.right}
        className="absolute top-1/2 right-[2%] z-20 -translate-y-1/2 lg:right-0"
      />
    </div>
  );
}

export function AboutMission() {
  return (
    <Section
      background="hero"
      spacing="default"
      className="overflow-hidden"
    >
      <Container size="wide">
        <div className="flex flex-col gap-xl sm:gap-3xl lg:flex-row lg:items-center lg:gap-4xl xl:gap-5xl">
          <div className="w-full lg:w-[50%] xl:w-[48%]">
            <MissionHeader />

            <ul className="mt-2xl flex flex-col gap-2xl lg:gap-[2.25rem]">
              {aboutMissionSection.items.map((item) => (
                <MissionItemRow
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </ul>
          </div>

          <div className="w-full shrink-0 lg:w-[50%] xl:w-[52%]">
            <MissionMobileGallery />
            <div className="hidden sm:block">
              <MissionGallery />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

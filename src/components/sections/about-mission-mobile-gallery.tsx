"use client";

import Image from "next/image";
import {
  aboutMissionSection,
  type MissionGallerySlot,
} from "@/data/about-mission";
import { MobileAutoCarousel } from "@/components/ui/mobile-auto-carousel";
import { cn } from "@/lib/cn";

function MobileMissionDiamond({ slot }: { slot: MissionGallerySlot }) {
  return (
    <div className="flex justify-center py-2">
      <div
        className={cn(
          "relative h-52 w-52 rotate-45 overflow-hidden rounded-2xl",
          "bg-primary-soft/30 ring-2 ring-white shadow-[0_10px_30px_rgba(15,23,42,0.12)]",
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
            sizes="208px"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}

export function MissionMobileGallery() {
  return (
    <MobileAutoCarousel
      className="sm:hidden"
      trackClassName="mx-auto w-full max-w-[14rem]"
      items={aboutMissionSection.gallery}
      getItemKey={(slot) => slot.id}
      ariaLabel="Our mission gallery"
      dotLabel={(slot) => slot.alt}
      prevLabel="Previous image"
      nextLabel="Next image"
      renderSlide={(slot) => <MobileMissionDiamond slot={slot} />}
    />
  );
}

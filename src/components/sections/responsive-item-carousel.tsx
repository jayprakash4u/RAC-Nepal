"use client";

import { MobileAutoCarousel } from "@/components/ui/mobile-auto-carousel";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export type ResponsiveItemCarouselProps<T> = {
  items: readonly T[];
  renderItem: (item: T, options: { elevated: boolean }) => ReactNode;
  getItemKey: (item: T, index: number) => string;
  ariaLabel: string;
  desktopGridClassName: string;
  mobileCarouselClassName?: string;
  carouselTrackClassName?: string;
  listItemClassName?: string;
  dotLabel?: (item: T, index: number) => string;
};

export function ResponsiveItemCarousel<T>({
  items,
  renderItem,
  getItemKey,
  ariaLabel,
  desktopGridClassName,
  mobileCarouselClassName = "section-content sm:hidden",
  carouselTrackClassName = "mx-auto max-w-[22rem]",
  listItemClassName = "flex",
  dotLabel,
}: ResponsiveItemCarouselProps<T>) {
  return (
    <>
      <MobileAutoCarousel
        className={mobileCarouselClassName}
        trackClassName={carouselTrackClassName}
        items={items}
        getItemKey={getItemKey}
        ariaLabel={ariaLabel}
        dotLabel={dotLabel}
        renderSlide={(item) => (
          <div className={cn("h-full", listItemClassName)}>
            {renderItem(item, { elevated: true })}
          </div>
        )}
      />

      <ul className={cn("hidden sm:grid", desktopGridClassName)}>
        {items.map((item, index) => (
          <li
            key={getItemKey(item, index)}
            className={listItemClassName}
          >
            {renderItem(item, { elevated: false })}
          </li>
        ))}
      </ul>
    </>
  );
}

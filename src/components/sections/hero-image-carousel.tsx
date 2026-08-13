"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { heroContent } from "@/data/hero";
import { cn } from "@/lib/cn";

const AUTO_INTERVAL_MS = 3000;

export function HeroImageCarousel({ className }: { className?: string }) {
  const images = heroContent.images;
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<number | undefined>(undefined);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) {
      return;
    }

    const timer = window.setInterval(goNext, AUTO_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [goNext, images.length]);

  const handleImageLoadingComplete = (naturalWidth: number, naturalHeight: number) => {
    if (naturalWidth && naturalHeight) {
      setAspectRatio(naturalWidth / naturalHeight);
    }
  };

  return (
    <div
      className={cn("relative w-full", className)}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-2xl shadow-[0_22px_50px_-32px_rgba(11,93,107,0.35)] ring-1 ring-primary/10 lg:rounded-3xl bg-slate-100",
          aspectRatio && `aspect-[${aspectRatio}]`
        )}
        style={
          aspectRatio
            ? { aspectRatio: String(aspectRatio) }
            : undefined
        }
        aria-roledescription="carousel"
        aria-label="Hero images"
      >
        {images.map((image, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={image.src}
              className={cn(
                "absolute inset-0",
                reduceMotion ? "" : "transition-opacity duration-700 ease-in-out",
                isActive ? "opacity-100" : "pointer-events-none opacity-0",
              )}
              aria-hidden={!isActive}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={index === 0}
                onLoadingComplete={(result) => {
                  if (result?.naturalWidth && result?.naturalHeight) {
                    handleImageLoadingComplete(result.naturalWidth, result.naturalHeight);
                  }
                }}
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 34rem"
              />
            </div>
          );
        })}
      </div>

      {images.length > 1 ? (
        <div
          className="absolute inset-x-0 bottom-3 flex justify-center gap-2 sm:bottom-4"
          role="tablist"
          aria-label="Hero image slides"
        >
          {images.map((image, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={image.src}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to image ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  isActive
                    ? "w-6 bg-white shadow-sm"
                    : "w-2 bg-white/50 hover:bg-white/75",
                )}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

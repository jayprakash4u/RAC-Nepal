"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Container, Section } from "@/components/ui";
import { MobileAutoCarousel } from "@/components/ui/mobile-auto-carousel";
import { galleryImages, type GalleryImage } from "@/data/gallery";
import { cn } from "@/lib/cn";

function ExpandIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-5 w-5"
    >
      <path
        d="M4 12V16h4M16 8V4h-4M16 16l-5-5M4 4l5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-5 w-5"
    >
      <path
        d="M5 5l10 10M15 5L5 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-5 w-5"
    >
      <path
        d={direction === "left" ? "M12 5l-5 5 5 5" : "M8 5l5 5-5 5"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GalleryItemButton({
  image,
  index,
  onOpen,
  elevated = false,
}: {
  image: GalleryImage;
  index: number;
  onOpen: (index: number) => void;
  elevated?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      className={cn(
        "group relative aspect-[4/3] w-full overflow-hidden rounded-xl",
        "border bg-surface shadow-sm transition-all duration-normal",
        elevated
          ? "border-primary/25 shadow-md -translate-y-0.5"
          : "border-slate-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
      )}
      aria-label={`View ${image.alt}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className={cn(
          "object-cover transition-transform duration-normal",
          elevated ? "scale-[1.04]" : "group-hover:scale-[1.04]",
        )}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
      />

      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 transition-colors duration-normal",
          elevated ? "bg-navy/15" : "bg-navy/0 group-hover:bg-navy/20",
        )}
      />

      <span
        aria-hidden="true"
        className={cn(
          "absolute right-md bottom-md flex h-9 w-9 items-center justify-center rounded-full",
          "bg-white/95 text-navy shadow-sm backdrop-blur-sm transition-all duration-normal",
          elevated ? "opacity-100" : "opacity-0 group-hover:opacity-100",
        )}
      >
        <ExpandIcon />
      </span>
    </button>
  );
}

function GalleryItem({
  image,
  index,
  onOpen,
}: {
  image: GalleryImage;
  index: number;
  onOpen: (index: number) => void;
}) {
  return (
    <li>
      <GalleryItemButton image={image} index={index} onOpen={onOpen} />
    </li>
  );
}

function GalleryLightbox({
  images,
  activeIndex,
  onClose,
  onNavigate,
}: {
  images: readonly GalleryImage[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const image = images[activeIndex];

  const goPrev = useCallback(() => {
    onNavigate(activeIndex > 0 ? activeIndex - 1 : images.length - 1);
  }, [activeIndex, images.length, onNavigate]);

  const goNext = useCallback(() => {
    onNavigate(activeIndex < images.length - 1 ? activeIndex + 1 : 0);
  }, [activeIndex, images.length, onNavigate]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [goNext, goPrev, onClose]);

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery viewer"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-navy/92 backdrop-blur-sm"
        aria-label="Close gallery viewer"
      />

      <div className="relative z-10 flex h-full w-full items-center justify-center px-md py-2xl sm:px-lg">
        <button
          type="button"
          onClick={goPrev}
          className={cn(
            "absolute top-1/2 left-md z-20 hidden -translate-y-1/2 sm:flex",
            "h-11 w-11 items-center justify-center rounded-full",
            "bg-white/12 text-white transition-colors hover:bg-white/22",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
          )}
          aria-label="Previous image"
        >
          <ChevronIcon direction="left" />
        </button>

        <div className="relative h-[min(82vh,920px)] w-full max-w-[min(96vw,1500px)]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-contain"
            sizes="96vw"
            quality={90}
            priority
          />
        </div>

        <button
          type="button"
          onClick={goNext}
          className={cn(
            "absolute top-1/2 right-md z-20 hidden -translate-y-1/2 sm:flex",
            "h-11 w-11 items-center justify-center rounded-full",
            "bg-white/12 text-white transition-colors hover:bg-white/22",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
          )}
          aria-label="Next image"
        >
          <ChevronIcon direction="right" />
        </button>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between gap-md px-md py-lg sm:px-xl">
        <p className="text-small font-medium text-white/90">
          {activeIndex + 1} / {images.length}
        </p>

        <div className="flex items-center gap-sm sm:hidden">
          <button
            type="button"
            onClick={goPrev}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full",
              "bg-white/12 text-white transition-colors hover:bg-white/22",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
            )}
            aria-label="Previous image"
          >
            <ChevronIcon direction="left" />
          </button>

          <button
            type="button"
            onClick={goNext}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full",
              "bg-white/12 text-white transition-colors hover:bg-white/22",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
            )}
            aria-label="Next image"
          >
            <ChevronIcon direction="right" />
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full",
            "bg-white/12 text-white transition-colors hover:bg-white/22",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
          )}
          aria-label="Close gallery viewer"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}

export function GalleryGrid() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <Section background="default" spacing="default">
        <Container size="wide">
          <div className="sm:hidden">
            <MobileAutoCarousel
              items={galleryImages}
              getItemKey={(image) => image.id}
              ariaLabel="Gallery photos"
              trackClassName="w-full"
              dotLabel={(image) => `Go to ${image.alt}`}
              prevLabel="Previous photo"
              nextLabel="Next photo"
              renderSlide={(image, index) => (
                <GalleryItemButton
                  image={image}
                  index={index}
                  onOpen={setActiveIndex}
                  elevated
                />
              )}
            />
          </div>

          <ul className="hidden grid-cols-2 gap-md sm:grid sm:gap-lg md:grid-cols-3 lg:grid-cols-4 lg:gap-xl">
            {galleryImages.map((image, index) => (
              <GalleryItem
                key={image.id}
                image={image}
                index={index}
                onOpen={setActiveIndex}
              />
            ))}
          </ul>
        </Container>
      </Section>

      {activeIndex !== null ? (
        <GalleryLightbox
          images={galleryImages}
          activeIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      ) : null}
    </>
  );
}

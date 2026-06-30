import Image from "next/image";
import { cn } from "@/lib/cn";

export const serviceIconCardClasses = cn(
  "group relative flex h-full w-full flex-col overflow-hidden",
  "rounded-2xl border border-transparent bg-white shadow-sm",
  "transition-all duration-300 ease-out",
  "hover:-translate-y-1.5 hover:border-primary/15",
  "hover:shadow-[0_14px_30px_-14px_color-mix(in_srgb,var(--color-primary)_38%,transparent)]",
);

export const serviceIconCardElevatedClasses = cn(
  "service-icon-card-active -translate-y-1.5 border-primary/15",
  "shadow-[0_14px_30px_-14px_color-mix(in_srgb,var(--color-primary)_38%,transparent)]",
  "motion-reduce:translate-y-0",
);

export const serviceIconRingElevatedClasses =
  "scale-110 border-primary bg-primary-soft/25 motion-reduce:scale-100";

export const serviceIconImageElevatedClasses =
  "scale-105 motion-reduce:scale-100";

export const serviceIconRingClasses = cn(
  "service-icon-ring relative flex shrink-0 items-center justify-center",
  "rounded-full border-2 border-primary/30 bg-white",
  "transition-all duration-300 ease-out",
  "group-hover:scale-110 group-hover:border-primary group-hover:bg-primary-soft/25",
);

export function ServiceCardHoverOverlay({ active = false }: { active?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 transition-opacity duration-300",
        "bg-linear-to-br from-primary/10 via-transparent to-primary/5",
        active ? "opacity-100" : "opacity-0 group-hover:opacity-100",
      )}
    />
  );
}

export function ServiceIconCardLabel({
  label,
  elevated = false,
}: {
  label: string;
  elevated?: boolean;
}) {
  return (
    <div className="relative mt-sm flex w-full flex-col items-center">
      <p
        className={cn(
          "min-h-[2.75rem] w-full text-center text-[0.8125rem] font-semibold leading-snug sm:text-small",
          "transition-colors duration-300",
          elevated ? "text-primary" : "text-navy group-hover:text-primary",
        )}
      >
        {label}
      </p>
      <span
        aria-hidden="true"
        className={cn(
          "mt-1 block h-0.5 rounded-full bg-primary transition-all duration-300",
          elevated ? "w-10" : "w-0 group-hover:w-10",
        )}
      />
    </div>
  );
}

export function ServiceIconCard({
  label,
  image,
  imageWidth = 320,
  imageHeight = 320,
  imageClassName,
  ringClassName,
  sizes = "(max-width: 640px) 5.5rem, 6rem",
  className,
  elevated = false,
}: {
  label: string;
  image: { src: string; alt: string };
  imageWidth?: number;
  imageHeight?: number;
  imageClassName?: string;
  ringClassName?: string;
  sizes?: string;
  className?: string;
  elevated?: boolean;
}) {
  return (
    <article
      className={cn(
        serviceIconCardClasses,
        "items-center justify-between px-sm py-md sm:px-md sm:py-lg",
        elevated && serviceIconCardElevatedClasses,
        !elevated && "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      <ServiceCardHoverOverlay active={elevated} />

      <div className="relative flex w-full flex-1 items-center justify-center">
        <div
          className={cn(
            serviceIconRingClasses,
            "h-[5.5rem] w-[5.5rem] p-2.5 sm:h-24 sm:w-24 sm:p-3",
            elevated && serviceIconRingElevatedClasses,
            ringClassName,
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={imageWidth}
            height={imageHeight}
            className={cn(
              "service-icon-bounce h-full w-full object-contain transition-transform duration-300",
              elevated
                ? serviceIconImageElevatedClasses
                : "group-hover:scale-105",
              imageClassName,
            )}
            sizes={sizes}
          />
        </div>
      </div>

      <ServiceIconCardLabel label={label} elevated={elevated} />
    </article>
  );
}

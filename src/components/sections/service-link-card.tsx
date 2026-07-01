import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-3.5 w-3.5 transition-transform duration-normal group-hover:translate-x-0.5"
    >
      <path
        d="M4 10h12M11 5l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ServiceLinkCard({
  label,
  href,
  image,
  elevated = false,
  actionLabel = "View details",
  imageVariant = "default",
}: {
  label: string;
  href: string;
  image?: { src: string; alt: string };
  elevated?: boolean;
  actionLabel?: string;
  imageVariant?: "default" | "banner";
}) {
  const isBannerImage = imageVariant === "banner";

  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full w-full flex-col overflow-hidden rounded-lg",
        "border border-slate-200 bg-white",
        "transition-colors duration-normal",
        elevated ? "border-primary/35 bg-white" : "hover:border-primary/35",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        elevated &&
          "-translate-y-1 shadow-[0_14px_30px_-14px_color-mix(in_srgb,var(--color-primary)_38%,transparent)] motion-reduce:translate-y-0",
        !elevated && "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
      )}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden border-b border-slate-100",
          isBannerImage
            ? "aspect-[4/3] bg-slate-100"
            : "flex h-36 items-center justify-center bg-white p-md transition-colors duration-normal",
          !isBannerImage && (elevated ? "bg-slate-50" : "group-hover:bg-slate-50"),
        )}
      >
        {image?.src ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className={cn(
              isBannerImage
                ? "object-cover object-center transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                : "object-contain",
            )}
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 12vw"
          />
        ) : null}
      </div>

      <div
        className={cn(
          "border-t border-slate-100",
          isBannerImage ? "px-2 py-1.5" : "px-sm py-sm sm:px-md",
        )}
      >
        <p
          className={cn(
            "text-center font-semibold leading-snug tracking-normal transition-colors duration-normal",
            isBannerImage
              ? "line-clamp-2 text-[0.75rem] leading-tight sm:text-[0.8125rem]"
              : "text-[0.8125rem] sm:text-small",
            elevated ? "text-primary" : "text-navy group-hover:text-primary",
          )}
        >
          {label}
        </p>

        <span
          aria-hidden="true"
          className={cn(
            "flex items-center justify-center gap-0.5 font-medium text-primary transition-opacity duration-normal",
            isBannerImage ? "mt-0.5 text-[0.6875rem]" : "mt-xs text-[0.8125rem]",
            elevated ? "opacity-100" : "opacity-0 group-hover:opacity-100",
          )}
        >
          {actionLabel}
          <ArrowIcon />
        </span>
      </div>
    </Link>
  );
}

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

export function Logo({
  className,
  imageClassName,
  priority = false,
}: LogoProps) {
  const { logo } = siteConfig;

  return (
    <Link
      href="/"
      className={cn("inline-flex shrink-0 items-center", className)}
      aria-label={siteConfig.name}
    >
      <Image
        src={logo.src}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        priority={priority}
        className={cn("h-12 w-auto md:h-14", imageClassName)}
      />
    </Link>
  );
}

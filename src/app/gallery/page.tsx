import { GalleryGrid } from "@/components/sections/gallery-grid";
import { GalleryPageHero } from "@/components/sections/gallery-page-hero";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: `View photos from ${siteConfig.name} — our facilities, team, and rheumatology care in Kathmandu, Nepal.`,
};

export default function GalleryPage() {
  return (
    <>
      <GalleryPageHero />
      <GalleryGrid />
    </>
  );
}

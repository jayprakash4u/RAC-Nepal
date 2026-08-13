import { GalleryGrid } from "@/components/sections/gallery-grid";
import { GalleryPageHero } from "@/components/sections/gallery-page-hero";
import { siteConfig } from "@/config/site";
import { getGalleryImages } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: `View photos from ${siteConfig.name} — our facilities, team, and rheumatology care in Kathmandu, Nepal.`,
};

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <>
      <GalleryPageHero />
      <GalleryGrid images={images} />
    </>
  );
}

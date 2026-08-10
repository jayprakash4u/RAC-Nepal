import { siteConfig } from "@/config/site";
import galleryJson from "./gallery.json";

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
};

export const galleryPage = {
  title: "A Glimpse Into",
  titleAccent: "RAC Nepal",
  description: `Moments from ${siteConfig.shortName} — our facilities, team, and the compassionate rheumatology care we provide every day in Kathmandu.`,
} as const;

export const galleryImages: readonly GalleryImage[] = galleryJson;

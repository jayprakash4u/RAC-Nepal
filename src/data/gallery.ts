import { siteConfig } from "@/config/site";

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

export const galleryImages: readonly GalleryImage[] = [
  { id: "1", src: "/images/Gallery/RacNepal-1-300x225.jpg", alt: "RAC Nepal gallery — photo 1" },
  { id: "2", src: "/images/Gallery/RacNepal-2-scaled.jpg", alt: "RAC Nepal gallery — photo 2" },
  { id: "3", src: "/images/Gallery/RacNepal-3-scaled.jpg", alt: "RAC Nepal gallery — photo 3" },
  { id: "4", src: "/images/Gallery/RacNepal-4-scaled.jpg", alt: "RAC Nepal gallery — photo 4" },
  { id: "5", src: "/images/Gallery/RacNepal-5-scaled.jpg", alt: "RAC Nepal gallery — photo 5" },
  { id: "6", src: "/images/Gallery/RacNepal-6-scaled.jpg", alt: "RAC Nepal gallery — photo 6" },
  { id: "7", src: "/images/Gallery/RacNepal-7-scaled.jpg", alt: "RAC Nepal gallery — photo 7" },
  { id: "8", src: "/images/Gallery/RacNepal-8-scaled.jpg", alt: "RAC Nepal gallery — photo 8" },
  { id: "9", src: "/images/Gallery/RacNepal-9-scaled.jpg", alt: "RAC Nepal gallery — photo 9" },
  { id: "10", src: "/images/Gallery/RacNepal-10-scaled.jpg", alt: "RAC Nepal gallery — photo 10" },
  { id: "11", src: "/images/Gallery/RacNepal-11-scaled.jpg", alt: "RAC Nepal gallery — photo 11" },
  { id: "12", src: "/images/Gallery/RacNepal-12-scaled.jpg", alt: "RAC Nepal gallery — photo 12" },
  { id: "13", src: "/images/Gallery/RacNepal-13-scaled.jpg", alt: "RAC Nepal gallery — photo 13" },
  { id: "14", src: "/images/Gallery/RacNepal-14-scaled.jpg", alt: "RAC Nepal gallery — photo 14" },
  { id: "15", src: "/images/Gallery/RacNepal-15-scaled.jpg", alt: "RAC Nepal gallery — photo 15" },
  { id: "16", src: "/images/Gallery/RacNepal-16-scaled.jpg", alt: "RAC Nepal gallery — photo 16" },
  { id: "17", src: "/images/Gallery/RacNepal-17-scaled.jpg", alt: "RAC Nepal gallery — photo 17" },
  { id: "18", src: "/images/Gallery/RacNepal-18-scaled.jpg", alt: "RAC Nepal gallery — photo 18" },
  { id: "19", src: "/images/Gallery/RacNepal-19-scaled.jpg", alt: "RAC Nepal gallery — photo 19" },
  { id: "20", src: "/images/Gallery/RacNepal-20-scaled.jpg", alt: "RAC Nepal gallery — photo 20" },
  { id: "21", src: "/images/Gallery/RacNepal-21-scaled.jpg", alt: "RAC Nepal gallery — photo 21" },
  { id: "22", src: "/images/Gallery/RacNepal-22-scaled.jpg", alt: "RAC Nepal gallery — photo 22" },
  { id: "23", src: "/images/Gallery/RacNepal-23-scaled.jpg", alt: "RAC Nepal gallery — photo 23" },
] as const;

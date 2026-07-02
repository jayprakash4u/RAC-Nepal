import { CenteredPageHero } from "@/components/sections/centered-page-hero";
import { galleryPage } from "@/data/gallery";

export function GalleryPageHero() {
  return (
    <CenteredPageHero
      content={{
        eyebrow: "Our Gallery",
        title: galleryPage.title,
        titleAccent: galleryPage.titleAccent,
        description: galleryPage.description,
      }}
    />
  );
}

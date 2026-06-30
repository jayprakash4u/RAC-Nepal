import { Container, PageHero, Section } from "@/components/ui";
import { galleryPage } from "@/data/gallery";

export function GalleryPageHero() {
  return (
    <Section
      background="hero"
      spacing="none"
      className="border-b border-primary-dark/10"
    >
      <Container size="wide" className="page-hero-padding">
        <PageHero
          title={galleryPage.title}
          titleAccent={galleryPage.titleAccent}
          description={galleryPage.description}
        />
      </Container>
    </Section>
  );
}

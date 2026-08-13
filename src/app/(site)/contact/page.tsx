import { ContactPageHero, ContactSection } from "@/components/sections/contact";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${siteConfig.name} — schedule an appointment or reach our rheumatology care team in Nepal.`,
};

export default function ContactPage() {
  return (
    <>
      <ContactPageHero />
      <ContactSection />
    </>
  );
}

import { AboutApproach } from "@/components/sections/about-approach";
import { AboutFounder } from "@/components/sections/about-founder";
import { AboutPageHero } from "@/components/sections/about-page-hero";
import { AboutMission } from "@/components/sections/about-mission";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${siteConfig.name} — expert rheumatology and arthritis care in Nepal.`,
};

export default function AboutPage() {
  return (
    <>
      <AboutPageHero />
      <AboutFounder />
      <AboutMission />
      <AboutApproach />
    </>
  );
}

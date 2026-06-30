import {
  OurAllianceBenefits,
  OurAllianceComparison,
  OurAllianceHero,
  OurAllianceHowItWorks,
  OurAlliancePartners,
  OurAlliancePartnership,
  OurAllianceWhatIs,
} from "@/components/sections/our-alliance-page";
import { ourAlliancePage } from "@/data/our-alliance-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: ourAlliancePage.meta.title,
  description: ourAlliancePage.meta.description,
};

export default function OurAlliancePage() {
  return (
    <>
      <OurAllianceHero />
      <OurAllianceWhatIs />
      <OurAlliancePartners />
      <OurAllianceComparison />
      <OurAllianceHowItWorks />
      <OurAllianceBenefits />
      <OurAlliancePartnership />
    </>
  );
}

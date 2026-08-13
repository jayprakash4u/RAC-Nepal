import {
  OurAllianceCollaborationImpact,
  OurAllianceHero,
  OurAllianceKeyPartners,
  OurAllianceTrustedBy,
  OurAllianceTypes,
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
      <OurAllianceTrustedBy />
      <OurAllianceKeyPartners />
      <OurAllianceTypes />
      <OurAllianceCollaborationImpact />
    </>
  );
}

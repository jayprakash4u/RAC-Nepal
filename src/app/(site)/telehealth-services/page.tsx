import {
  TelehealthComparison,
  TelehealthHowItWorks,
  TelehealthWhatIs,
} from "@/components/sections/telehealth-page";
import { TelehealthConditions } from "@/components/sections/telehealth-conditions-section";
import { TelehealthPageHero } from "@/components/sections/telehealth-page-hero";
import { TelehealthServicesOffer } from "@/components/sections/telehealth-services-offer";
import { telehealthPage } from "@/data/telehealth-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: telehealthPage.meta.title,
  description: telehealthPage.meta.description,
};

export default function TelehealthServicesPage() {
  return (
    <>
      <TelehealthPageHero />
      <TelehealthWhatIs />
      <TelehealthServicesOffer />
      <TelehealthConditions />
      <TelehealthComparison />
      <TelehealthHowItWorks />
    </>
  );
}

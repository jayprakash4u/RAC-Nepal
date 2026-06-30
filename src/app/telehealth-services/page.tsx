import {
  TelehealthBenefits,
  TelehealthComparison,
  TelehealthConditions,
  TelehealthHero,
  TelehealthHowItWorks,
  TelehealthPricing,
  TelehealthWhatIs,
} from "@/components/sections/telehealth-page";
import { telehealthPage } from "@/data/telehealth-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: telehealthPage.meta.title,
  description: telehealthPage.meta.description,
};

export default function TelehealthServicesPage() {
  return (
    <>
      <TelehealthHero />
      <TelehealthWhatIs />
      <TelehealthConditions />
      <TelehealthComparison />
      <TelehealthHowItWorks />
      <TelehealthBenefits />
      <TelehealthPricing />
    </>
  );
}

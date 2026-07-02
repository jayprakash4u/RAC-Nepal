import { SplitPageHero } from "@/components/sections/split-page-hero";
import { telehealthPageHero } from "@/data/telehealth-page";

export function TelehealthPageHero() {
  return <SplitPageHero content={telehealthPageHero} compact />;
}

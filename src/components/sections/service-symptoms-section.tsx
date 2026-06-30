import { ServiceSplitPanelSection } from "@/components/sections/service-split-panel-section";
import type { ServicePanelSectionData } from "@/types/service-content";

export function ServiceSymptomsSection({
  section,
}: {
  section: ServicePanelSectionData;
}) {
  return (
    <ServiceSplitPanelSection
      section={{
        ...section,
        headingPrefix: section.headingPrefix ?? "Symptoms of",
      }}
      variant="symptoms"
    />
  );
}

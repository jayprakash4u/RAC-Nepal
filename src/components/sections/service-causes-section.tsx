import { ServiceSplitPanelSection } from "@/components/sections/service-split-panel-section";
import type { ServicePanelSectionData } from "@/types/service-content";

export function ServiceCausesSection({
  section,
}: {
  section: ServicePanelSectionData;
}) {
  return (
    <ServiceSplitPanelSection
      section={{
        ...section,
        headingPrefix: section.headingPrefix ?? "Causes of",
      }}
      variant="causes"
    />
  );
}

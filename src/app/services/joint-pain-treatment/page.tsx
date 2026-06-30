import {
  ServiceBreadcrumb,
  ServiceContent,
} from "@/components/sections/service-content";
import { jointPainTreatmentService } from "@/data/services/joint-pain-treatment";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: jointPainTreatmentService.meta.title,
  description: jointPainTreatmentService.meta.description,
};

export default function JointPainTreatmentPage() {
  return (
    <>
      <ServiceBreadcrumb serviceTitle={jointPainTreatmentService.title} />
      <ServiceContent service={jointPainTreatmentService} />
    </>
  );
}

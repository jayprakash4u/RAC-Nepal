import {
  ServiceBreadcrumb,
  ServicePage,
} from "@/components/sections/service-content";
import { rheumatologyConsultationService } from "@/data/services/rheumatology-consultation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: rheumatologyConsultationService.meta.title,
  description: rheumatologyConsultationService.meta.description,
};

export default function RheumatologyConsultationPage() {
  return (
    <>
      <ServiceBreadcrumb
        serviceTitle={rheumatologyConsultationService.title}
      />
      <ServicePage service={rheumatologyConsultationService} />
    </>
  );
}

import {
  ServiceBreadcrumb,
  ServiceContent,
} from "@/components/sections/service-content";
import { physiotherapyRehabilitationService } from "@/data/services/physiotherapy-rehabilitation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: physiotherapyRehabilitationService.meta.title,
  description: physiotherapyRehabilitationService.meta.description,
};

export default function PhysiotherapyRehabilitationPage() {
  return (
    <>
      <ServiceBreadcrumb
        serviceTitle={physiotherapyRehabilitationService.title}
      />
      <ServiceContent service={physiotherapyRehabilitationService} />
    </>
  );
}

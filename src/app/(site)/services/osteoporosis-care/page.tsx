import {
  ServiceBreadcrumb,
  ServiceContent,
} from "@/components/sections/service-content";
import { osteoporosisCareService } from "@/data/services/osteoporosis-care";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: osteoporosisCareService.meta.title,
  description: osteoporosisCareService.meta.description,
};

export default function OsteoporosisCarePage() {
  return (
    <>
      <ServiceBreadcrumb serviceTitle={osteoporosisCareService.title} />
      <ServiceContent service={osteoporosisCareService} />
    </>
  );
}

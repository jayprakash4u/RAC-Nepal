import {
  ServiceBreadcrumb,
  ServiceContent,
} from "@/components/sections/service-content";
import { pharmacyServicesService } from "@/data/services/pharmacy-services";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: pharmacyServicesService.meta.title,
  description: pharmacyServicesService.meta.description,
};

export default function PharmacyPage() {
  return (
    <>
      <ServiceBreadcrumb serviceTitle={pharmacyServicesService.title} />
      <ServiceContent service={pharmacyServicesService} />
    </>
  );
}

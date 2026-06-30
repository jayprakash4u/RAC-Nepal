import {
  ServiceBreadcrumb,
  ServiceContent,
} from "@/components/sections/service-content";
import { homeCareService } from "@/data/services/home-care";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: homeCareService.meta.title,
  description: homeCareService.meta.description,
};

export default function HomeCarePage() {
  return (
    <>
      <ServiceBreadcrumb serviceTitle={homeCareService.title} />
      <ServiceContent service={homeCareService} />
    </>
  );
}

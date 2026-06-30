import {
  ServiceBreadcrumb,
  ServiceContent,
} from "@/components/sections/service-content";
import { autoimmuneCareService } from "@/data/services/autoimmune-care";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: autoimmuneCareService.meta.title,
  description: autoimmuneCareService.meta.description,
};

export default function AutoimmuneCarePage() {
  return (
    <>
      <ServiceBreadcrumb serviceTitle={autoimmuneCareService.title} />
      <ServiceContent service={autoimmuneCareService} />
    </>
  );
}

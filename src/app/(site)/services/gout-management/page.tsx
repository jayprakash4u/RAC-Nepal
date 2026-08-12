import {
  ServiceBreadcrumb,
  ServiceContent,
} from "@/components/sections/service-content";
import { goutManagementService } from "@/data/services/gout-management";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: goutManagementService.meta.title,
  description: goutManagementService.meta.description,
};

export default function GoutManagementPage() {
  return (
    <>
      <ServiceBreadcrumb serviceTitle={goutManagementService.title} />
      <ServiceContent service={goutManagementService} />
    </>
  );
}

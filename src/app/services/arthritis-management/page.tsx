import {
  ServiceBreadcrumb,
  ServicePage,
} from "@/components/sections/service-content";
import { arthritisManagementService } from "@/data/services/arthritis-management";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: arthritisManagementService.meta.title,
  description: arthritisManagementService.meta.description,
};

export default function ArthritisManagementPage() {
  return (
    <>
      <ServiceBreadcrumb serviceTitle={arthritisManagementService.title} />
      <ServicePage service={arthritisManagementService} />
    </>
  );
}

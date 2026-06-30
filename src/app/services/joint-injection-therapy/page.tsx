import {
  ServiceBreadcrumb,
  ServiceContent,
} from "@/components/sections/service-content";
import { jointInjectionTherapyService } from "@/data/services/joint-injection-therapy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: jointInjectionTherapyService.meta.title,
  description: jointInjectionTherapyService.meta.description,
};

export default function JointInjectionTherapyPage() {
  return (
    <>
      <ServiceBreadcrumb
        serviceTitle={jointInjectionTherapyService.title}
      />
      <ServiceContent service={jointInjectionTherapyService} />
    </>
  );
}

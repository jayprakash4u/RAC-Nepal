import {
  ConditionBreadcrumb,
  ConditionContent,
} from "@/components/sections/condition-content";
import { osteoarthritisCondition } from "@/data/conditions/osteoarthritis";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: osteoarthritisCondition.meta.title,
  description: osteoarthritisCondition.meta.description,
};

export default function OsteoarthritisPage() {
  return (
    <>
      <ConditionBreadcrumb conditionTitle={osteoarthritisCondition.title} />
      <ConditionContent condition={osteoarthritisCondition} />
    </>
  );
}

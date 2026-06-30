import {
  ConditionBreadcrumb,
  ConditionContent,
} from "@/components/sections/condition-content";
import { osteoporosisCondition } from "@/data/conditions/osteoporosis";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: osteoporosisCondition.meta.title,
  description: osteoporosisCondition.meta.description,
};

export default function OsteoporosisPage() {
  return (
    <>
      <ConditionBreadcrumb conditionTitle={osteoporosisCondition.title} />
      <ConditionContent condition={osteoporosisCondition} />
    </>
  );
}

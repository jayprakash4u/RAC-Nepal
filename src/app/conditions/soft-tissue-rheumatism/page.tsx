import {
  ConditionBreadcrumb,
  ConditionContent,
} from "@/components/sections/condition-content";
import { softTissueRheumatismCondition } from "@/data/conditions/soft-tissue-rheumatism";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: softTissueRheumatismCondition.meta.title,
  description: softTissueRheumatismCondition.meta.description,
};

export default function SoftTissueRheumatismPage() {
  return (
    <>
      <ConditionBreadcrumb
        conditionTitle={softTissueRheumatismCondition.title}
      />
      <ConditionContent condition={softTissueRheumatismCondition} />
    </>
  );
}

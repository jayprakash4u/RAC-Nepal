import {
  ConditionBreadcrumb,
  ConditionContent,
} from "@/components/sections/condition-content";
import { sjogrensSyndromeCondition } from "@/data/conditions/sjogrens-syndrome";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: sjogrensSyndromeCondition.meta.title,
  description: sjogrensSyndromeCondition.meta.description,
};

export default function SjogrensSyndromePage() {
  return (
    <>
      <ConditionBreadcrumb
        conditionTitle={sjogrensSyndromeCondition.title}
      />
      <ConditionContent condition={sjogrensSyndromeCondition} />
    </>
  );
}

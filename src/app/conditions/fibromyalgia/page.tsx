import {
  ConditionBreadcrumb,
  ConditionContent,
} from "@/components/sections/condition-content";
import { fibromyalgiaCondition } from "@/data/conditions/fibromyalgia";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: fibromyalgiaCondition.meta.title,
  description: fibromyalgiaCondition.meta.description,
};

export default function FibromyalgiaPage() {
  return (
    <>
      <ConditionBreadcrumb conditionTitle={fibromyalgiaCondition.title} />
      <ConditionContent condition={fibromyalgiaCondition} />
    </>
  );
}

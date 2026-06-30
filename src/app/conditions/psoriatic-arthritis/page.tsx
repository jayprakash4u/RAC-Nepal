import {
  ConditionBreadcrumb,
  ConditionContent,
} from "@/components/sections/condition-content";
import { psoriaticArthritisCondition } from "@/data/conditions/psoriatic-arthritis";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: psoriaticArthritisCondition.meta.title,
  description: psoriaticArthritisCondition.meta.description,
};

export default function PsoriaticArthritisPage() {
  return (
    <>
      <ConditionBreadcrumb conditionTitle={psoriaticArthritisCondition.title} />
      <ConditionContent condition={psoriaticArthritisCondition} />
    </>
  );
}

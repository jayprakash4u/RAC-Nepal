import {
  ConditionBreadcrumb,
  ConditionContent,
} from "@/components/sections/condition-content";
import { reactiveArthritisCondition } from "@/data/conditions/reactive-arthritis";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: reactiveArthritisCondition.meta.title,
  description: reactiveArthritisCondition.meta.description,
};

export default function ReactiveArthritisPage() {
  return (
    <>
      <ConditionBreadcrumb conditionTitle={reactiveArthritisCondition.title} />
      <ConditionContent condition={reactiveArthritisCondition} />
    </>
  );
}

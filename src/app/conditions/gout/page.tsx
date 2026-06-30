import {
  ConditionBreadcrumb,
  ConditionContent,
} from "@/components/sections/condition-content";
import { goutCondition } from "@/data/conditions/gout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: goutCondition.meta.title,
  description: goutCondition.meta.description,
};

export default function GoutPage() {
  return (
    <>
      <ConditionBreadcrumb conditionTitle={goutCondition.title} />
      <ConditionContent condition={goutCondition} />
    </>
  );
}

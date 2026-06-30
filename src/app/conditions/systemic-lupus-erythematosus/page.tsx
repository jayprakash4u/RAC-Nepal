import {
  ConditionBreadcrumb,
  ConditionContent,
} from "@/components/sections/condition-content";
import { systemicLupusErythematosusCondition } from "@/data/conditions/systemic-lupus-erythematosus";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: systemicLupusErythematosusCondition.meta.title,
  description: systemicLupusErythematosusCondition.meta.description,
};

export default function SystemicLupusErythematosusPage() {
  return (
    <>
      <ConditionBreadcrumb
        conditionTitle={systemicLupusErythematosusCondition.title}
      />
      <ConditionContent condition={systemicLupusErythematosusCondition} />
    </>
  );
}

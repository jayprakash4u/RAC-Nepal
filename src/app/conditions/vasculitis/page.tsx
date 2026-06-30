import {
  ConditionBreadcrumb,
  ConditionContent,
} from "@/components/sections/condition-content";
import { vasculitisCondition } from "@/data/conditions/vasculitis";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: vasculitisCondition.meta.title,
  description: vasculitisCondition.meta.description,
};

export default function VasculitisPage() {
  return (
    <>
      <ConditionBreadcrumb conditionTitle={vasculitisCondition.title} />
      <ConditionContent condition={vasculitisCondition} />
    </>
  );
}

import {
  ConditionBreadcrumb,
  ConditionContent,
} from "@/components/sections/condition-content";
import { chronicBackPainJointPainCondition } from "@/data/conditions/chronic-back-pain-joint-pain";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: chronicBackPainJointPainCondition.meta.title,
  description: chronicBackPainJointPainCondition.meta.description,
};

export default function ChronicBackPainJointPainPage() {
  return (
    <>
      <ConditionBreadcrumb
        conditionTitle={chronicBackPainJointPainCondition.title}
      />
      <ConditionContent condition={chronicBackPainJointPainCondition} />
    </>
  );
}

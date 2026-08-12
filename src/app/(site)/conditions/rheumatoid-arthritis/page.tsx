import {
  ConditionBreadcrumb,
  ConditionContent,
} from "@/components/sections/condition-content";
import { rheumatoidArthritisCondition } from "@/data/conditions/rheumatoid-arthritis";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: rheumatoidArthritisCondition.meta.title,
  description: rheumatoidArthritisCondition.meta.description,
};

export default function RheumatoidArthritisPage() {
  return (
    <>
      <ConditionBreadcrumb
        conditionTitle={rheumatoidArthritisCondition.title}
      />
      <ConditionContent condition={rheumatoidArthritisCondition} />
    </>
  );
}

import {
  ConditionBreadcrumb,
  ConditionContent,
} from "@/components/sections/condition-content";
import { ankylosingSpondylitisCondition } from "@/data/conditions/ankylosing-spondylitis";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: ankylosingSpondylitisCondition.meta.title,
  description: ankylosingSpondylitisCondition.meta.description,
};

export default function AnkylosingSpondylitisPage() {
  return (
    <>
      <ConditionBreadcrumb
        conditionTitle={ankylosingSpondylitisCondition.title}
      />
      <ConditionContent condition={ankylosingSpondylitisCondition} />
    </>
  );
}

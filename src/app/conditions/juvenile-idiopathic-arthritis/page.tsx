import {
  ConditionBreadcrumb,
  ConditionContent,
} from "@/components/sections/condition-content";
import { juvenileIdiopathicArthritisCondition } from "@/data/conditions/juvenile-idiopathic-arthritis";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: juvenileIdiopathicArthritisCondition.meta.title,
  description: juvenileIdiopathicArthritisCondition.meta.description,
};

export default function JuvenileIdiopathicArthritisPage() {
  return (
    <>
      <ConditionBreadcrumb
        conditionTitle={juvenileIdiopathicArthritisCondition.title}
      />
      <ConditionContent condition={juvenileIdiopathicArthritisCondition} />
    </>
  );
}

import {
  ConditionBreadcrumb,
  ConditionContent,
} from "@/components/sections/condition-content";
import { connectiveTissueDiseasesCondition } from "@/data/conditions/connective-tissue-diseases";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: connectiveTissueDiseasesCondition.meta.title,
  description: connectiveTissueDiseasesCondition.meta.description,
};

export default function ConnectiveTissueDiseasesPage() {
  return (
    <>
      <ConditionBreadcrumb
        conditionTitle={connectiveTissueDiseasesCondition.title}
      />
      <ConditionContent condition={connectiveTissueDiseasesCondition} />
    </>
  );
}

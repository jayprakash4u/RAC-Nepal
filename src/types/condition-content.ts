export type ConditionTextSegment =
  | { type: "text"; value: string }
  | { type: "strong"; value: string };

export type ConditionPageData = {
  slug: string;
  title: string;
  image: {
    src: string;
    alt: string;
  };
  paragraphs: readonly (readonly ConditionTextSegment[])[];
  meta: {
    title: string;
    description: string;
  };
};

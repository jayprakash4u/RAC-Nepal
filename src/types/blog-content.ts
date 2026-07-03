export type BlogArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: readonly string[] }
  | { type: "callout"; text: string };

export type BlogArticle = {
  author: string;
  sections: readonly BlogArticleBlock[];
};

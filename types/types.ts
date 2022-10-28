import { BlockType } from "notion-block-renderer";
import { ParsedUrlQuery } from "querystring";
import { ReactNode } from "react";

//props
export type LayoutProps = { children: ReactNode };

//サンプル
export type PageProps = {
  slug: string;
  name: string;
  author: string;
  cover: string;
  published: string;
  tags: string[];
  content: string;
};

export type CardProps = { page: PageType };
export type ArticleProps = {
  page: PageType;
  blocks: BlockType[];
};
export type ArticleMetaProps = CardProps;

export type IndexProps = { pages: PageType[] };

export type TagProps = IndexProps & { tag: string };

export type BlockProps = { block: BlockType };

//params
export type Params = ParsedUrlQuery & {
  slug?: string;
  tag?: string;
};

//PageType(notionAPI)
export type AnnotationType = {
  bold: boolean;
  code: boolean;
  color: string;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
};
export type RichTextType = {
  plain_text: string;
  href: string | null;
  annotations: AnnotationType;
};

export type PropertyType = {
  name: { title: RichTextType[] };
  author: { rich_text: RichTextType[] };
  slug: { rich_text: RichTextType[] };
  isPublic: { checkbox: boolean };
  published: { date: { start: string } };
  tags: { multi_select: [{ name: string }] }; //配列の中にタグがある
};

export type FileType = {
  file?: { url: string };
  external?: { url: string };
};
// export type FileType = Record<"file" | "external", { url: string }>;

export type PageType = {
  id: string;
  cover: FileType | null;
  properties: PropertyType;
};

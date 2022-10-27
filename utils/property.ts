import { PageType, RichTextType } from "../types/types";

//汎用関数

//RichTextTypeのplain_textを取得
export const getText = (richTextArr: RichTextType[]) => {
  try {
    const textArr = richTextArr.map((richText) => richText.plain_text);
    return textArr.join("");
  } catch (err) {
    console.log(err);
  }
  return ""; //最終的に文字列を返す
};

//coverのurlを取得
export const getCover = (cover: PageType["cover"]) => {
  if (cover && cover.file) return cover.file.url;
  if (cover && cover.external) return cover.external.url;
  return "/noimage.png";
};

//publishedの日付を取得
export const getDate = (date: { start: string }) => {
  try {
    return date.start;
  } catch (err) {
    console.log(err);
  }
  return "-";
};

//tagsのmulti_selectを取得
export const getMultiSelect = (multiSelect: [{ name: string }]) => {
  try {
    return multiSelect.map((tag) => tag.name);
  } catch (err) {}
  return [];
};

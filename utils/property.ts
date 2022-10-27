import { RichTextType } from "../types/types";

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

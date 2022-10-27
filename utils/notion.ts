import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_KEY as string });
const DATABASE_ID = process.env.NOTION_DATABASE_ID as string;

export const fetchPages = async ({
  slug,
  tag,
}: {
  slug?: string;
  tag?: string;
}) => {
  const and: any = [
    {
      property: "isPublic",
      checkbox: {
        equals: true,
      },
    },
    {
      property: "slug",
      rich_text: {
        is_not_empty: true,
      },
    },
  ];
  //slugが存在すれば、andに追加
  if (slug) {
    and.push({
      property: "slug",
      rich_text: {
        equals: slug,
      },
    });
  }
  //tagがあればandに追加
  if (tag) {
    and.push({
      property: "tags",
      multi_select: {
        contains: tag,
      },
    });
  }

  return await notion.databases.query({
    database_id: DATABASE_ID,
    filter: {
      and: and,
    },
    sorts: [
      {
        property: "published",
        direction: "descending",
      },
    ],
  });
};

// export const fetchBlocksByPageId = async (pageId: string) => {
//   return await notion.blocks.children.list({
//     block_id: pageId,
//   });
// };

//表示するブロックを取得(100件以上)
export const fetchBlocksByPageId = async (pageId: string) => {
  const data = [];
  let cursor = undefined;

  while (true) {
    //1回目
    const { results, next_cursor }: any = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
    });
    //2回目
    data.push(...results); //resultsの中身だけを展開
    if (!next_cursor) break;
    cursor = next_cursor;
  }
  return { results: data };
};

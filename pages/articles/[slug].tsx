import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import NotionBlocks from "notion-block-renderer";
import ArticleMeta from "../../components/ArticleMeta";
import Layout from "../../components/Layout";
import { ArticleProps, Params } from "../../types/types";
import { fetchBlocksByPageId, fetchPages } from "../../utils/notion";
import { getText } from "../../utils/property";

//getStaticPaths
export const getStaticPaths: GetStaticPaths = async () => {
  const { results } = await fetchPages({});
  const paths = results.map((page: any) => {
    return {
      params: {
        slug: getText(page.properties.slug.rich_text),
      },
    };
  });
  return {
    paths: paths,
    fallback: "blocking",
  };
};
//リクエスト毎にレンダリング（再生成）
export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params as Params;
  const { results } = await fetchPages({ slug: slug });
  const page = results[0];
  const pageId = page.id;
  const { results: blocks } = await fetchBlocksByPageId(pageId);
  return {
    props: {
      page: page, //プロパティ
      blocks: blocks, //記事の中身
    },
    revalidate: 10, //ISR
  };
};

const Article: NextPage<ArticleProps> = ({ page, blocks }) => {
  return (
    <Layout>
      <article className="w-full">
        {/* meta section */}
        <div className="my-12">
          <ArticleMeta page={page} />
        </div>

        {/* article */}
        {/* <div className="my-12">
          {blocks.map((block, index) => (
            <Block block={block} key={index} />
          ))}
        </div> */}
        <div className="my-12">
          <NotionBlocks blocks={blocks} isCodeHighlighter={true} />
        </div>
      </article>
    </Layout>
  );
};

export default Article;

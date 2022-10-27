import { GetStaticProps, NextPage } from "next";
import ArticleMeta from "../../components/ArticleMeta";
import Layout from "../../components/Layout";
import { ArticleProps, Params } from "../../types/types";
import { fetchBlocksByPageId, fetchPages } from "../../utils/notion";
import { sampleCards } from "../../utils/sample";

//リクエスト毎にレンダリング（再生成）
export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params as Params;
  console.log(slug);
  const { results } = await fetchPages({ slug: slug });
  console.log(results);
  const page = results[0];
  const pageId = page.id;
  const { results: blocks } = await fetchBlocksByPageId(pageId);
  return {
    props: {
      // slug: slug,
      page: page, //プロパティ
      blocks: blocks, //記事の中身
    },
    revalidate: 10, //ISR
  };
};

const Article: NextPage<ArticleProps> = ({ page }) => {
  return (
    <Layout>
      <article className="w-full">
        {/* meta section */}
        <div className="my-12">
          <ArticleMeta page={page} />
        </div>

        {/* article */}
        <div className="my-12">article {page}</div>
      </article>
    </Layout>
  );
};

export default Article;

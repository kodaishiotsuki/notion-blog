import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Card from "../../components/Card";
import Layout from "../../components/Layout";
import { siteConfig } from "../../site.config";
import { Params, TagProps } from "../../types/types";
import { fetchPages } from "../../utils/notion";
import { getMultiSelect } from "../../utils/property";

//getStaticPaths
export const getStaticPaths: GetStaticPaths = async () => {
  const { results }: { results: Record<string, any>[] } = await fetchPages({});
  //resultsからtagを取得
  const pathSet: Set<string> = new Set(); //重複防止
  for (const page of results) {
    for (const tag of getMultiSelect(page.properties.tags.multi_select)) {
      pathSet.add(tag);
    }
  }
  //配列に戻してmapでtag取得
  const paths = Array.from(pathSet).map((tag) => {
    return {
      params: {
        tag: tag,
      },
    };
  });
  return {
    paths: paths,
    fallback: "blocking",
  };
};

//SSG+ISR
export const getStaticProps: GetStaticProps = async (ctx) => {
  const { tag } = ctx.params as Params;
  const { results } = await fetchPages({ tag: tag }); //fetchPagesをreturnで返してる
  return {
    props: {
      pages: results ? results : [],
      tag: tag,
    },
    revalidate: 10, //ISR
  };
};

const Tag: NextPage<TagProps> = ({ pages, tag }) => {
  return (
    <Layout>
      <div className="pt-12">
        <h1 className="text-5xl mb-8">{`#${tag}`}</h1>
        <div className="grid md:gap-6 mt-10 md:grid-cols-2 w-full my-12">
          {/* Card */}
          {pages.map((page, index) => (
            <Card key={index} page={page} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Tag;

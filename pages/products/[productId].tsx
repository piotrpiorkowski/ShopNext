import { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import Link from "next/link";

import { serialize } from "next-mdx-remote/serialize";
import { apolloClient } from "../../graphql/apolloClient";
import {
  GetProductDetailsBySlugDocument,
  GetProductDetailsBySlugQuery,
  GetProductsSlugsDocument,
  GetProductsSlugsQuery,
} from "../../generated/graphql";
import ProductDetails from "../../components/Products";

const ProductIdPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!data) {
    return <div>Not found...</div>;
  }

  return (
    <div>
      <Link href={"/products"}>
        <a>Go back</a>
      </Link>
      <ProductDetails
        data={{
          id: data.slug,
          title: data.name,
          thumbnailAlt: data.name,
          thumbnailUrl: data.images[0].url,
          description: "",
          longDescription: data.description,
          rating: 5,
        }}
      />
    </div>
  );
};

export default ProductIdPage;

//SSG
export const getStaticPaths = async () => {
  const { data } = await apolloClient.query<GetProductsSlugsQuery>({
    query: GetProductsSlugsDocument,
  });

  return {
    paths: data.products.map((product) => {
      return { params: { productId: product.slug } };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ productId: string }>) => {
  if (!params?.productId) {
    return { props: {}, notFound: true };
  }

  const { data } = await apolloClient.query<GetProductDetailsBySlugQuery>({
    variables: { slug: params.productId },
    query: GetProductDetailsBySlugDocument,
  });

  if (!data || !data.products[0]) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {
      data: {
        ...data.products[0],
        description: await serialize(data.products[0].description),
      },
    },
  };
};

export type InferGetStaticPathsType<T> = T extends () => Promise<{
  paths: Array<{ params: infer R }>;
}>
  ? R
  : never;

import { GetStaticPropsContext, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import ProductDetails from "../../components/Products";
import { serialize } from "next-mdx-remote/serialize";

const ProductIdPage = ({
  data,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  if (!data) {
    return <div>Coś poszło nie tak...</div>;
  }
  return (
    <div>
      <Link href="/products">
        <a>Wróć na stronę główną</a>
      </Link>
      <ProductDetails
        data={{
          id: data.id,
          title: data.title,
          thumbnailUrl: data.image,
          thumbnailAlt: data.title,
          description: data.description,
          rating: data.rating.rate,
          longDescription: data.longDescription,
        }}
      />
    </div>
  );
};

export default ProductIdPage;

export const getStaticPaths = async () => {
  const res = await fetch(`https://naszsklep-api.vercel.app/api/products`);
  const data: StoreApiResponse[] = await res.json();
  return {
    paths: data.map((product) => {
      return {
        params: {
          productId: product.id.toString(),
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ productId: string }>) => {
  if (!params?.productId) {
    return {
      props: {},
      notFound: true,
    };
  }
  const res = await fetch(
    `https://naszsklep-api.vercel.app/api/products/${params.productId}`
  );
  const data: StoreApiResponse | null = await res.json();

  if (!data) {
    return {
      props: {},
      notFound: true,
    };
  }

  // ustawienia dla markdowna (opcjonalne w inych projektCH) bez tego powinno byc w return props: { data,  },
  return {
    props: {
      data: {
        ...data,
        longDescription: await serialize(data.longDescription),
      },
    },
  };
};

export interface StoreApiResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  longDescription: string;
}

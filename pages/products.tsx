import { InferGetServerSidePropsType } from "next";
import { ProductListItem } from "../components/Products";

const ProductsPage = ({
  data,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {data.map((product) => {
        return (
          <li key={product.id} className="shadow-xl border-2">
            <ProductListItem
              data={{
                id: product.id,
                title: product.title,
                thumbnailUrl: product.image,
                thumbnailAlt: product.title,
              }}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ProductsPage;

export const getStaticProps = async () => {
  const res = await fetch(`https://naszsklep-api.vercel.app/api/products`);
  const data: StoreApiResponse[] = await res.json();

  return {
    props: {
      data,
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
}

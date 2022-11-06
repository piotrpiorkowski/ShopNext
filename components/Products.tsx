import { NextSeo } from "next-seo";
import Image from "next/image";
import Link from "next/link";
import { MarkdownResult } from "../utils";
import { useCartState } from "./Cart/CartContex";
import Rating from "./Rating";
import ZaisteReactMarkdown from "./ZaisteReactMarkdown";

interface ProductDetails {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
  rating: number;
  longDescription: MarkdownResult;
}

interface ProductProps {
  data: ProductDetails;
}

const ProductDetails = ({ data }: ProductProps) => {
  return (
    <>
      <div className="bg-white p-4">
        <NextSeo
          title={data.title}
          description={data.description}
          canonical={`https://naszsklep.vercel.app/products/${data.id}`}
          openGraph={{
            url: `https://naszsklep.vercel.app/products/${data.id}`,
            title: data.title,
            description: data.description,
            images: [
              {
                url: data.thumbnailUrl,
                alt: data.thumbnailAlt,
                type: "image/jpeg",
              },
            ],
            siteName: "Nasz Sklep",
          }}
        />
        <Image
          src={data.thumbnailUrl}
          alt={data.thumbnailAlt}
          layout="responsive"
          width={16}
          height={9}
          objectFit="contain"
        />
      </div>
      <h2 className="p-4 text-3xl font-bold">{data.title}</h2>
      <p className="p-4">{data.description}</p>
      <article className="p-4 prose lg:prose-xl">
        <ZaisteReactMarkdown>{data.longDescription}</ZaisteReactMarkdown>
      </article>
      <Rating rating={data.rating} />
    </>
  );
};

export default ProductDetails;

type ProductListItem = Pick<
  ProductDetails,
  "id" | "title" | "thumbnailUrl" | "thumbnailAlt"
>;

interface ProductListItemProps {
  data: ProductListItem;
}
export const ProductListItem = ({ data }: ProductListItemProps) => {
  const cartState = useCartState();
  return (
    <>
      <div className="bg-white">
        <Image
          src={data.thumbnailUrl}
          alt={data.thumbnailAlt}
          layout="responsive"
          width={16}
          height={9}
          objectFit="contain"
        />
      </div>
      <div className="p-4">
        <Link href={`/products/${data.id}`}>
          <a>
            <h2 className="pb-4 text-3xl font-bold">{data.title}</h2>
          </a>
        </Link>
        <button
          onClick={() =>
            cartState.addItemToCart({
              id: data.id,
              price: 21.37,
              title: data.title,
              count: 1,
            })
          }
          className="text-white bg-blue-500 rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Dodaj do koszyka
        </button>
      </div>
    </>
  );
};

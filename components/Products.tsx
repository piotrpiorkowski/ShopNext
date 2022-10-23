import { NextSeo } from "next-seo";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Rating from "./Rating";

interface ProductDetails {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
  rating: number;
  longDescription: string;
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
      <article className="prose lg:prose-xl">
        <ReactMarkdown className="p-4">{data.longDescription}</ReactMarkdown>
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
      <Link href={`/products/${data.id}`}>
        <a>
          <h2 className="p-4 text-3xl font-bold">{data.title}</h2>
        </a>
      </Link>
    </>
  );
};

import {
  ReviewContentFragment,
  useGetReviewsForProductSlugQuery,
} from "../../generated/graphql";
import { ProductReviewItem } from "./ProductReviewListItem";

interface ProductReviewListProps {
  productSlug: string;
}

export const ProductReviewList = ({ productSlug }: ProductReviewListProps) => {
  const { data, loading, error } = useGetReviewsForProductSlugQuery({
    variables: {
      slug: productSlug,
    },
  });

  if (!data?.product) {
    return null;
  }

  return (
    <ul>
      {data.product.reviews.map((review, i) => (
        <ProductReviewItem key={review.id} review={review} index={i} />
      ))}
    </ul>
  );
};

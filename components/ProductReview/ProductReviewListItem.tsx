import { ReviewContentFragment } from "../../generated/graphql";

interface ProductReviewItemProps {
  review: ReviewContentFragment;
  index: number;
}

export const ProductReviewItem = ({
  review,
  index,
}: ProductReviewItemProps) => {
  return (
    <li className="border mt-4 bg-white p-2 max-w-md mx-auto shadow-md rounded-md">
      <h3 className="font-bold">
        {index}
        {review.headline}
      </h3>
      {review.rating && (
        <div className="text-sm">
          Ocena:{" "}
          <span className="underline underline-offset-1">{review.rating}</span>{" "}
          / 5
        </div>
      )}

      <p className="my-2 italic">{review.content}</p>
      <footer className="pl-4">{review.name}</footer>
    </li>
  );
};

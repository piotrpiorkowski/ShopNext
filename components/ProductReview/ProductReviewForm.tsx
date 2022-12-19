import { resultKeyNameFromField } from "@apollo/client/utilities";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
  GetProductsSlugsDocument,
  GetReviewsForProductSlugDocument,
  GetReviewsForProductSlugQuery,
  useCreateProductReviewMutation,
} from "../../generated/graphql";

export const reviewFormSchema = yup
  .object({
    content: yup.string().required(),
    headline: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    rating: yup.number().min(1).max(5).required(),
  })
  .required();

type ReviewFormSchema = yup.InferType<typeof reviewFormSchema>;

interface ProductReviewFormProps {
  productSlug: string;
}

export const ProductReviewForm = ({ productSlug }: ProductReviewFormProps) => {
  const { register, handleSubmit } = useForm<ReviewFormSchema>({
    resolver: yupResolver(reviewFormSchema),
  });

  const [createReview, { data, loading, error }] =
    useCreateProductReviewMutation({
      // refetchQueries: [
      //   {
      //     query: GetReviewsForProductSlugDocument,
      //     variables: { slug: productSlug },
      //   },
      // ],
      update(cache, result) {
        const originalReviewsQuery =
          cache.readQuery<GetReviewsForProductSlugQuery>({
            query: GetReviewsForProductSlugDocument,
            variables: { slug: productSlug },
          });

        if (!originalReviewsQuery?.product?.reviews || !result.data?.review) {
          //...
          return;
        }

        const newReviewsQuery = {
          ...originalReviewsQuery,
          product: {
            ...originalReviewsQuery.product,
            reviews: [
              ...originalReviewsQuery.product.reviews,
              result.data.review,
            ],
          },
        };

        cache.writeQuery({
          query: GetReviewsForProductSlugDocument,
          variables: { slug: productSlug },
          data: newReviewsQuery,
        });
      },
    });

  const onSubmit = handleSubmit((data) => {
    createReview({
      variables: {
        review: {
          ...data,
          product: {
            connect: {
              slug: productSlug,
            },
          },
        },
      },
      optimisticResponse: {
        __typename: "Mutation",
        review: {
          __typename: "Review",
          id: (-Math.random()).toString(),
          ...data,
        },
      },
    });
  });
  return (
    <form
      className="flex flex-col max-w-md mx-auto gap-y-4 mb-8 "
      onSubmit={onSubmit}
    >
      <label>
        content
        <input
          required
          type="text"
          className="w-full apperance-none px-5 py-5 border border-transparent text-base"
          {...register("content", { required: "Podaj content" })}
        />
      </label>
      <label>
        headline
        <input
          required
          type="text"
          className="w-full apperance-none px-5 py-5 border border-transparent text-base"
          {...register("headline", { required: "Podaj headline" })}
        />
      </label>
      <label>
        name
        <input
          required
          type="text"
          className="w-full apperance-none px-5 py-5 border border-transparent text-base"
          {...register("name", { required: "Podaj name" })}
        />
      </label>
      <label>
        email
        <input
          required
          type="email"
          className="w-full apperance-none px-5 py-5 border border-transparent text-base"
          {...register("email", { required: "Podaj email" })}
        />
      </label>
      <label>
        rating
        <input
          required
          type="number"
          className="w-full apperance-none px-5 py-5 border border-transparent text-base"
          {...register("rating", { required: "Podaj rating" })}
        />
      </label>
      <div className="mt-3 rounded-md shadow sm:mt-0  sm:flex-shrink-0">
        <button className="w-full flex items-center justify-center px-5 py-3 border border-transparent bg-sky-700">
          Dodaj komentarz
        </button>
      </div>
    </form>
  );
};

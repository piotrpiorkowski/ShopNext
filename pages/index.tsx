import Main from "../components/Main";
import NewsletterForm from "../components/NewsletterForm";
import {
  CreateProductReviewDocument,
  useCreateProductReviewMutation,
} from "../generated/graphql";

const Home = () => {
  const [createReview, { data, loading, error }] =
    useCreateProductReviewMutation();

  const addReview = () =>
    createReview({
      mutation: CreateProductReviewDocument,
      variables: {
        review: {
          headline: "KLIENT!!!",
          name: "Michał",
          email: "siema@example.com",
          content: "Bardzo dobry produkt",
          rating: 5,
        },
      },
    });

  return (
    <Main>
      {/* <button onClick={addReview} type="button">
        Dodaj komentarz
      </button> */}
      <NewsletterForm />
      {loading && <div className="animate-bounce text-3xl">Ładowanko...</div>}
      {error && <pre>{JSON.stringify(data, null, 2)}</pre>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </Main>
  );
};

export default Home;

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as yup from "yup";

const useAddToNewsletterMutation = () =>
  useMutation("add-to-newsletter", async ({ email }: { email: string }) => {
    fetch("http://localhost:3000/api/hello", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
  });

export const schema = yup.object({
  email: yup.string().email().required(),
});

type NewsletterFormData = yup.InferType<typeof schema>;

const NewsletterForm = () => {
  const { register, handleSubmit } = useForm<NewsletterFormData>({
    resolver: yupResolver(schema),
  });
  const { mutate } = useAddToNewsletterMutation();

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });
  return (
    <form className="flex flex-col" onSubmit={onSubmit}>
      <input
        aria-label="Email address"
        type="email"
        required
        {...register("email", { required: "Podaj email" })}
        className="w-full apperance-none px-5 py-5 border border-transparent text-base"
        placeholder="Enter your email"
      />
      <div className="mt-3 rounded-md shadow sm:mt-0  sm:flex-shrink-0">
        <button className="w-full flex items-center justify-center px-5 py-3 border border-transparent bg-sky-700">
          Try it & subscribe
        </button>
      </div>
    </form>
  );
};

export default NewsletterForm;

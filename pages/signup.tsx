import { yupResolver } from "@hookform/resolvers/yup";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm, useFormState } from "react-hook-form";
import * as yup from "yup";

const signUpFormSchema = yup.object({
  email: yup.string().email().required("Adres e-maill nie jest poprawny"),
  password: yup.string().required(),
});

type SignUpFormData = yup.InferType<typeof signUpFormSchema>;

const SignupPage = () => {
  const session = useSession();
  const router = useRouter();

  const { register, setValue, handleSubmit, formState } =
    useForm<SignUpFormData>({
      resolver: yupResolver(signUpFormSchema),
    });

  const onSubmit = handleSubmit(async (data) => {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  });

  if (session.status === "authenticated") {
    router.push("/");
    return null;
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto max-w-md pt-16 pb-36 px-4 sm:px-6 lg:pb-16 lg:px-0 lg:row-start-1 lg:col-start-1"
    >
      <div className="max-w-lg mx-auto lg:max-w-none">
        <section aria-labelledby="contact-info-heading">
          <h2
            id="contact-info-heading"
            className="text-lg font-medium text-gray-900"
          >
            Rejestracaja
          </h2>

          <div className="mt-6">
            <label
              htmlFor="email-address"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="mt-1">
              <input
                type="email"
                id="email"
                autoComplete="email"
                className="block w-full border-gray-300 rounded-md shadow-sm "
                {...register("email", { required: true })}
              />
              <span role="alert" className="text-red-500 text-sm font-bold">
                {formState.errors.email?.message}
              </span>
            </div>
          </div>
          <div className="mt-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Hasło
            </label>
            <div className="mt-1">
              <input
                type="password"
                id="password"
                autoComplete="password"
                className="block w-full border-gray-300 rounded-md shadow-sm "
                {...register("password", { required: true })}
              />
              <span role="alert" className="text-red-500 text-sm font-bold">
                {formState.errors.email?.message}
              </span>
            </div>
          </div>
        </section>
        <button
          type="submit"
          className="block w-full rounded-lg bg-black text-white mt-5 p-2.5 text-sm "
        >
          Zarejestruj się
        </button>
      </div>
    </form>
  );
};

export default SignupPage;

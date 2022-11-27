import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { validateMMYY, validatePostalCode } from "../utils";
import { FormInput, FormInputSelect } from "./FormInput";
export const schema = yup.object({
  firstName: yup
    .string()
    .min(3, "Imię jest za krótkie")
    .max(20, "Nazwisko jest za długie")
    .required(),
  lastName: yup
    .string()
    .min(3, "Nazwisko jest za krótkie")
    .max(20, "Nazwisko jest za długie")
    .required(),
  email: yup.string().email().required("Adres e-maill nie jest poprawny"),
  phone: yup
    .string()
    .length(9, "Polski numer telefonu ma 9 cyfr")
    .matches(/^[0-9]+$/, "Numer składa się tylko z cyfr")
    .required(),
  cardNumber: yup
    .string()
    .length(16, "Podaj 16 cyfr")
    .required("Numer konta jest obowiązkowy"),
  cardExpirationDate: yup
    .string()
    .test("test MMYY", "Sprawdź format miesiąc/rok", validateMMYY)
    .required(),
  cardCvc: yup
    .string()
    .min(3, "Numer wymagany")
    .max(4, "Numer wymagany")
    .matches(/^[0-9]+$/, "Numer składa się tylko z cyfr")
    .required(),
  country: yup.string().required(),
  postalCode: yup
    .string()
    .test("test postalCode", "Sprawdź kod pocztowy", validatePostalCode)
    .matches(/\d{2}-\d{3}/, "Zły kod pocztowy")
    .required(),
});

export type CheckoutFormData = yup.InferType<typeof schema>;

const CheckoutForm = () => {
  const methods = useForm<CheckoutFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: CheckoutFormData) => console.log(data);

  return (
    <section>
      <h1 className="sr-only">Checkout</h1>

      <div className="relative mx-auto max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className=" py-12 md:py-24">
            <div className="mx-auto max-w-lg px-4 lg:px-8">
              <div className="flex items-center">
                <span className="h-10 w-10 rounded-full bg-black"></span>

                <h2 className="ml-4 font-medium">MDJ-shop</h2>
              </div>

              <div className="mt-8">
                <p className="text-2xl font-medium tracking-tight">$99.99</p>
                <p className="mt-1 text-sm text-gray-500">
                  For the purchase of
                </p>
              </div>

              <div className="mt-12">
                <div className="flow-root">
                  <ul className="-my-4 divide-y divide-gray-200">
                    <li className="flex items-center justify-between py-4">
                      <div className="flex items-start">
                        {/* <img
                        alt="Trainer"
                        src="https://images.unsplash.com/photo-1565299999261-28ba859019bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                        className="h-16 w-16 flex-shrink-0 rounded-lg object-cover"
                      /> */}

                        <div className="ml-4">
                          <p className="text-sm">Vibrant Trainers</p>

                          <dl className="mt-1 space-y-1 text-xs text-gray-500">
                            <div>
                              <dt className="inline">Color:</dt>
                              <dd className="inline">Blue</dd>
                            </div>

                            <div>
                              <dt className="inline">Size:</dt>
                              <dd className="inline">UK 10</dd>
                            </div>
                          </dl>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm">
                          $49.99
                          <small className="text-gray-500">x1</small>
                        </p>
                      </div>
                    </li>

                    <li className="flex items-center justify-between py-4">
                      <div className="flex items-start">
                        {/* <img
                        alt="Lettuce"
                        src="https://images.unsplash.com/photo-1640958904159-51ae08bd3412?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80"
                        className="h-16 w-16 flex-shrink-0 rounded-lg object-cover"
                      /> */}

                        <div className="ml-4">
                          <p className="text-sm">Lettuce</p>

                          <dl className="mt-1 space-y-1 text-xs text-gray-500">
                            <div>
                              <dt className="inline">Size:</dt>
                              <dd className="inline">Big</dd>
                            </div>
                          </dl>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm">
                          $25
                          <small className="text-gray-500">x2</small>
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className=" py-12 md:py-24">
            <div className="mx-auto max-w-lg px-4 lg:px-8">
              <FormProvider {...methods}>
                <form
                  onSubmit={methods.handleSubmit(onSubmit)}
                  className="grid grid-cols-6 gap-4"
                >
                  <div className="col-span-3 h-24">
                    <FormInput name="firstName" label="First Name" />
                  </div>
                  <div className="col-span-3 h-24">
                    <FormInput name="lastName" label="Last Name" />
                  </div>
                  <div className="col-span-6 h-24">
                    <FormInput name="email" label="Email" />
                  </div>
                  <div className="col-span-6 h-24">
                    <FormInput name="phone" label="Phone" />
                  </div>
                  <fieldset className="col-span-6">
                    <legend className="mb-1 block text-sm text-gray-600 text-center">
                      Card Details
                    </legend>

                    <div className="-space-y-px rounded-lg shadow-sm">
                      <div>
                        <FormInput name="cardNumber" label="Card Number" />
                      </div>

                      <div className="flex -space-x-px">
                        <div className="flex-1 h-24">
                          <FormInput
                            name="cardExpirationDate"
                            label="Expiration Date"
                          />
                        </div>

                        <div className="flex-1 h-24">
                          <FormInput name="cardCvc" label="CVC" />
                        </div>
                      </div>
                    </div>
                  </fieldset>

                  <fieldset className="col-span-6">
                    <legend className="mb-1 block text-sm text-gray-600 text-center">
                      Billing Address
                    </legend>

                    <div className="-space-y-px rounded-lg shadow-sm">
                      <div>
                        <FormInputSelect name="country" label="Country" />
                      </div>

                      <div className="h-24">
                        <FormInput name="postalCode" label="ZIP/Post Code" />
                      </div>
                    </div>
                  </fieldset>

                  <div className="col-span-6">
                    <button
                      className="block w-full rounded-lg bg-white p-2.5 text-sm "
                      type="submit"
                    >
                      Pay Now
                    </button>
                  </div>
                </form>
              </FormProvider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutForm;

import { loadStripe } from "@stripe/stripe-js";
import { useCartState } from "../components/Cart/CartContex";
import Stripe from "stripe";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const CartContent = () => {
  const cartState = useCartState();

  const pay = async () => {
    const stripe = await stripePromise;

    if (!stripe) {
      throw new Error(`Something went wrong`);
    }

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        cartState.items?.map((cartItem) => {
          return {
            slug: cartItem.id,
            count: cartItem.count,
          };
        })
      ),
    });

    const { session }: { session: Stripe.Response<Stripe.Checkout.Session> } =
      await res.json();

    await stripe.redirectToCheckout({ sessionId: session.id });
  };

  return (
    <div className="col-span-2">
      <ul className="divide-y divide-gray-200">
        {cartState.items?.map((item, index) => (
          <li key={`${item.id}_${index}`} className="flex justify-between py-2">
            <div>
              {item.count} x {item.title}
            </div>
            <div>
              {item.price}
              <button
                className="ml-4 text-red-500"
                onClick={() => cartState.removeItemFromCart(item.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={pay}
        className=" w-full bg-indigo-600 border border-transparent h-12 rounded-lg text-white"
      >
        Złóż zamówienie
      </button>
    </div>
  );
};

const CartSummary = () => {
  const cartState = useCartState();

  return (
    <div>
      Podsumowanie koszyka
      <div className="font-bold">
        Liczba elementów: {cartState.items?.length}
      </div>
    </div>
  );
};

const CartPage = () => {
  return (
    <div className="mx-auto max-w-5xl p-4">
      <div className="grid grid-cols-3 gap-8">
        <CartContent />
        <CartSummary />
      </div>
    </div>
  );
};

export default CartPage;

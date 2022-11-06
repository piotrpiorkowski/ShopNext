import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  CartItem,
  getCartItemsFromStorage,
  setCartItemsInStorage,
} from "./CartStorage";

interface CartState {
  items: CartItem[] | undefined;
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (id: CartItem["id"]) => void;
}

export const CartStateContext = createContext<CartState | null>(null);

export const CartStateContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [cartItems, setCartItems] = useState<CartItem[] | undefined>(undefined);

  useEffect(() => {
    setCartItems(getCartItemsFromStorage());
  }, []);

  useEffect(() => {
    if (cartItems === undefined) {
      return;
    }

    setCartItemsInStorage(cartItems);
  }, [cartItems]);

  return (
    <CartStateContext.Provider
      value={{
        items: cartItems,
        addItemToCart: (item) => {
          setCartItems((prevState) => {
            if (!prevState) {
              return;
            }

            const existingItem = prevState.find(
              (existingItem) => existingItem.id === item.id
            );
            if (!existingItem) {
              return [...prevState, item];
            }

            return prevState.map((existingItem) => {
              if (existingItem.id === item.id) {
                return {
                  ...existingItem,
                  count: existingItem.count + 1,
                };
              }

              return existingItem;
            });
          });
        },
        removeItemFromCart: (id) => {
          setCartItems((prevState) => {
            if (!prevState) {
              return;
            }

            const existingItem = prevState.find((element) => element.id === id);
            if (existingItem && existingItem.count <= 1) {
              return prevState.filter((existingItem) => existingItem.id !== id);
            }

            return prevState.map((existingItem) => {
              if (existingItem.id === id) {
                return {
                  ...existingItem,
                  count: existingItem.count - 1,
                };
              }

              return existingItem;
            });
          });
        },
      }}
    >
      {children}
    </CartStateContext.Provider>
  );
};

export const useCartState = () => {
  const cartState = useContext(CartStateContext);
  if (!cartState) {
    throw new Error("You forgot CartStateContextProvider");
  }

  return cartState;
};

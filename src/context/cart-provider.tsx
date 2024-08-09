"use client";

import {
  createContext,
  useMemo,
  useReducer,
  ReactElement,
  useEffect,
} from "react";

export type CartItemType = {
  id: number;
  name: string;
  qty: number;
  price: string;
  images: string[];
  amount: number;
  discount: boolean;
  discount_price: string;
};

type CartStateType = { cart: CartItemType[] };

// const initCartState: CartStateType = { cart: [] };
const initCartState: CartStateType = {
  cart:
    typeof window !== "undefined" && localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart") as string)
      : [],
};

const REDUCER_ACTION_TYPE = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  EXTRACT: "EXTRACT",
  SUBMIT: "SUBMIT",
  QUANTITY: "QUANTITY",
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction = {
  type: string;
  payload?: CartItemType;
};

const reducer = (
  state: CartStateType,
  action: ReducerAction
): CartStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD: {
      if (!action.payload) {
        throw new Error("action.payload missing in ADD action");
      }

      const { id, name, price, images, discount_price, discount, amount } =
        action.payload;

      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.id !== id
      );

      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.id === id
      );

      const qty: number = itemExists ? itemExists.qty + 1 : 1;

      return {
        ...state,
        cart: [
          ...filteredCart,
          { id, name, price, qty, images, discount_price, discount, amount },
        ],
      };
    }
    case REDUCER_ACTION_TYPE.REMOVE: {
      if (!action.payload) {
        throw new Error("action.payload missing in REMOVE action");
      }

      const { id } = action.payload;

      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.id !== id
      );

      return { ...state, cart: [...filteredCart] };
    }

    case REDUCER_ACTION_TYPE.SUBMIT: {
      return { ...state, cart: [] };
    }
    case REDUCER_ACTION_TYPE.EXTRACT: {
      if (!action.payload) {
        throw new Error("action.payload missing in QUANTITY action");
      }

      const { id, name, price, images, discount_price, discount, amount } =
        action.payload;

      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.id === id
      );

      if (!itemExists) {
        throw new Error("Item must exist in order to update quantity");
      }

      const updatedQty: number = itemExists ? itemExists.qty - 1 : 0;

      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.id !== id
      );

      return {
        ...state,
        cart: [
          ...filteredCart,
          {
            id,
            name,
            price,
            qty: updatedQty,
            images,
            discount_price,
            discount,
            amount,
          },
        ],
      };
    }
    case REDUCER_ACTION_TYPE.QUANTITY: {
      if (!action.payload) {
        throw new Error("action.payload missing in QUANTITY action");
      }

      const { id, qty } = action.payload;

      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.id === id
      );

      if (!itemExists) {
        throw new Error("Item must exist in order to update quantity");
      }

      const updatedItem: CartItemType = { ...itemExists, qty };

      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.id !== id
      );

      return { ...state, cart: [...filteredCart, updatedItem] };
    }
    default:
      throw new Error("Unidentified reducer action type");
  }
};

const useCartContext = (initCartState: CartStateType) => {
  const [state, dispatch] = useReducer(reducer, initCartState);

  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  //Setting cart to the local storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  const totalItems = state.cart.reduce((previousValue, cartItem) => {
    return previousValue + cartItem.qty;
  }, 0);

  const subTotalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(
    state.cart.reduce((previousValue, cartItem) => {
      return previousValue + cartItem.qty * +cartItem.price;
    }, 0)
  );

  const totalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(
    state.cart.reduce((previousValue, cartItem) => {
      const price = cartItem.discount
        ? +cartItem.discount_price
        : +cartItem.price;
      return previousValue + cartItem.qty * price;
    }, 0)
  );

  const discountTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(
    state.cart.reduce((previousValue, cartItem) => {
      if (cartItem.discount) {
        return (
          previousValue +
          cartItem.qty * +cartItem.price -
          +cartItem.discount_price
        );
      }
      return previousValue;
    }, 0)
  );

  const cart = useMemo(() => {
    return [...state.cart].sort((a, b) => a.id - b.id);
  }, [state.cart]);

  return {
    dispatch,
    REDUCER_ACTIONS,
    totalItems,
    subTotalPrice,
    discountTotal,
    totalPrice,
    cart,
  };
};

export type UseCartContextType = ReturnType<typeof useCartContext>;

const initCartContextState: UseCartContextType = {
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  subTotalPrice: "",
  totalItems: 0,
  totalPrice: "",
  cart: [],
  discountTotal: "",
};

const CartContext = createContext<UseCartContextType>(initCartContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <CartContext.Provider value={useCartContext(initCartState)}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

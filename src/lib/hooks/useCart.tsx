"use client";

import CartContext, { UseCartContextType } from "@/context/cart-provider";
import { useContext } from "react";

const UseCart = (): UseCartContextType => {
  return useContext(CartContext);
};

export default UseCart;

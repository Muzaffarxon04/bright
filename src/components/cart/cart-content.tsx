"use client";

import React from "react";
import ProductsList from "./products-list";
import Total from "./total";
import UseCart from "@/lib/hooks/useCart";
import EmptyCart from "./empty-cart";
import { Locale } from "../../../i18n.config";

type CartContentProps = {
  locale: Locale
}

const CartContent = ({locale}: CartContentProps) => {
  const { totalItems } = UseCart();

  if (totalItems === 0) return <EmptyCart />;

  return (
    <div className="flex justify-between md:flex-row flex-col gap-[20px] md:gap-[48px] mb-[40px] md:mb-[153px] mt-[40px] md:mt-[80px]">
      <ProductsList locale={locale} />
      <Total locale={locale} />
    </div>
  );
};

export default CartContent;

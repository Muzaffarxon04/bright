"use client";

import { cn } from "@/lib/utils/cn";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";

import UseCart from "@/lib/hooks/useCart";
import { ProductType } from "@/lib/types/api-types";
import { Minus, Plus } from "../svg/svg-list";
import { localeInStock } from "@/lib/utils/commonFunctions";
import { Locale } from "../../../i18n.config";

type AddBtnProps = {
  type?: "button";
  locale: Locale;
  product: ProductType;
  children: React.ReactNode;
  styleType?: "card" | "productInner";
  className?: string;
};

const AddBtn = ({
  type = "button",
  locale,
  product,
  children,
  className,
  styleType,
}: AddBtnProps) => {
  const t = useTranslations("ProductCard");
  const { dispatch, REDUCER_ACTIONS, cart } = UseCart();
  const count = cart.find((item) => item.id === product.id)?.qty;

  const onAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch({
      type: REDUCER_ACTIONS.ADD,
      payload: { ...product, qty: 1 },
    });
  };

  const onExtractFromCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch({
      type: REDUCER_ACTIONS.EXTRACT,
      payload: { ...product, qty: 1 },
    });
  };

  const stopProp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <button
      onClick={(e) => (!count ? onAddToCart(e) : stopProp(e))}
      type={type}
      className={cn(
        "bg-white text-textColor border border-solid border-[#E6E9EA] min-h-[36px] min-w-[109px] rounded-[10px] text-[12px] leading-[18px] font-semibold hover:border-accentColor transition-colors",
        className,
        {
          "px-[10px] flex items-center justify-between text-[14px] leading-[130%] font-medium font-inter border-accentColor":
            count,
          "min-w-[155px] rounded-[4px] min-h-[48px] text-[18px]":
            styleType === "productInner",
        }
      )}
    >
      {count ? (
        <button
          className="text-[#22282B] disabled:text-neutral-400"
          onClick={(e) => onExtractFromCart(e)}
          type="button"
        >
          {" "}
          <Minus />
        </button>
      ) : (
        ""
      )}
      {count ? count : children ? children : t("AddToCart")}
      {count ? (
        <button
          className="text-[#22282B] disabled:text-neutral-400 relative transition-all group"
          disabled={count >= product.amount}
          onClick={(e) => onAddToCart(e)}
          type="button"
        >
          {" "}
          <Plus />
          {count >= product.amount && (
            <span
              className={cn("", {
                "absolute -right-[14px] bottom-full text-nowrap mb-2 mx-auto p-1 text-xs text-white bg-gray-800 rounded-md shadow-lg transition-all group-hover:inline hidden w-[120px]":
                  count >= product.amount,
              })}
            >
              {localeInStock(product.amount, locale)}
            </span>
          )}
        </button>
      ) : (
        ""
      )}
    </button>
  );
};

export default AddBtn;

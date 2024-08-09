"use client";

import { CartItemType } from "@/context/cart-provider";
import UseCart from "@/lib/hooks/useCart";

import { cn } from "@/lib/utils/cn";
import { formatCurrency, localeInStock } from "@/lib/utils/commonFunctions";
import Image from "next/image";
import MyTitle from "../my-title/my-title";
import { useTranslations } from "next-intl";
import { API_URL } from "@/consts/API_URL";
import { Minus, Plus } from "../svg/svg-list";
import { Locale } from "../../../i18n.config";

type ProductsListProps = {
  locale: Locale;
};

const ProductsList = ({ locale }: ProductsListProps) => {
  const t = useTranslations("Cart");
  const { dispatch, REDUCER_ACTIONS, cart } = UseCart();

  const onAddToCart = (product: CartItemType) => {
    dispatch({
      type: REDUCER_ACTIONS.ADD,
      payload: { ...product, qty: 1 },
    });
  };

  const onExtractFromCart = (product: CartItemType) => {
    dispatch({
      type: REDUCER_ACTIONS.EXTRACT,
      payload: { ...product, qty: 1 },
    });

    if (product.qty === 1) {
      //If qty of product equals to 0 product will be
      //removed from cart. In this case the condition
      //must be like this because if set product.qty === 0, the 0 itself will be displayed on the ui, which should not happen
      onRemoveFromCart(product);
    }
  };

  const onRemoveFromCart = (product: CartItemType) => {
    dispatch({
      type: REDUCER_ACTIONS.REMOVE,
      payload: { ...product, id: product.id },
    });
  };

  return (
    <div className="bg-white rounded-[10px] p-0 md:p-[24px] w-full md:max-w-[556px] ">
      <MyTitle className="text-[24px] md:text-[24px] leading-[24px] md:leading-[24px] mb-[20px] md:mb-[40px] text-left">
        {t("ShoppingCart")}
      </MyTitle>
      <ul className="flex flex-col ">
        {cart.map((product, index) => (
          <li
            className={cn(
              "pb-[50px] md:pb-[40px] px-[10px] pt-[16px] border-b border-solid border-[#A3A3A3] flex items-center gap-[10px] justify-between",
              null,
              {
                "pb-0 md:pb-0 border-none":
                  cart.length === 1 || index === cart.length - 1,
              }
            )}
            key={product.id}
          >
            <Image
              loading="eager"
              className="object-contain"
              src={`${API_URL}/upload/${product.images[0]}`}
              width={90}
              height={90}
              alt={`Картинка товара - ${product.name}`}
            />
            <div className="flex flex-col items-end">
              <p className="font-medium leading-[24px] w-full max-w-[163px] text-right">
                {product.name}
              </p>
              <div className="mt-[8px] flex justify-end items-center gap-[20px] flex-wrap">
                <div className="flex items-center gap-[8px]">
                  <button
                    type="button"
                    onClick={() => onExtractFromCart(product)}
                  >
                    <Minus />
                  </button>
                  <span
                    className="font-inter py-[8px] px-[16px] rounded-[4px] border border-solid border-[#D9D9D9] font-medium leading-[1]"
                    aria-label="Количество товара"
                  >
                    {product.qty}
                  </span>
                  <button
                    className="text-[#22282B] disabled:text-neutral-400 relative transition-all group"
                    disabled={product.qty >= product.amount}
                    type="button"
                    onClick={() => onAddToCart(product)}
                  >
                    <Plus />
                    {product.qty >= product.amount && (
                      <span
                        className={cn("", {
                          "absolute -right-0 bottom-full text-nowrap mb-2 mx-auto p-1 text-xs text-white bg-gray-800 rounded-md shadow-lg transition-all group-hover:inline hidden":
                            product.qty >= product.amount,
                        })}
                      >
                        {localeInStock(product.amount, locale)}
                      </span>
                    )}
                  </button>
                </div>
                <div className="flex items-center gap-[20px]">
                  <span className="font-inter font-medium text-[20px] leading-[32px] tracking-[0.03em]">
                    {formatCurrency(
                      product?.discount
                        ? +product.discount_price
                        : +product.price * product.qty,
                      "currency"
                    )}
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemoveFromCart(product)}
                  >
                    <Image
                      className="min-w-[24px] min-h-[24px]"
                      src={"/close-cart.svg"}
                      width={24}
                      height={24}
                      alt={`Удалить`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;

"use client";

import { cn } from "@/lib/utils/cn";
import { useTranslations } from "next-intl";
import AddBtn from "../add-btn/add-btn";
import MyButton from "../my-button/my-button";
import UseCart from "@/lib/hooks/useCart";
import { useRouter } from "next/navigation";
import { ProductType } from "@/lib/types/api-types";
import { Locale } from "../../../i18n.config";

type ProductBtnsProps = {
  product: ProductType;
  type: "card" | "productInner";
  locale: Locale;
};

const ProductBtns = ({ product, type, locale }: ProductBtnsProps) => {
  const router = useRouter();
  const t = useTranslations("ProductCard");
  const { dispatch, REDUCER_ACTIONS, cart } = UseCart();

  const count = cart.find((item) => item.id === product?.id)?.qty;

  const onAddToCart = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (count) {
      router.push("/cart");
    } else {
      dispatch({
        type: REDUCER_ACTIONS.ADD,

        payload: { ...product, qty: 1 },
      });
      router.push("/cart");
    }
  };

  return (
    <div
      className={cn("flex items-center justify-between px-[16px]", null, {
        "justify-normal px-0 gap-[26px] md:gap-[9px] flex-col sm:flex-row mt-auto":
          type === "productInner",
      })}
    >
      <MyButton type="button" onClick={(e) => onAddToCart(e)} styleType={type}>
        {t("BuyNow")}
      </MyButton>{" "}
      <AddBtn locale={locale} type="button" styleType={type} product={product}>
        {t("AddToCart")}
      </AddBtn>
    </div>
  );
};

export default ProductBtns;

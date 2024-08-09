"use client";

import UseCart from "@/lib/hooks/useCart";
import { useTranslations } from "next-intl";
import OrderModal from "./order-modals";
import { Locale } from "../../../i18n.config";

const Total = ({locale}: {locale: Locale}) => {
  const t = useTranslations("Cart");
  const { totalPrice, discountTotal, subTotalPrice } = UseCart();

  return (
    <div className="rounded-[10px] border border-solid border-[#EBEBEB] bg-white w-full md:max-w-[556px] py-[40px] px-[64px] min-h-[368px]md:py-[56px] ">
      <p className="text-[20px] font-bold text-center mb-[40px]">
        {t("OrderSummary")}
      </p>
      <ul className="flex flex-col gap-[20px] tracking-[0.03em] text-[#000000] mb-[48px]">
        <li className="flex justify-between font-medium">
          <span className="leading-[24px]">{t("Subtotal")}</span>{" "}
          <span className="font-inter leading-[32px]">{subTotalPrice}</span>
        </li>
        <li className="flex justify-between">
          <span className="leading-[32px] font-normal">{t("Discount")}</span>{" "}
          <span className="font-inter leading-[32px] font-medium">
            {discountTotal}
          </span>
        </li>
        <li className="flex justify-between">
          <span className="leading-[24px] font-semibold">{t("Total")}</span>{" "}
          <span className="font-inter leading-[32px] font-medium">
            {totalPrice}
          </span>
        </li>
      </ul>
      <OrderModal locale={locale} />
    </div>
  );
};

export default Total;

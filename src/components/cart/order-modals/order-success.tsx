import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const OrderSuccess = () => {
  const t = useTranslations("");
  return (
    <div className="w-full max-w-[452px] mx-auto md:h-[60vh]">
      <p className="text-[#000000] text-[20px] leading-[24px] font-semibold text-center md:text-[32px] md:leading-[38px] mb-[20px]">
        {t("Order.OrderSuccess")}
      </p>
      <Image
        className="mb-[20px] mx-auto"
        unoptimized
        src={"/order-success.png"}
        width={350}
        height={350}
        alt={t("Cart.ShoppingCart")}
      />
    </div>
  );
};

export default OrderSuccess;

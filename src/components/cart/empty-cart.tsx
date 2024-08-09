import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import MyButton from "../my-button/my-button";

const EmptyCart = () => {
  const t = useTranslations("");
  return (
    <div className="flex-col flex items-center justify-center mb-[92px] md:mb-[80px] text-[#00031A] mt-[40px]  md:mt-[20px]">
      <Image
        className="w-full max-w-[383px]"
        unoptimized
        src={"/cart-empty.png"}
        width={383}
        height={383}
        alt={"Корзинка пустая"}
      />
      <p className="font-bold text-[24px] md:text-[30px] md:leading-[42px] leading-[35px] mb-[16px]">
        {t("Cart.EmptyCart")}
      </p>
      <p className="text-[18px] leading-[25px] mb-[24px] w-[221px] md:w-[259px] text-center">
        {t("Cart.OrderThings")}
      </p>
      <MyButton
        href="/"
        className="min-w-[221px] min-h-[48px] text-[18px] flex items-center justify-center"
      >
        {t("Common.BackToMain")}
      </MyButton>
    </div>
  );
};

export default EmptyCart;

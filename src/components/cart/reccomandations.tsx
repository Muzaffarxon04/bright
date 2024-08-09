"use client";

import React from "react";
import MyTitle from "../my-title/my-title";
import { useTranslations } from "next-intl";
import MySwiper from "../my-swiper/my-swiper";
import ProductCard from "../product-card/product-card";
import { SwiperOptions } from "swiper/types";
import { register } from "swiper/element/bundle";
import "./reccomandations.css";
import { ProductType } from "@/lib/types/api-types";
import { Locale } from "../../../i18n.config";
register();

type ReccomandationsProps = {
  data: { data: ProductType[] };
  locale: Locale;
};

const Reccomandations = ({ data, locale }: ReccomandationsProps) => {
  const t = useTranslations("Cart");

  // const mockData = {
  //   data: [
  //     {
  //       id: 1,
  //       name: "Old vase",
  //       price: "9.99",
  //       discount: false,
  //       qty: 5,
  //       discount_price: "0",
  //       discount_percent: "0",
  //       category: "Vase",
  //       images: ["/mock/vase.png"],
  //       description:
  //         "lorem ipsum dolor Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, iusto libero! Explicabo, accusantium architecto rerum dicta, libero molestiae a esse alias dolorem fugit fugiat necessitatibus est repudiandae neque officiis ratione.",
  //       amount: 100,
  //     },
  //   ],
  // };

  const params: SwiperOptions = {
    slidesPerView: "auto",
    spaceBetween: 35,
    // width: 260,
    // slideClass
    slideClass: "cart__swiper-slide",
    // wrapperClass: "gap-[35px]",
  };

  return (
    <div>
      <MyTitle className="text-left text-[#000000] text-[20px] leading-[22px] md:text-[32px] md:leading-[1] font-medium mb-[20px] md:mb-[30px]">
        {t("Recommendations")}
      </MyTitle>
      <MySwiper params={params}>
        {data?.data?.map((product, index) => (
          <swiper-slide
            class="cart__swiper-slide"
            key={index}
            // style={{ width: 260 }}
          >
            <ProductCard locale={locale} type="catalog" product={product} />
          </swiper-slide>
        ))}
      </MySwiper>
    </div>
  );
};

export default Reccomandations;

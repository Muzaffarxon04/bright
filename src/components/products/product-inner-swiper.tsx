"use client";

import React from "react";
import MySwiper from "../my-swiper/my-swiper";
import Image from "next/image";
import { SwiperOptions } from "swiper/types";
import { ProductType } from "@/lib/types/api-types";
import { API_URL } from "@/consts/API_URL";

type ProductInnerSwiperProps = {
  data: {
    data: ProductType;
  };
};

const ProductInnerSwiper = ({ data }: ProductInnerSwiperProps) => {
  const params: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      el: ".swiper-pagination-prod-inner",
      clickable: true,
      bulletActiveClass: "border-accentColor",
      renderBullet: function (index: number, className: string) {
        // const productImage = data?.data[index]?.images[0];
        const productImage = data?.data?.images[index];
        return `
          <div class="${className} lg:w-[108px] w-[76px] lg:h-[108px] h-[76px] border border-solid border-[#E1E4ED] py-[6px] px-[18px] rounded-[10px] bg-white cursor-pointer flex items-center justify-center">
            <img width={108} height={108px} src="${API_URL}/upload/${productImage}" class="lg:h-[108px]  h-[76px] object-contain" alt="Product Image" />
          </div>`;
      },
    },
  };

  return (
    <div className="relative w-full lg:max-w-[624px] md:max-w-[400px] flex md:gap-[36px] gap-[20px] md:justify-end md:items-start lg:flex-row flex-col-reverse">
      <div className="swiper-pagination-prod-inner lg:w-[108px] w-full flex lg:flex-col flex-row lg:gap-[12px] gap-[10px] lg:h-full lg:justify-normal justify-center" />
      <MySwiper
        style={{
          boxShadow: "0px 1px 4px rgba(168, 124, 79, 0.1)",
        }}
        className="md:max-w-[480px] w-full rounded-[10px] bg-white border border-solid border-[#E1E4ED]"
        params={params}
      >
        {data?.data?.images?.map((image, index) => (
          <swiper-slide key={index}>
            {data?.data?.discount && (
              <span
                style={{
                  boxShadow: "0px 1px 4px rgba(25, 33, 61, 0.08)",
                }}
                className={`absolute left-[20px] top-[20px] rounded-[3px] p-[10px] bg-white border border-solid border-[#F1F3F7] text-[#FF5858] text-[14px] leading-[20px] font-semibold font-inter`}
              >
                -{data?.data?.discount_percent}%
              </span>
            )}
            <Image
              loading="lazy"
              quality={95}
              className="lg:h-[468px] h-[330px] w-full object-contain"
              width={480}
              height={468}
              alt={data?.data?.name}
              src={`${API_URL}/upload/${image}`}
            />
          </swiper-slide>
        ))}
      </MySwiper>
    </div>
  );
};

export default ProductInnerSwiper;

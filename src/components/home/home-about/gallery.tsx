"use client";

import MySwiper from "@/components/my-swiper/my-swiper";
import React, { useRef } from "react";
import { SwiperOptions } from "swiper/types";
import Image from "next/image";
import "./gallery.css";

const Gallery = () => {
  const data = [
    { name: "Антиквар ваза", image: "/art-1.jpg" },
    { name: "Посуда с узорами", image: "/art-2.jpg" },
    { name: "Тандыр", image: "/art-3.jpg" },
    { name: "Ковер ручной работы", image: "/art-4.jpg" },
  ];

  const params: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 20,
    speed: 1000,
    autoplay: {
      delay: 4000,
    },
    pagination: {
      el: ".swiper-pagination-2",
      clickable: true,
      bulletClass: "swiper-pagination-bullet-gallery",
      bulletActiveClass: "swiper-pagination-bullet-active-gallery",
      renderBullet: function (index: number, className: string) {
        return `<div class="${className} rounded-full bg-[#DEDBDB] md:w-[20px] md:h-[20px] w-[16px] h-[16px]"></div>`;
      },
    },
  };

  return (
    <div className="relative w-full max-w-full h-auto sm:max-w-[573px] sm:h-[555px]">
      <Image
        quality={100}
        className="md:w-[515px] md:h-[484px] w-[314px] h-[294px] absolute md:-top-[121px] md:-right-[143px] -top-[100px] -right-[120px]"
        width={515}
        height={484}
        alt={"Узор"}
        src={"/ovals-1.png"}
      />
      <Image
        quality={100}
        className="md:w-[515px] md:h-[484px] w-[314px] h-[294px] absolute md:-bottom-[121px] md:-left-[143px] -bottom-[100px] -left-[120px]"
        width={515}
        height={484}
        alt={"Узор"}
        src={"/ovals-2.png"}
      />
      <MySwiper params={params}>
        {data.map((item, index) => (
          <swiper-slide key={index}>
            <Image
              loading="lazy"
              quality={95}
              className="w-full h-[288px] object-cover sm:w-[573px] sm:h-[555px] rounded-[10px]"
              width={573}
              height={555}
              alt={item.name}
              src={item.image}
            />
          </swiper-slide>
        ))}
      </MySwiper>
      <div className="swiper-pagination-2 absolute flex gap-[10px] md:-bottom-[40px] -bottom-[42px] left-[50%] -translate-x-[50%] z-20 bg-red" />
    </div>
  );
};

export default Gallery;

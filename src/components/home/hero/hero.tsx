"use client";

import MySwiper from "@/components/my-swiper/my-swiper";
import ProductInfo from "@/components/product-info/product-info";
import Image from "next/image";
import { SwiperOptions } from "swiper/types";
import "./hero.css";
import { ProductType } from "@/lib/types/api-types";
import { API_URL } from "@/consts/API_URL";
import { Link, Locale } from "../../../../i18n.config";

type HeroProps = {
  data: { data: ProductType[] };
  locale: Locale;
};

const Hero = ({ data, locale }: HeroProps) => {

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
  //     }
  //   ],
  // };

  const params: SwiperOptions = {
    slidesPerView: "auto",
    speed: 1000,
    autoplay: {
      delay: 4000,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      bulletClass: "swiper-pagination-bullet-hero",
      bulletActiveClass: "swiper-pagination-bullet-active-hero",
      renderBullet: function (index: number, className: string) {
        return `<div class="${className} rounded-full bg-[#DEDBDB] md:w-[10px] md:h-[10px] w-[6px] h-[6px]"></div>`;
      },
    },
  };

  return (
    <section className="w-[100wv] bg-accentColor relative md:h-[384px] h-[234px] mb-[50px] md:mb-[57px] mt-[16px] md:mt-[11px]">
      <Image
        quality={100}
        className="absolute left-0 md:h-[384px] object-cover h-[198px] md:w-[464px] w-[190px]"
        width={464}
        height={384}
        alt="Декор для фона"
        src="/pattern-1.png"
      />
      <Image
        quality={100}
        className="absolute right-0 top-0 object-cover h-[100%] w-auto"
        width={1400}
        height={1110}
        alt="Декор для фона"
        src="/pattern-2.png"
      />
      <MySwiper params={params}>
        {data.data.map((product, index) => (
          <swiper-slide key={product.id}>
            <Link
              className="max-w-[1046px] px-[20px] mx-auto md:pt-[34px] md:pb-[30px] py-[18px] block"
              href={`products/${product.id}`}
            >
              <div className="flex justify-between items-center">
                <ProductInfo locale={locale} type="home" product={product} />
                <Image
                  priority
                  quality={95}
                  className="w-[144px] h-[191px] object-cover md:w-[240px] md:h-[316px]"
                  width={240}
                  height={316}
                  alt={product.name}
                  src={`${API_URL}/upload/${product.images[0]}`}
                />
              </div>
            </Link>
          </swiper-slide>
        ))}
      </MySwiper>
      <div className="swiper-pagination absolute flex gap-[10px] md:bottom-[30px] bottom-[8px] left-[50%] -translate-x-[50%] z-20" />
    </section>
  );
};

export default Hero;

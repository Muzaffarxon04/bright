"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { register } from "swiper/element/bundle";

// Register the Swiper custom elements
register();

const SwiperTest = () => {
  const swiperRef = useRef<any>(null);
  const thumbRef = useRef<any>(null);

  const params = {
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  };

  const thumbParams = {
    slidesPerView: 4,
    spaceBetween: 10,
    centeredSlides: true,
    loop: false, // Disable loop for thumbnails
    slideToClickedSlide: true,
    allowTouchMove: false, // Disable swiping on thumbnails
  };

  useEffect(() => {
    const swiperInstance = swiperRef.current;
    const thumbInstance = thumbRef.current;

    if (swiperInstance && thumbInstance) {
      swiperInstance.params = { ...params, thumbs: { swiper: thumbInstance } };
      thumbInstance.params = thumbParams;
      swiperInstance.initialize();
      thumbInstance.initialize();
    }
  }, []);

  return (
    <div className="my-container">
      <swiper-container init="false" ref={swiperRef} class="swiper-container">
        <swiper-slide>
          <Image width={480} height={468} alt="vase" src={"/mock/vase.png"} />
        </swiper-slide>
        <swiper-slide>
          <Image width={480} height={468} alt="vase" src={"/mock/vase.png"} />
        </swiper-slide>
        <swiper-slide>
          <Image width={480} height={468} alt="vase" src={"/mock/vase.png"} />
        </swiper-slide>
      </swiper-container>

      <swiper-container
        init="false"
        ref={thumbRef}
        class="swiper-container thumbs-container"
      >
        <swiper-slide>
          <Image width={108} height={108} alt="vase" src={"/mock/vase.png"} />
        </swiper-slide>
        <swiper-slide>
          <Image width={108} height={108} alt="vase" src={"/mock/vase.png"} />
        </swiper-slide>
        <swiper-slide>
          <Image width={108} height={108} alt="vase" src={"/mock/vase.png"} />
        </swiper-slide>
      </swiper-container>
    </div>
  );
};

export default SwiperTest;

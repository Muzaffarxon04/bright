import React, { useEffect, useRef } from "react";
import { SwiperOptions } from "swiper/types";
import { register } from "swiper/element/bundle";
register();

type MySwiperProps = {
  style?: React.CSSProperties;
  params?: SwiperOptions;
  children: React.ReactNode;
  className?: string;
};

const MySwiper = ({ params, children, className, style }: MySwiperProps) => {
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (swiperRef.current) {
      Object.assign(swiperRef.current, params);
      swiperRef.current.initialize();
    }
  }, [params]);

  //Params was added as a dep. at 26.07.2024 (for payment cards)

  return (
    <swiper-container
      style={style}
      class={className}
      init="false"
      ref={swiperRef}
    >
      {children}
    </swiper-container>
  );
};

export default MySwiper;

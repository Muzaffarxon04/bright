"use client";

import MySwiper from "@/components/my-swiper/my-swiper";
import { formatDate } from "@/lib/utils/commonFunctions";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { SwiperOptions } from "swiper/types";
import "./news-modal.css";
import { NewsType } from "@/lib/types/api-types";
import { API_URL } from "@/consts/API_URL";

type NewsModalProps = {
  newsModal: string;
  setNewsModal: (value: string) => void;
  news: NewsType;
};

const NewsModal = ({ newsModal, setNewsModal, news }: NewsModalProps) => {
  const t = useTranslations("News");
  const params: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
      el: ".swiper-pagination-news",
      clickable: true,
      bulletClass: "swiper-pagination-bullet-news",
      bulletActiveClass: "swiper-pagination-bullet-active-news",
      renderBullet: function (index: number, className: string) {
        return `<div class="${className} rounded-full bg-[#DEDBDB] md:w-[10px] md:h-[10px] w-[7px] h-[7px]"></div>`;
      },
    },
  };

  return (
    <div className="fixed inset-0 bg-[#13131380] z-30 flex items-center justify-center px-[20px]">
      <div className="rounded-[20px] bg-white z-40 px-[8px] md:px-[32px] pt-[16px] pb-[35px] md:pt-[30px] mb:pb-[65px] w-full max-w-[668px] h-[90vh]">
        <div className="flex justify-end mb-[10px]">
          <button onClick={() => setNewsModal("")}>
            {" "}
            <Image
              width={32}
              height={32}
              alt="Иконка закрыть"
              src={"/close.svg"}
            />
          </button>
        </div>
        <p className="font-semibold text-[20px] text-[#000000] md:text-[32px] mb-[16px] md:mb-[20px] text-center">
          {news?.files[0].mime_type.includes("video")
            ? t("ViewVideo")
            : t("ViewArticle")}
        </p>
        <div className="md:h-[calc(90vh-150px)] h-[calc(90vh-128px)] overflow-y-auto pr-2">
          <div className="mb-[20px]">
            {news?.files[0].mime_type.includes("video") ? (
              <div className="h-[215px] md:h-[313px] flex items-center justify-center">
                <video
                  className="rounded-[20px] w-full h-full object-cover"
                  width="100%"
                  muted={false}
                  playsInline
                  controls
                  src={`${API_URL}/upload/${news.files[0].path}`}
                />
              </div>
            ) : (
              <div className="relative">
                <MySwiper params={params}>
                  {news?.files?.map((item) => (
                    <swiper-slide key={item.id}>
                      <Image
                        loading="eager"
                        className="object-cover rounded-[20px] h-[215px] md:h-[313px]"
                        width={588}
                        height={313}
                        alt={news.title}
                        src={`${API_URL}/upload/${item.path}`}
                      />
                    </swiper-slide>
                  ))}
                </MySwiper>
                <div className="swiper-pagination-news absolute flex gap-[10px] -bottom-[20px] left-[50%] -translate-x-[50%] z-20" />
              </div>
            )}
          </div>
          <span className="text-secondaryColor text-[14px] leading-[20px] ">
            {formatDate(+news.created_at)}
          </span>
          <p className="mt-[15px] text-[24px] leading-[32px] font-semibold md:text-[18px] md:leading-[20px] mb-[15px]">
            {news.title}
          </p>

          <p className="text-[14px] leading-[20px] text-[#848282] md:text-[20px] md:leading-[24px]">
            {news.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsModal;

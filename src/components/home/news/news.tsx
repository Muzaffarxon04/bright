"use client";

import MyTitle from "@/components/my-title/my-title";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import NewsCard from "./news-card";
import { Link, Locale } from "../../../../i18n.config";
import NewsModal from "./news-modal";
import { useScrollFixed } from "@/lib/hooks/useScrollFixed";
import MyButton from "@/components/my-button/my-button";
import { getAllNews } from "@/services/newsApi";
import { NewsType } from "@/lib/types/api-types";
import { cn } from "@/lib/utils/cn";

type NewsProps = {
  locale: Locale;
};

const mockData = {
  data: [
    {
      title: "New photo gallery is opening soon... Stay tuned. ",
      image: ["/mock/news.jpg", "/mock/news.jpg", "/mock/news.jpg"],
      date: 1718898304,
      description:
        "Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    },
    {
      title: "New photo gallery is opening soon... Stay tuned. ",
      image: ["/mock/news.jpg"],
      video: "/mock/news-video.mp4",
      date: 1718898304,
      description:
        "Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    },
    {
      title: "New photo gallery is opening soon... Stay tuned. ",
      image: ["/mock/news.jpg"],
      date: 1718898304,
      description:
        "Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    },
    {
      title: "New photo gallery is opening soon... Stay tuned. ",
      image: ["/mock/news.jpg"],
      date: 1718898304,
      description:
        "Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Lorem Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Lorem",
    },
  ],
};

const News = ({ locale }: NewsProps) => {
  const t = useTranslations("News");
  const [newsModal, setNewsModal] = useState("");
  const [data, setData] = useState<{ data: NewsType[] } | null>(null);
  const [visibleNews, setVisibleNews] = useState(4);

  useScrollFixed(newsModal);

  const handleShowMore = () => {
    setVisibleNews(data?.data?.length || 0);
  };

  const fetchData = async () => {
    const data = await getAllNews(locale);
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section
      className={cn("mb-[52px] md:mb-[90px]", {
        "mb-[calc(52px+75px)] md:mb-[calc(90px+75px)]":
          visibleNews === data?.data?.length!,
      })}
    >
      <div className="my-container">
        <MyTitle className="mb-[20px] md:mb-[40px]">{t("News")}</MyTitle>
        <ul className="grid md:grid-cols-2 grid-cols-1 md:gap-x-[77px] md:gap-y-[97px] gap-[60px] grid-rows-2">
          {data?.data?.slice(0, visibleNews).map((news, index) => (
            <NewsCard
              index={index}
              setNewsModal={setNewsModal}
              locale={locale}
              news={news}
              key={index}
            />
          ))}
        </ul>
        {visibleNews < data?.data?.length! && (
          <div className="text-center">
            <MyButton
              onClick={handleShowMore}
              styleType="textStyle"
              className="md:mt-[87px] mt-[76px]"
            >
              {t("View")} &#x2192;
            </MyButton>
          </div>
        )}
      </div>
      {newsModal && (
        <NewsModal
          news={data?.data?.[+newsModal]!}
          newsModal={newsModal}
          setNewsModal={setNewsModal}
        />
      )}
    </section>
  );
};

export default News;

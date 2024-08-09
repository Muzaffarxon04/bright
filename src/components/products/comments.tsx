"use client";

import { formatDate } from "@/lib/utils/commonFunctions";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Locale } from "../../../i18n.config";
import MyTitle from "../my-title/my-title";
import StarRating from "./star-rating";
import { CommentType, ProductType } from "@/lib/types/api-types";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";

type CommensProps = {
  locale: Locale;
  data: CommentType[];
};

const Comments = ({ locale, data }: CommensProps) => {
  const t = useTranslations("Common");
  const [visibleComments, setVisibleComments] = useState(4);

  const handleShowMore = () => {
    setVisibleComments(data.length);
  };
  // const mockData = {
  //   data: [
  //     {
  //       id: 1,
  //       full_name: "Ralph Edwards",
  //       text: "In mauris porttitor tincidunt mauris massa sit lorem sed scelerisque. Fringilla pharetra vel massa enim sollicitudin cras. At pulvinar eget sociis adipiscing eget donec ultricies nibh tristique. ",
  //       rate: 5,
  //       created_at: 1724076000,
  //     },
  //   ],
  // };

  const translate = (length: number) => {
    if (locale === "en") return `See ${length} more comments`;
    else if (locale === "ru") return `Посмотреть еще ${length} комментарий`;
    else if (locale === "uz") return `Yana ${length} sharhlarni ko'rish`;
  };

  return (
    <section
      className={cn("", {
        hidden: !data.length,
      })}
    >
      <MyTitle className="text-[#0F1E3D] mb-[30px] md:mb-[50px] md:text-[36px] md:leading-[42.26px]">
        {t("Comments")}
      </MyTitle>
      {/* <CommentForm /> */}
      <ul className="flex flex-col gap-[20px] md:gap-[37px]  mb-[30px]">
        {data?.slice(0, visibleComments).map((item, index) => (
          <li key={item.id} className="flex gap-[20px] items-start">
            <Image
              loading="lazy"
              alt=""
              width={48}
              height={48}
              src={"/avatar-c.svg"}
            />
            <div className="bg-bgColor py-[10px] px-[20px] rounded-[10px] w-full">
              <div className="flex justify-between mb-[10px] md:mb-[24px] items-center gap-[10px]">
                <span className="leading-[26px] font-bold">
                  {/* {item.full_name} */}
                  Name of the user here
                </span>
                <span className="text-[12px] md:text-[14px] md:leading-[22.4px] text-[#9397AD] leading-[19px] font-inter">
                  {formatDate(+item.created_at!)}
                </span>
              </div>
              <p className="text-[14px] leading-[22px] mb-[10px] md:text-[16px] md:leading-[25.6px]">
                {item.text}
              </p>
              <StarRating type="static" rating={+item.rate!} />
            </div>
          </li>
        ))}
      </ul>
      <div className="md:ml-[53px] ml-0 text-center md:text-left">
        {visibleComments < data.length && (
          <button
            type="button"
            onClick={handleShowMore}
            className="text-[#565973] font-semibold leading-[29px] text-[18px] transition hover:underline decoration-[0.5px]"
          >
            {translate(data.length - visibleComments)}
          </button>
        )}
      </div>
    </section>
  );
};

export default Comments;

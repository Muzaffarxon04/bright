"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils/cn";
import { FaqItemType } from "@/lib/types/api-types";

type FaqListProps = {
  data: { data: FaqItemType[] };
};

const FaqList = ({ data }: FaqListProps) => {
  const t = useTranslations("Faq");
  const [open, setOpen] = useState<number | null>(null);
  const toggleAccordion = (index: number) => {
    if (open === index) {
      setOpen(null);
    } else {
      setOpen(index);
    }
  };

  // const mockData = [
  //   {
  //     question: "Gimana caranya supaya Rizal mau bikin konten buat Array ID?",
  //     answer:
  //       "Ya gratis dong, masa aplikasi chat aja berbayar sih. Lo kalo nanya yang bener dong. Bayangin aja kalo aplikasi ini berbayar, masa pas chat lo harus bayar setiap karakter. Kalo lo mau bayar mending pake MMS aja dah.",
  //   }
  // ];

  return (
    <ul
      className={cn("flex flex-wrap md:gap-[40px] gap-[63px] justify-center", {
        "items-start": open,
      })}
    >
      {data?.data?.map((item, index) => (
        <li
          style={
            open === index
              ? {
                  boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
                }
              : {}
          }
          onClick={() => toggleAccordion(index)}
          key={item.id}
          className={cn(
            "w-full md:w-[360px] p-[16px] bg-white rounded-[20px] border border-solid border-[#E6E9EA] md:py-[25px] md:px-[30px] transition-all duration-300 ease-in-out relative cursor-pointer gap-[20px] md:gap-[40px] flex flex-col",
            null,
            {
              "bg-[#FFFBF6] pb-[49px] md:pb-[64px]": open === index,
            }
          )}
        >
          <p className="font-medium leading-[20.8px] tracking-[0.03em] md:font-semibold md:text-[24px] md:leading-[31.2px]">
            {item.question}
          </p>
          <p
            ref={(el) => {
              if (el && open === index) {
                el.style.height = el.scrollHeight + "px";
              } else if (el) {
                el.style.height = "0px";
              }
            }}
            className={cn(
              `font-medium text-[14px] leading-[20px] md:text-[16px] md:leading-[22px] text-[#909DA2] opacity-0 transition-all duration-300 ease-in-out`,
              null,
              {
                "h-auto opacity-100": open === index,
              }
            )}
          >
            {item.answer}
          </p>
          <div className="w-[50px] h-[50px] rounded-full bg-accentColor flex items-center justify-center absolute bottom-0 translate-y-[50%] right-[30px]">
            <Image
              width={23}
              height={23}
              alt="Стрелка вниз"
              src={"/arrow-down-2.svg"}
              className={cn(
                "rotate-0 transition-transform duration-300 ease-in-out",
                null,
                {
                  "rotate-180": open === index,
                }
              )}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default FaqList;

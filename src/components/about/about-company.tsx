import { cn } from "@/lib/utils/cn";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import React from "react";
import MyButton from "../my-button/my-button";

const AboutCompany = async () => {
  const t = await getTranslations("AboutUs.AboutCompany");
  const c = await getTranslations("AboutUs");

  const keys = ["AboutOne", "AboutTwo", "AboutThree"];

  return (
    <section className="mb-[40px] md:mb-[80px]">
      <ul className="grid md:grid-cols-2 grid-cols-1 md:items-start gap-[32px] md:gap-[40px] mb-[40px]">
        {keys.map((item, index) => (
          <li
            style={{
              boxShadow: "0px 1px 4px rgba(25, 33, 61, 0.08)",
            }}
            className={cn(
              "rounded-[10px] border p-[24px] md:p-[30px]  border-solid border-[#E1E4ED] bg-white w-full md:max-w-[560px] flex flex-col",
              null,
              {
                "md:flex-row md:gap-[32px]": index === 1 || index === 2,
              }
            )}
            key={index}
          >
            <Image
              className={cn(
                "mb-[24px] md:mb-[30px] rounded-[10px] w-full h-[200px] object-cover",
                null,
                {
                  "md:w-[154px] md:h-[154px]": index === 1 || index === 2,
                }
              )}
              quality={100}
              alt="Картинки изделий"
              width={295}
              height={200}
              src={t(`${item}.image`)}
            />
            <div>
              <p className="text-[#22282B] -tracking-[0.03em] leading-[21px] font-semibold mb-[15px] md:text-[24px] md:leading-[31px]">
                {t(`${item}.title`)}
              </p>
              <p className="text-[14px] leading-[24px] md:text-[18px]">
                {t(`${item}.text`)}
              </p>
            </div>
          </li>
        ))}
        <li className="min-[900px]:-mt-[188px] -mt-[90px] w-full hidden md:block">
          <Image
            className={"h-[434px] w-full object-cover rounded-[10px]"}
            quality={100}
            alt="Картинки изделий"
            width={295}
            height={200}
            src={"/about-4.jpg"}
          />
        </li>
      </ul>
      <div className="flex justify-center">
        <MyButton href="/contacts" styleType="textStyle">
          {c("SendMessage")} &#x2192;
        </MyButton>
      </div>
    </section>
  );
};

export default AboutCompany;

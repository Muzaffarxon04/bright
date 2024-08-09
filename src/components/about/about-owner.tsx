import { cn } from "@/lib/utils/cn";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import React from "react";

const AboutOwner = async () => {
  const t = await getTranslations("AboutUs.AboutOwner");
  const c = await getTranslations("AboutUs");
  const keys = ["AboutOne", "AboutTwo", "AboutThree"];

  return (
    <section className="mb-[180px] md:mb-[63px] ">
      <h3 className="font-semibold text-[20px] leading-[23px] mb-[65px] md:text-[48px] md:leading-[56px] text-center md:mb-[40px]">
        {c("AboutOwnerTitle")}
      </h3>
      <ul className="flex justify-center flex-wrap items-start gap-[40px]">
        {keys.map((item, index) => (
          <li className="w-full max-w-[360px] group" key={index}>
            <Image
              loading="lazy"
              className="rounded-[10px] mb-[20px] md:mb-[40px]"
              width={360}
              height={395}
              alt="Жураев Гайрат"
              src={t(`${item}.image`)}
            />
            <p className="leading-[20px] pb-[40px] relative">
              {t(`${item}.text`)}
              <span className="w-full absolute bottom-0 left-0  bg-[#6B6B6B] h-[1px] rounded-[10px] group-hover:h-[5px] group-hover:bg-accentColor transition-all" />
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AboutOwner;

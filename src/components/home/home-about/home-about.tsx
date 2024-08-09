import { getTranslations } from "next-intl/server";
import React from "react";
import { Link } from "../../../../i18n.config";
import Image from "next/image";
import { Phone } from "@/components/svg/svg-list";
import Gallery from "./gallery";

const HomeAbout = async () => {
  const t = await getTranslations("HomeAbout");
  const c = await getTranslations("Common");

  return (
    <section className="bg-[#454545] pt-[20px] pb-[42px] md:pb-[111px] mb-[40px] md:mb-[80px] overflow-hidden">
      <div className="max-w-[1228px] mx-auto px-[20px] relative md:h-[258px] mb-[40px] md:mb-[13px]">
        <Image
          className="w-full h-[73px] md:h-[258px] object-contain"
          alt={"Bright gallery"}
          src={"/bright-gallery.png"}
          width={1188}
          height={258}
        />
        <p
          style={{
            textShadow: "0px 2.46034px 2.46034px rgba(0, 0, 0, 0.25)",
          }}
          className="text-[#E9E9DB] text-[20px] leading-[23px] font-semibold -mt-[45px] text-center md:-mt-[150px] md:text-[48px] md:leading-[56px]"
        >
          {t("ArtMade")}
        </p>
      </div>
      <div className="my-container flex capitalize text-white mb-[42px] md:mb-[111px] justify-between items-center gap-[37px] flex-col lg:flex-row lg:gap-[13px]">
        <div className="w-full max-w-full lg:max-w-[561px]">
          <p className="font-bold text-[18px] leading-[21px] md:text-[32px] md:leading-[38px] mb-[20px] md:mb-[47px]">
            {t("PotteryArt")}
          </p>
          <div className="text-[16px] laeding-[19px] font-medium md:text-[24px] md:leading-[28px] flex flex-col gap-[20px] mb-[20px] md:mb-[73px]">
            <p>{t("Text1")}</p>
            <p>{t("Text2")}</p>
            <p>{t("Text3")}</p>
            <p>{t("Text4")}</p>
          </div>
          <Link
            className="inline-flex items-center gap-[10px] font-semibold text-[16px] leading-[19px] border-b border-solid border-white hover:text-accentColor transition hover:border-accentColor pb-[18.5px] md:text-[24px] md:leading-[28.18px] md:pb-[15.5px]"
            href={"/contacts"}
          >
            {c("ContactUs")}
            <Phone />
          </Link>
        </div>
        <Gallery />
      </div>
    </section>
  );
};

export default HomeAbout;

import { getTranslations } from "next-intl/server";
import React from "react";
import { Metadata } from "next";
import MyTitle from "@/components/my-title/my-title";
import { Locale } from "../../../../i18n.config";
import Image from "next/image";
import ContactForm from "@/components/contacts/contact-form";
import Requisites from "@/components/contacts/requisites";

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: Locale;
  };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Common" });

  return {
    title: `Bright gallery | ${t("ContactUs")}`,
    description: t("ContactUs"),
    icons: {
      icon: "/favicon.svg",
    },
  };
}

const Contacts = async ({
  params: { locale },
}: {
  params: {
    locale: Locale;
  };
}) => {
  const c = await getTranslations("Common");
  return (
    <div className="my-container mt-[40px] mb:mt-[71px] mb-[63px] md:mb-[80px] overflow-hidden">
      <MyTitle className="mb-[20px] leading-[48px]">{c("ContactUs")}</MyTitle>
      <div className="flex justify-center">
        <p className="text-center w-full max-w-[417px] text-[#6D758F] text-[14px] leading-[20px] md:text-[16px] md:leading-[24px] mb-[40px] md:mb-[53px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis,
          dolores.
        </p>
      </div>
      <div className="flex items-center md:justify-between md:gap-[95px] gap-[72px] lg:flex-row flex-col-reverse justify-center mb-[72px] md:mb-[66px]">
        <div className="relative">
          <Image
            unoptimized
            className="absolute -top-[147px] -left-[100px] -z-10"
            src={"/c-oval.png"}
            width={417}
            height={391}
            alt=""
          />

          <Image
            className="border border-solid border-accentColor rounded-t-[300px] py-[12px] md:px-[14px] px-[9px] h-[383px] md:h-[611px] object-cover"
            src={"/contact-img.png"}
            width={430}
            height={587}
            alt="Историческое наследие"
          />

          <Image
            unoptimized
            className="absolute -bottom-[113px] -right-[123px] -z-10"
            src={"/c-oval.png"}
            width={417}
            height={391}
            alt=""
          />
        </div>
        <ContactForm />
      </div>
      <Requisites locale={locale} />
    </div>
  );
};

export default Contacts;

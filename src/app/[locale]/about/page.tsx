import MyTitle from "@/components/my-title/my-title";
import { getTranslations } from "next-intl/server";
import React from "react";
import { Locale } from "../../../../i18n.config";
import { Metadata } from "next";
import AboutCompany from "@/components/about/about-company";
import AboutOwner from "@/components/about/about-owner";

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: Locale;
  };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "AboutUs" });

  return {
    title: `Bright gallery | ${t("AboutUs")}`,
    description: t("AboutUs"),
    icons: {
      icon: "/favicon.svg",
    },
  };
}

const About = async () => {
  const t = await getTranslations("AboutUs");
  return (
    <div className="my-container">
      <MyTitle className="text-[#0F1E3D] md:text-textColor md:mt-[31px] mt-[50px] mb-[40px]">
        {t("AboutUs")}
      </MyTitle>
      <AboutCompany />
      <AboutOwner />
    </div>
  );
};

export default About;

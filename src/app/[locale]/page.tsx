import Faq from "@/components/home/faq/faq";
import Hero from "@/components/home/hero/hero";
import HomeAbout from "@/components/home/home-about/home-about";
import HomeProducts from "@/components/home/home-products/home-products";
import News from "@/components/home/news/news";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Locale } from "../../../i18n.config";
import { ProductType } from "@/lib/types/api-types";
import { getAllProducts } from "@/services/productsApi";

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: Locale;
  };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: `Bright gallery | ${t("Main.Home")}`,
    description: t("Main.Desc"),
    icons: {
      icon: "/favicon.svg",
    },
  };
}

export default async function Home({
  params: { locale },
}: {
  params: {
    locale: Locale;
  };
}) {
  const data: { data: ProductType[] } = await getAllProducts(locale);
  return (
    <div>
      <Hero locale={locale} data={data} />
      <HomeProducts locale={locale} wrapperClassName="md:mb-[80px] mb-[65px]" />
      <News locale={locale} />
      <HomeAbout />
      <Faq locale={locale} />
    </div>
  );
}

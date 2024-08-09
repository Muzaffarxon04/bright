import CartContent from "@/components/cart/cart-content";
import Reccomandations from "@/components/cart/reccomandations";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Locale } from "../../../../i18n.config";
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
    title: `Bright gallery | ${t("Cart.Cart")}`,
    description: t("Cart.Cart"),
    icons: {
      icon: "/favicon.svg",
    },
  };
}

const Cart = async ({ params: { locale } }: { params: { locale: Locale } }) => {
  const data = await getAllProducts(locale);

  return (
    <div className="my-container mb-[211px] md:mb-[92px]">
      <CartContent locale={locale} />
      <Reccomandations locale={locale} data={data} />
    </div>
  );
};

export default Cart;

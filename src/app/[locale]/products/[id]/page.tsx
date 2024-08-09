import MyTitle from "@/components/my-title/my-title";
import ProductInfo from "@/components/product-info/product-info";
import Comments from "@/components/products/comments";
import ProductInnerSwiper from "@/components/products/product-inner-swiper";
import { ProductType } from "@/lib/types/api-types";
import { getProductById } from "@/services/productsApi";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Locale } from "../../../../../i18n.config";

type ProductInnerProps = {
  params: { id: number; locale: Locale };
};

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: Locale;
  };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: `Bright gallery | ${t("Products.Products")}`,
    description: t("Products.Products"),
    icons: {
      icon: "/favicon.svg",
    },
  };
}

const ProductInner = async ({ params: { id, locale } }: ProductInnerProps) => {
  const t = await getTranslations("Common");
  const data: { data: ProductType } = await getProductById(id, locale);

  // const mockData = {
  //   data: [
  //     {
  //       id: 1,
  //       name: "Old vase",
  //       price: "9.99",
  //       discount: false,
  //       qty: 5,
  //       discount_price: "0",
  //       discount_percent: "0",
  //       category: "Vase",
  //       images: ["/mock/vase.png"],
  //       description:
  //         "lorem ipsum dolor Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, iusto libero! Explicabo, accusantium architecto rerum dicta, libero molestiae a esse alias dolorem fugit fugiat necessitatibus est repudiandae neque officiis ratione.",
  //       amount: 100,
  //     }
  //   ],
  // };

  return (
    <div className="my-container mt-[50px] md:mt-[90px] mb-[85px] md:mb-[79px]">
      <MyTitle className="text-[#0F1E3D] mb-[30px] md:mb-[50px] md:text-[36px] md:leading-[42.26px]">
        {t("Products")}
      </MyTitle>
      <div className="flex justify-between flex-col-reverse md:flex-row gap-[20px] md:gap-[36px] mb-[40px] md:mb-[80px]">
        <ProductInnerSwiper data={data} />
        <ProductInfo locale={locale} type="productInner" product={data} />
      </div>
      <Comments data={data?.data?.feedbacks} locale={locale} />
    </div>
  );
};

export default ProductInner;

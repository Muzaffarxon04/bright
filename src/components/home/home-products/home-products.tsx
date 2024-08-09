import { cn } from "@/lib/utils/cn";
import { getAllProducts } from "@/services/productsApi";
import { getTranslations } from "next-intl/server";

import { ProductType } from "@/lib/types/api-types";
import { Locale } from "../../../../i18n.config";
import MyTitle from "@/components/my-title/my-title";
import ProductCard from "@/components/product-card/product-card";
import Products from "@/components/products/products";
import MyButton from "@/components/my-button/my-button";

type ProductsProps = {
  wrapperClassName?: string;
  searchParams?: { [key: string]: string };
  locale: Locale;
};

const HomeProducts = async ({
  wrapperClassName,
  searchParams,
  locale,
}: ProductsProps) => {
  const t = await getTranslations("Home");
  const searchString = searchParams?.search || "";
  //Popular shoulbe be switched on true...
  const data: { data: ProductType[] } = await getAllProducts(locale);

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
  //     }
  //   ],
  // };

  return (
    <section className={cn("", wrapperClassName)}>
      <div className="my-container">
        <MyTitle className="mb-[50px] text-[#0F1E3D] md:text-[36px] md:leading-[42px]">
          {t("PopularProducts")}
        </MyTitle>
        <Products type="home" locale={locale} />
        <div className="text-center">
          <MyButton
            href="/products"
            styleType="textStyle"
            className="md:mt-[40px] mt-[30px]"
          >
            {t("ViewProducts")} &#x2192;
          </MyButton>
        </div>
      </div>
    </section>
  );
};

export default HomeProducts;

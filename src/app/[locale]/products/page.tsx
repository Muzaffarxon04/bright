import MyTitle from "@/components/my-title/my-title";
import ProductCard from "@/components/product-card/product-card";
import Filter from "@/components/products-page/filter";
import { getTranslations } from "next-intl/server";
import { Locale } from "../../../../i18n.config";
import { Metadata } from "next";
import Products from "@/components/products/products";

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

type ProductsPageProps = {
  searchParams: { [key: string]: string };
  params: { locale: Locale };
};

const ProductsPage = async ({
  searchParams,
  params: { locale },
}: ProductsPageProps) => {
  const t = await getTranslations("Common");

  const mockData = {
    data: [
      {
        id: 1,
        name: "Old vase",
        price: "9.99",
        discount: true,
        qty: 5,
        discount_price: "7.99",
        discount_percent: "20",
        category: "Vase",
        images: ["/mock/vase.png"],
        description:
          "lorem ipsum dolor Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, iusto libero! Explicabo, accusantium architecto rerum dicta, libero molestiae a esse alias dolorem fugit fugiat necessitatibus est repudiandae neque officiis ratione.",
      },
      {
        id: 2,
        name: "Old vase",
        price: "9.99",
        discount: true,
        qty: 5,
        discount_price: "7.99",
        discount_percent: "20",
        category: "Vase",
        images: ["/mock/vase.png"],
        description:
          "lorem ipsum dolor Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, iusto libero! Explicabo, accusantium architecto rerum dicta, libero molestiae a esse alias dolorem fugit fugiat necessitatibus est repudiandae neque officiis ratione.",
      },
      {
        id: 3,
        name: "Old vase",
        price: "9.99",
        discount: true,
        qty: 5,
        discount_price: "7.99",
        discount_percent: "20",
        category: "Vase",
        images: ["/mock/vase.png"],
        description:
          "lorem ipsum dolor Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, iusto libero! Explicabo, accusantium architecto rerum dicta, libero molestiae a esse alias dolorem fugit fugiat necessitatibus est repudiandae neque officiis ratione.",
      },
      {
        id: 4,
        name: "Old vase",
        price: "9.99",
        discount: true,
        qty: 5,
        discount_price: "7.99",
        discount_percent: "20",
        category: "Vase",
        images: ["/mock/vase.png"],
        description:
          "lorem ipsum dolor Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, iusto libero! Explicabo, accusantium architecto rerum dicta, libero molestiae a esse alias dolorem fugit fugiat necessitatibus est repudiandae neque officiis ratione.",
      },
    ],
  };

  return (
    <div className="my-container mt-[50px] md:mt-[90px] mb-[124px] md:mb-[107px]">
      <MyTitle className="text-[#0F1E3D] mb-[30px] md:mb-[50px] md:text-[36px] md:leading-[42.26px]">
        {t("Products")}
      </MyTitle>
      <div className="flex md:flex-row flex-col justify-between md:items-start items-stretch gap-[20px] md:gap-[40px]">
        <Filter locale={locale} searchParams={searchParams} />

        <div className="w-full max-w-[860px]">
          <Products
            searchParams={searchParams}
            type="products"
            locale={locale}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

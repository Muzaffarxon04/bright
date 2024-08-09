import { cn } from "@/lib/utils/cn";
import { getAllProducts } from "@/services/productsApi";
import { getTranslations } from "next-intl/server";
import MyTitle from "../my-title/my-title";
import ProductCard from "../product-card/product-card";
import { Locale } from "../../../i18n.config";
import { ProductCategory, ProductType } from "@/lib/types/api-types";
import { mock } from "node:test";

type ProductsProps = {
  wrapperClassName?: string;
  searchParams?: { [key: string]: string };
  locale: Locale;
  type: "home" | "products";
};

const Products = async ({
  wrapperClassName,
  searchParams,
  locale,
  type,
}: ProductsProps) => {
  const t = await getTranslations("Home");
  const searchString = searchParams?.search || "";
  const selectedGroup = searchParams?.group || "";
  const selectedFilter = searchParams?.filter || "";
  //Popular shoulbe be switched on true...

  const data: { data: ProductType[] } = await getAllProducts(
    locale,
    searchString,
    selectedFilter,
    selectedGroup
  );

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
    <ul
      className={cn("", wrapperClassName, {
        "grid grid-cols-2 md:grid-cols-1 lg:grid-cols-[repeat(auto-fit,_minmax(260px,_1fr))] md:gap-[35px] gap-[11px]":
          type === "products",
        "grid grid-cols-[repeat(auto-fit,_minmax(260px,_1fr))] gap-[40px]":
          type === "home",
        "flex [&>li]:w-[260px] flex-wrap justify-center":
          data?.data.length <= 3,
      })}
    >
      {data?.data.map((product, index) => (
        //I wrapped the component with li tag here not in the component itself, because this component use outside
        //of ul tag in other file
        <li key={product.id}>
          <ProductCard
            locale={locale}
            type={type === "products" ? "catalog" : "default"}
            product={product}
          />
        </li>
      ))}
    </ul>
  );
};

export default Products;

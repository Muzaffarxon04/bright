import { cn } from "@/lib/utils/cn";
import { getTranslations } from "next-intl/server";
import { Link, Locale } from "../../../i18n.config";
import Image from "next/image";
import FilterClient from "./search-input";
import { getAllCategories } from "@/services/categoriesApi";
import { CategoryType, ProductCategory } from "@/lib/types/api-types";

type FilterProps = {
  searchParams: { [key: string]: string };
  locale: Locale;
};

const Filter = async ({ searchParams, locale }: FilterProps) => {
  const t = await getTranslations("Catalog");
  const selectedGroup = searchParams.group || "";
  const selectedSearch = searchParams.search || "";
  const selectedFilter = searchParams.filter || "";
  const data: { data: CategoryType[] } = await getAllCategories(locale);

  const categoriesMock = {
    data: [
      {
        name: "Vase",
      },
      {
        name: "Carpet",
      },
      {
        name: "Plates",
      },
      {
        name: "Sold out",
      },
    ],
  };

  return (
    <div className="w-full md:w-[276px] py-[27px] mb-[54px] px-[22px] md:px-[18px] bg-white border border-solid border-[#E6E7EC] rounded-[10px] md:min-h-[559px]">
      <div
        className={cn(
          "flex justify-between [&>a]:font-medium [&>a]:leading-[1] [&>a]:pb-[8px] gap-[10px] mb-[30px] [&>a]:text-nowrap items-center"
        )}
      >
        <Link
          className={cn("text-[#717171]", null, {
            "border-solid border-b border-[#000000] text-[#000000]":
              selectedGroup === "",
          })}
          href={`?${new URLSearchParams({
            group: "",
            search: selectedSearch,
            filter: selectedFilter,
          })}`}
        >
          {t("FilterKeys.All")}
        </Link>
        <Link
          className={cn("text-[#717171]", null, {
            "border-solid border-b border-[#000000] text-[#000000]":
              selectedGroup === "author",
          })}
          href={`?${new URLSearchParams({
            group: "author",
            search: selectedSearch,
            filter: selectedFilter,
          })}`}
        >
          {t("FilterKeys.Authors")}
        </Link>
        <Link
          className={cn("text-[#717171]", null, {
            "border-solid border-b border-[#000000] text-[#000000]":
              selectedGroup === "in_stock",
          })}
          href={`?${new URLSearchParams({
            group: "in_stock",
            search: selectedSearch,
            filter: selectedFilter,
          })}`}
        >
          {t("FilterKeys.InStock")}
        </Link>
      </div>
      <label className="relative font-inter " htmlFor="search">
        <Image
          src={"/search.svg"}
          width={24}
          height={24}
          alt={t("Search")}
          className="absolute left-[8px] -bottom-[2px] z-10"
        />
        <FilterClient />
      </label>
      <ul className="flex flex-col items-start leading-[18.78px] text-[#858181] mt-[19px]">
        {data?.data?.map((item, index) => (
          <li
            className={cn(
              "py-[10px] px-[16px] cursor-pointer w-full rounded-[8px]",
              null,
              {
                "border-solid border border-accentColor bg-[#F5F6F8]":
                  selectedFilter === String(item.id),
              }
            )}
            key={index}
          >
            <Link
              className="w-full inline-block"
              href={`?${new URLSearchParams({
                group: selectedGroup,
                search: selectedSearch,
                filter: String(item.id),
              })}`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Filter;

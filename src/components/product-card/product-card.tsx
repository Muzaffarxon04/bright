import { cn } from "@/lib/utils/cn";
import { formatCurrency } from "@/lib/utils/commonFunctions";
import Image from "next/image";
import { Link, Locale } from "../../../i18n.config";
import ProductBtns from "./product-btns";
import { ProductType } from "@/lib/types/api-types";
import { API_URL } from "@/consts/API_URL";

type ProductCardProps = {
  product: ProductType;
  type?: "default" | "catalog";
  locale: Locale;
};

const ProductCard = ({ product, type, locale }: ProductCardProps) => {
  return (
    <Link
      href={`/products/${product.id}`}
      style={{
        boxShadow: "0px 1px 4px 0px #19213D14",
      }}
      className={cn(
        "h-[426px] bg-white border border-solid !border-[0_1px_4px_rgba(25_33_61_0.08)] rounded-[6px] pb-[16px] flex flex-col",
        null,
        {
          "h-[247px] md:h-[426px]": type === "catalog",
        }
      )}
    >
      <div
        className={cn("relative mb-[24px]", null, {
          "mb-[5px] md:mb-[24px]  md:pt-0 pt-[40px]": type === "catalog",
        })}
      >
        {product.discount && (
          <span
            style={{
              boxShadow: "0px 1px 4px rgba(25, 33, 61, 0.08)",
            }}
            className={`absolute right-[17px] top-[17px] rounded-[3px] p-[10px] bg-white border border-solid border-[#F1F3F7] text-[#FF5858] text-[14px] leading-[20px] font-semibold font-inter`}
          >
            -{product.discount_percent}%
          </span>
        )}
        <Image
          quality={90}
          className={cn(
            "object-contain w-full h-[256px] hover:scale-105 transition-transform duration-1000",
            null,
            {
              "h-[122px] md:h-[256px]": type === "catalog",
            }
          )}
          alt="Национальные продукты"
          width={260}
          height={256}
          src={`${API_URL}/upload/${product.images[0]}`}
        />
      </div>

      <div className="px-[16px]">
        <h4
          className={cn(
            "text-[18px] leading-[24px] font-semibold mb-[10px] truncate",
            null,
            {
              "text-[16px] md:text-[18px] mb:mb-[10px] mb-[5px]":
                type === "catalog",
            }
          )}
        >
          {product.name}
        </h4>
        {product.discount && (
          <p
            className={cn(
              "font-inter text-secondaryColor text-[14px] leading-[18px] line-through truncate mb-[10px]",
              null,
              {
                "mb:mb-[10px] mb-[5px]": type === "catalog",
              }
            )}
          >
            {formatCurrency(+product.price!, "currency")}
          </p>
        )}

        <p
          className={cn(
            "font-inter text-[18px] leading-[22px] truncate",
            null,
            {
              "text-[16px] md:text-[18px]": type === "catalog",
            }
          )}
        >
          {formatCurrency(
            product.discount ? +product.discount_price : +product.price,
            "currency"
          )}
        </p>
      </div>
      <div
        className={cn("mt-auto", null, {
          "md:block hidden": type === "catalog",
        })}
      >
        <ProductBtns locale={locale} type="card" product={product} />
      </div>
    </Link>
  );
};

export default ProductCard;

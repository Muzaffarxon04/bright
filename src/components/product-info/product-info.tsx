import { cn } from "@/lib/utils/cn";
import { formatCurrency } from "@/lib/utils/commonFunctions";
import ProductBtns from "../product-card/product-btns";
import { ProductType } from "@/lib/types/api-types";
import { Locale } from "../../../i18n.config";

type ProductInfoProps = {
  type: "home" | "productInner";
  product:
    | ProductType
    | {
        data: ProductType;
      };
  locale: Locale;
};

const ProductInfo = ({ product, type, locale }: ProductInfoProps) => {
  //@ts-ignore
  const item = type === "productInner" ? product?.data : product;
  return (
    <div
      className={cn(
        "flex flex-col items-start text-white w-[190px] md:w-[571px]",
        null,
        {
          "text-textColor": type === "productInner",
        }
      )}
    >
      <div
        className={cn(
          "min-w-[100px] rounded-[34px] py-[6px] px-[12px] border border-solid font-medium md:text-[16px] md:leading-[22.4px] text-[14px] leading-[19.6px] font-inter text-center bg-white text-accentColor border-accentColor mb-[20px]",
          null,
          {
            "md:mb-[40px]": type === "productInner",
          }
        )}
      >
        {item.category.name}
      </div>
      <h4
        className={cn(
          "font-semibold text-[14px] leading-[16.8px] tracking-[-3%] md:text-[32px] md:leading-[38.4px] mb-[20px] break-all",
          null,
          {
            "text-[20px] leading-[24px] md:text-[52px] md:leading-[62.4px] text-textColor":
              type === "productInner",
          }
        )}
      >
        {item.name}
      </h4>
      <p
        className={cn(
          "font-inter font-medium text-[12px] leading-[16.8px] line-clamp-4 mb-[20px] md:text-[18px] md:leading-[25.2px] text-white md:text-[#E6E6E6] md:shadow-[0_4_25_0px_#FFFFFF4D] shadow-none",
          null,
          {
            "text-[16px] leading-[22.4px] text-[#6E6E6E] md:shadow-none line-clamp-none":
              type === "productInner",
          }
        )}
      >
        {item.description}
      </p>
      <div
        className={cn("flex items-end gap-[10px] md:gap-[31px]", null, {
          "mb-[40px] md:mb-[116px]": type === "productInner",
        })}
      >
        <span
          className={cn(
            "font-inter text-[16px] font-semibold leading-[20.8px] tracking-[-3%] text-color md:text-[36px] md:leading-[46.8px]",
            null,
            {
              "text-[24px] leading-[31.2px] text-[#22282B]":
                type === "productInner",
            }
          )}
        >
          {formatCurrency(
            item.discount ? +item.discount_price : +item.price,
            "currency"
          )}
        </span>
        {item.discount && (
          <span
            className={cn(
              "font-medium font-inter text-[12px] leading-[16.8px] decoration-[0.5px] line-through md:text-[16px] md:leading-[22.4px] text-[#D2D9DD]",
              null,
              {
                "text-[16px] leading-[22.4px] text-[#909DA2]":
                  type === "productInner",
              }
            )}
          >
            {formatCurrency(+item.price!, "currency")}
          </span>
        )}
      </div>
      {type === "productInner" && (
        <ProductBtns locale={locale} type={"productInner"} product={item} />
      )}
    </div>
  );
};

export default ProductInfo;

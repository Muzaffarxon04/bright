"use client";

import { OrderTypeGet } from "@/lib/types/api-types";
import { cn } from "@/lib/utils/cn";
import { formatCurrency, formatDate } from "@/lib/utils/commonFunctions";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Locale } from "../../../i18n.config";
import CommentModal from "../comment-modal/comment-modal";
import { ArrowDown } from "../svg/svg-list";
import Skeleton from "../common/skeleton";

const ProfileOrders = ({
  data,
  locale,
}: {
  data: { data: OrderTypeGet[] };
  locale: Locale;
}) => {
  const t = useTranslations("Profile.Orders");
  const [order, setOrder] = useState<null | number>(null);
  const [showGuide, setShowGuide] = useState(true);
  const [open, setOpen] = useState<null | number>(null);

  // const mockData = {
  //   data: [
  //     {
  //       orderId: "22",
  //       date: 1722423342,
  //       items: 2,
  //       total: 100000,
  //       forPayment: 100000,
  //       status: "Cancelled",
  //     },
  //     {
  //       orderId: "23",
  //       date: 1722423788,
  //       items: 2,
  //       total: 100000,
  //       forPayment: 100000,
  //       status: "Confirmed",
  //     },
  //     {
  //       orderId: "24",
  //       date: 1722423739,
  //       items: 2,
  //       total: 100000,
  //       forPayment: 100000,
  //       status: "Delivering",
  //     },
  //   ],
  // };

  const toggleAccordion = (index: number) => {
    if (index === order) {
      setOrder(null);
    } else {
      setOrder(index);
    }
    setShowGuide(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGuide(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <span className="md:text-[28px] font-semibold md:leading-[1] text-[20px] leading-[24px] tracking-[3%]">
        {t("Orders")}
      </span>
      <ul className="flex flex-col mt-[16px] md:mt-[40px] gap-[20px] md:gap-[16px]">
        {data?.data?.map((item, index) => (
          <li
            onClick={() => toggleAccordion(index)}
            key={index}
            className={cn(
              "px-[24px] pt-[24px] pb-[24px] rounded-[32px] bg-[#F5F6F8] overflow-hidden cursor-pointer relative",
              null,
              {
                "pb-0": order !== index,
              }
            )}
          >
            {showGuide && (
              <div className="absolute bottom-1 right-[50%] transform -translate-x-1/2 flex flex-col items-center animate-pulse text-secondaryColor">
                <ArrowDown />
              </div>
            )}
            <div className="mb-[40px]">
              <div className="pb-[16px] border-b border-solid border-[#EBECF1] flex justify-between md:items-center md:flex-row flex-col items-start gap-2">
                <div>
                  <p className="font-bold text-[20px] text-[#00031A] mb-[12px] font-inter md:text-[24px] leading-[32px]">
                    {t("Order")}&nbsp;№&nbsp;{item.check_number}
                  </p>
                  <span className="text-[#6B7280] font-medium leading-[18px] md:text-[20px] md:leading-[22px]">
                    {t("OrderProcessed")}
                  </span>
                  &nbsp;
                  <span className="font-inter font-medium text-[#00031A] text-[14px] leading-[15px] md:text-[20px] md:leading-[22px]">
                    {formatDate(+item.created_at)}
                  </span>
                </div>
                <span className="text-[#00031A] font-semibold md:text-[20px] md:leading-[26px] text-[14px]">
                  {item.status}
                </span>
              </div>
            </div>
            <div
              ref={(el) => {
                if (el && order === index) {
                  el.style.height = el.scrollHeight + "px";
                } else if (el) {
                  el.style.height = "0px";
                }
              }}
              className={cn("h-0 transition-all ease-in-out", null, {
                "h-auto": order === index,
              })}
            >
              <ul className="mb-[16px]">
                {item?.order_items.map((product) => (
                  <li
                    key={product.id}
                    className="flex flex-col pb-[16px] border-b-[1.5px] border-solid border-[#EBECF1] mb-[16px]"
                  >
                    <div className="flex justify-between mb-[8px]">
                      <span className="leading-[19px] font-semibold text-accentColor">
                        {product.product_name}
                      </span>
                      <button
                        onClick={() => setOpen(product.product.id)}
                        className="text-accentColor leading-[17px] text-[14px] font-semibold  hover:underline transition-colors cursor-pointer"
                      >
                        {t("LeaveComment").toLowerCase()}
                      </button>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-inter font-semibold leading-[19px]">
                        {formatCurrency(+product.to_pay, "currency")}
                      </span>
                      <span className="font-inter font-semibold leading-[19px] text-[#00031A]">
                        {product.amount} {t("Pcs")}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <ul className="flex flex-col gap-[8px] mb-[24px]">
                <li className="flex justify-between items-center text-[#00031A] leading-[19px]">
                  <span>{t("Discount")}</span>
                  <span className="font-inter">
                    {formatCurrency(item.given_discount, "currency")}
                  </span>
                </li>
                <li className="flex justify-between items-center text-[#00031A] leading-[19px] ">
                  <span className="font-semibold">{t("ToPay")}</span>
                  <span className="font-inter font-semibold">
                    {formatCurrency(item.total_to_pay, "currency")}
                  </span>
                </li>
              </ul>
            </div>
          </li>
        ))}
        {!data?.data.length && (
          <Skeleton className="w-full h-[148px] rounded-[32px]" />
        )}
      </ul>
      <CommentModal locale={locale} open={open!} setOpen={setOpen} />
    </div>
  );
};

export default ProfileOrders;

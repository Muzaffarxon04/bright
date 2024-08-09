"use client";

import { useScrollFixed } from "@/lib/hooks/useScrollFixed";
import { cn } from "@/lib/utils/cn";
import { useTranslations } from "next-intl";
import MyButton from "../my-button/my-button";
import { useState } from "react";

type ConfirmModalProps<T> = {
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
  setState: (value: T) => void;
  state: number | boolean;
  type: "order" | "delete";
};

const ConfirmModal = <T,>({
  type,
  state,
  loading,
  setState,
  handleClick,
}: ConfirmModalProps<T>) => {
  useScrollFixed(state as unknown as boolean);
  const t = useTranslations("Common");

  return (
    <div
      className={cn(
        "fixed inset-0 bg-[#00000099] -z-10 flex items-center justify-center px-[20px] opacity-0 transition-transform duration-300 ease-in-out",
        null,
        {
          "opacity-100 z-30": state,
        }
      )}
    >
      <div
        style={{
          boxShadow:
            "0px 0px 2px rgba(0, 0, 40, 0.08), 0px 4px 120px rgba(0, 0, 40, 0.08)",
        }}
        className={cn(
          "bg-white rounded-[24px] py-[21px] md:px-[30px] px-[16px] w-full max-w-[477px] scale-0 transition-transform duration-300 ease-in-out flex flex-col justify-between",
          null,
          {
            "scale-100": state,
          }
        )}
      >
        <p className="md:mb-10 mb-5 font-semibold text-[20px] md:text-[24px] md:leading-[29px] text--[#000000] text-center">
          {type === "delete" ? t("SureDeleteAddress") : t("OrderConfirm")}
        </p>
        <div className="flex gap-[9px] justify-center">
          <MyButton
            type="button"
            style={{ boxShadow: "none" }}
            onClick={() => {
              setState(null as unknown as T);
            }}
            className={cn(
              "bg-accentColor text-[18px] rounded-[4px] text-white md:min-w-[155px] md:min-h-[48px]",
              {}
            )}
          >
            {t("Cancel")}
          </MyButton>
          <MyButton
            loading={loading}
            style={{ boxShadow: "none" }}
            type={type === "delete" ? "submit" : "button"}
            onClick={handleClick}
            className={cn(
              "bg-white text-[18px] border border-solid border-[#E6E9EA] rounded-[4px] text-textColor md:min-w-[155px] md:min-h-[48px] flex items-center justify-center",
              {
                "hover:border-accentColor": type === "order",
                "border-errorColor text-errorColor": type === "delete",
              }
            )}
          >
            {type === "delete" ? t("Delete") : t("Order")}
          </MyButton>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

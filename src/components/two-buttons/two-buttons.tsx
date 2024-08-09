import { cn } from "@/lib/utils/cn";
import { useFormikContext } from "formik";
import { useTranslations } from "next-intl";
import React from "react";
import MyButton from "../my-button/my-button";

type TwoButtonsProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
  textLeft?: string;
  textRight?: string;
  styleType: "modal" | "profile";
  wrapperClassName?: string;
  setCardValues?: (v: { cardNumber: ""; expDate: "" }) => void;
};

const TwoButtons = ({
  onClick,
  loading,
  textLeft,
  textRight,
  styleType,
  wrapperClassName,
  setCardValues,
}: TwoButtonsProps) => {
  const t = useTranslations("Common");
  const { resetForm } = useFormikContext();
  const addressId = new URLSearchParams(window.location.search).get(
    "address-id"
  );

  const btnStyles =
    "md:min-w-[155px] min-w-[130px] min-h-[48px] flex items-center justify-center rounded-[4px] text-[18px] leading-[1]";
  return (
    <div
      className={cn(
        "flex md:justify-end gap-[10px] sm:flex-row flex-col justify-center",
        wrapperClassName
      )}
    >
      {!addressId && (
        <MyButton
          onClick={
            styleType === "modal"
              ? onClick
              : () => {
                  resetForm();
                  setCardValues?.({ cardNumber: "", expDate: "" });
                }
          }
          style={{
            boxShadow: " 0px 1px 4px rgba(25, 33, 61, 0.08)",
          }}
          className={`${btnStyles}`}
        >
          {textLeft || t("Cancel")}
        </MyButton>
      )}
      <MyButton
        loading={loading}
        type="submit"
        className={`${btnStyles} bg-white text-textColor border border-solid border-[#E6E9EA] hover:border-accentColor transition-colors`}
      >
        {textRight || t("Save")}
      </MyButton>
    </div>
  );
};

export default TwoButtons;

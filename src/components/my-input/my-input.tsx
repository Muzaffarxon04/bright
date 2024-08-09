"use client";

import { cn } from "@/lib/utils/cn";
import {
  formatCardExpiryDate,
  formatCardNumber,
} from "@/lib/utils/commonFunctions";
import { useField, useFormikContext } from "formik";
import { useEffect, useRef, useState } from "react";
import PhoneInput from "react-phone-input-2";
import { Eye, EyeSlash } from "../svg/svg-list";
import Image from "next/image";

type MyInputProps = {
  icon?: React.ReactNode;
  type: "text" | "phone" | "password" | "file";
  name: string;
  label?: string;
  accept?: string;
  required?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  styleType?: "white" | "shadow" | "rounded";
  innerText?: string;
  maxLength?: number;
  inputMode?: "numeric";
  onlyDigits?: boolean;
  innerIcon?: React.ReactNode;
  cardSystem?: string;
  cardValues?: { cardNumber: string; expDate: string };
  placeholder?: string;
  enableSeePass?: boolean;
  setCardValues?: (value: { cardNumber: string; expDate: string }) => void;
  labelClassName?: string;
  inputClassName?: string;
  wrapperClassName?: string;
  enableValidateInputOnChange?: boolean;
};

const MyInput = ({
  icon,
  type = "text",
  name,
  label,
  accept,
  required = false,
  onChange,
  innerText,
  styleType,
  maxLength = 200,
  onlyDigits = false,
  innerIcon,
  inputMode,
  cardSystem,
  cardValues,
  placeholder,
  setCardValues,
  enableSeePass = false,
  inputClassName,
  labelClassName,
  wrapperClassName,
  enableValidateInputOnChange = false,
}: MyInputProps) => {
  const [field, { error }] = useField(name);
  const { setFieldValue, validateField } = useFormikContext();
  const [seePass, setSeePass] = useState(false);
  const fileInputRef = useRef<HTMLLabelElement>(null);
  // Add asterisk to the placeholder if required and styleType is white
  const placeholderText =
    required && styleType === "white" ? `${placeholder} *` : placeholder;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    if (name === "card_number") {
      value = formatCardNumber(value);
      setFieldValue(name, value);
      setCardValues?.({ cardNumber: value, expDate: cardValues?.expDate! });
    }

    if (name === "exp_date") {
      value = formatCardExpiryDate(value);
      setFieldValue(name, value);
      setCardValues?.({ expDate: value, cardNumber: cardValues?.cardNumber! });
    }

    if (onlyDigits && !/^\d*$/.test(value)) {
      return;
    }
    setFieldValue(name, value);
  };

  useEffect(() => {
    if (enableValidateInputOnChange && field.value) {
      validateField(name);
    }
  }, [field.value]);

  //For screen readers
  const handleKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>) => {
    if (e.key === "Enter" && type === "file" && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={cn("flex flex-col relative", wrapperClassName)}>
      <label
        onKeyDown={handleKeyDown}
        ref={fileInputRef}
        tabIndex={0}
        className={cn(
          "font-medium leading-[19px] opacity-[0.8] mb-[10px] flex justify-between items-start outline-accentColor",
          labelClassName,
          {
            "flex justify-between items-start w-full": error,
            "text-secondaryColor leading-[20px] font-semibold mb-[12px] opacity-100":
              styleType === "shadow",
            "text-[#131111]": styleType === "rounded",
          }
        )}
        htmlFor={name}
      >
        {innerIcon && innerIcon}
        {innerText && <span className="font-inter truncate">{innerText}</span>}
        <span>
          {label}
          {required && styleType !== "white" && (
            <span className="text-errorColor text-[24px] font-semibold">*</span>
          )}
        </span>
        <span className="text-errorColor text-[0.8rem] sm:inline hidden ml-1 text-end">
          {error}
        </span>
      </label>
      {styleType === "rounded" && (
        <span className="absolute left-4 top-[50px] md:left-5 md:top-[53px]">
          {icon}
        </span>
      )}
      {type === "password" && enableSeePass && (
        <button
          type="button"
          onClick={() => setSeePass((prev) => !prev)}
          className="absolute right-4 top-[50px] md:right-5 md:top-[53px] cursor-pointer"
        >
          {!seePass ? <Eye /> : <EyeSlash />}
        </button>
      )}
      {type === "phone" && (
        <PhoneInput
          specialLabel=""
          containerClass="w-full"
          country={"uz"}
          value={field.value}
          onChange={(value) => {
            setFieldValue(name, "+" + value);
          }}
          inputClass={cn(
            "py-[14px] px-[20px] bg-[#F9F9F9] rounded-[8px] leading-[19px] text-[#000000] outline-accentColor font-inter w-full placeholder:font-normal placeholder:opacity-40 placeholder:text-[#000000]",
            inputClassName,
            {
              "border border-solid border-[#DD2F2F] sm:mb-0 mb-1": error,
              "rounded-[6px] bg-white border border-solid border-[#F1F3F7] md:text-[20px] py-[18px] px-[16px] min-h-[47px] md:min-h-[50px]":
                styleType === "shadow",
            }
          )}
          inputStyle={{
            boxShadow:
              styleType === "shadow"
                ? "0px 1px 4px rgba(25, 33, 61, 0.08)"
                : "",
          }}
          placeholder={placeholderText}
          buttonStyle={{ display: "none" }}
        />
      )}
      {type !== "phone" && (
        <input
          {...field}
          onChange={(e) => (onChange ? onChange(e) : handleChange(e))}
          maxLength={maxLength}
          id={name}
          type={seePass ? "text" : type}
          name={name}
          accept={accept}
          style={{
            boxShadow:
              styleType === "shadow"
                ? "0px 1px 4px rgba(25, 33, 61, 0.08)"
                : "",
          }}
          className={cn(
            "py-[14px] px-[20px] bg-[#F9F9F9] rounded-[8px] leading-[19px] text-[#000000] outline-accentColor font-inter border border-solid border-transparent placeholder:font-normal placeholder:opacity-40 placeholder:text-[#000000] focus:outline-none",
            inputClassName,
            {
              "bg-white py-[12px] px-[16px] border-[0.5px] border-[#CECECE] placeholder:text-[14px] placeholder:leading-[16px] placeholder:text-[#979797] min-h-[48px] md:p-[16px] placeholder:opacity-100 placeholder:-tracking-[0.5%]":
                styleType === "white",
              "rounded-[6px] bg-white border border-solid border-[#F1F3F7] md:text-[20px] py-[18px] px-[16px] min-h-[48px]":
                styleType === "shadow",
              "py-[16px] pr-[16px] px-[50px] md:py-[20px] md:pr-[20px] md:px-[54px] md:h-[64px] bg-white border-[#E1E4ED] rounded-[20px] h-[56px] placeholder:text-[14px] placeholder:leading-[17px]  placeholder:text-[#848282] text-[20px]":
                styleType === "rounded",
              "border-[#DD2F2F] sm:mb-0 mb-1": error,
              "border-[#37A141]":
                enableValidateInputOnChange && !error && field.value,
            }
          )}
          placeholder={placeholderText}
          inputMode={inputMode}
        />
      )}
      <span className="text-errorColor text-[0.8rem] sm:hidden inline">
        {error}
      </span>
      {name === "card_number" && cardSystem && (
        <Image
          unoptimized
          className={cn("absolute right-2 top-[40%] h-[20px]", {
            "top-[25%] sm:top-[53%]": error,
          })}
          alt=""
          width={24}
          height={20}
          src={`/pay-cards/${cardSystem}.svg`}
        />
      )}
    </div>
  );
};

export default MyInput;

import { cn } from "@/lib/utils/cn";
import { useField } from "formik";
import React from "react";

type MyTextAreaProps = {
  name: string;
  label?: string;
  className?: string;
  placeholder: string;
  maxLength: number;
  styleType?: "shadow";
  labelClassName?: string;
  wrapperClassName?: string;
};

const MyTextArea = ({
  name,
  label,
  maxLength = 300,
  styleType,
  className,
  placeholder,
  labelClassName,
  wrapperClassName,
}: MyTextAreaProps) => {
  const [field, { error }] = useField(name);
  return (
    <div
      className={cn("flex items-start gap-[12px] flex-col", wrapperClassName)}
    >
      {label && (
        <label
          className={cn("", labelClassName, {
            "text-secondaryColor leading-[20px] font-semibold mb-[12px] opacity-100":
              styleType === "shadow",
          })}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <textarea
      {...field}
        id={name}
        name={name}
        style={{
          boxShadow:
            styleType === "shadow" ? "0px 1px 4px rgba(25, 33, 61, 0.08)" : "",
        }}
        maxLength={maxLength}
        placeholder={placeholder}
        className={cn(
          "p-[15px] rounded-[10px] border border-solid border-[#E1E4ED] bg-[#F5F6F8] w-full placeholder:leading-[25.6px] placeholder:font-medium max-h-[200px] min-h-[100px] outline-accentColor",
          className,
          {
            "rounded-[6px] bg-white border border-solid border-[#F1F3F7] md:text-[20px] py-[18px] px-[16px] min-h-[128px]":
              styleType === "shadow",
          }
        )}
      />
    </div>
  );
};

export default MyTextArea;

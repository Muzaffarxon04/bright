"use client";

import React from "react";
import { Link } from "../../../i18n.config";
import { cn } from "@/lib/utils/cn";
import Spinner from "../common/spinner";

type MyButtonProps = {
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  href?: string;
  type?: "button" | "submit";
  styleType?: "card" | "productInner" | "textStyle";
  props?: React.HTMLAttributes<HTMLButtonElement>;
  onClick?: React.MouseEventHandler<
    HTMLButtonElement | HTMLAnchorElement
  > | void;
  style?: React.CSSProperties;
};

const MyButton = ({
  href,
  type = "button",
  style,
  onClick,
  loading = false,
  disabled = false,
  children,
  styleType,
  className,
  ...props
}: MyButtonProps) => {
  const styles =
    "font-semibold text-[12px] leading-[18px] text-center text-white bg-accentColor py-[9px] min-w-[109px] rounded-[10px] hover:opacity-80 disabled:bg-neutral-400 disabled:hover:opacity-100 disabled:border-none disabled:hover:border-none flex items-center justify-center";

  if (href) {
    return (
      <Link
        onClick={onClick ? onClick : () => {}}
        style={{
          boxShadow: "0px 1px 4px rgba(25, 33, 61, 0.08)",
          ...style,
        }}
        className={cn(styles, className, {
          "rounded-[4px] min-w-[155px] min-h-[48px] py-0 text-[18px] flex items-center justify-center":
            styleType === "productInner",
          "inline-block text-accentColor text-[16px] leading-[19px] pb-[18.5px] border-b hover:border-accentColor border-transparent border-solid md:pb-[15.5px] md:text-[24px] md:leading-[28.18px] transition bg-transparent hover:opacity-100 rounded-none !shadow-none":
            styleType === "textStyle",
        })}
        href={href}
      >
        {children}
      </Link>
    );
  } else {
    return (
      <button
        disabled={loading || disabled}
        onClick={onClick ? onClick : () => {}}
        type={type}
        style={{
          boxShadow: "0px 1px 4px rgba(25, 33, 61, 0.08)",
          ...style,
        }}
        className={cn(styles, className, {
          "rounded-[4px] min-w-[155px] min-h-[48px] py-0 text-[18px] ":
            styleType === "productInner",
          "inline-block text-accentColor  text-[16px] leading-[19px] pb-[18.5px] border-b hover:border-accentColor border-transparent border-solid md:pb-[15.5px] md:text-[24px] md:leading-[28.18px] transition bg-transparent hover:opacity-100 rounded-none !shadow-none":
            styleType === "textStyle",
        })}
        {...props}
      >
        {loading ? <Spinner /> : children}
      </button>
    );
  }
};

export default MyButton;

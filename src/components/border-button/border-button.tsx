"use client";

import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils/cn";
import { Link } from "../../../i18n.config";

type BorderButtonProps = {
  wrapperClassName?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  href?: string;
};

const BorderButton = ({
  wrapperClassName,
  children,
  onClick,
  href,
}: BorderButtonProps) => {
  const childContent = (
    <>
      <span className="flex items-center w-full">
        <Image
          className="w-[49%] h-[1px] object-cover"
          unoptimized
          width={345}
          height={0.5}
          alt=""
          src={"/border.svg"}
        />
        <Image width={24} height={24} alt="Плюс" src={"/plus-custom.svg"} />
        <Image
          unoptimized
          className="rotate-180 w-[49%] h-[1px] object-cover"
          width={345}
          height={0.5}
          alt=""
          src={"/border.svg"}
        />
      </span>
      <span className="text-accentColor text-[14px] leading-[16px] tracking-[0.1px] mt-[8px]">
        {children}
      </span>
    </>
  );

  if (href)
    return (
      <Link
        className={cn(
          "flex items-center w-full flex-col mb-4",
          wrapperClassName
        )}
        href={href}
      >
        {childContent}
      </Link>
    );
  return (
    <button
      onClick={onClick ? onClick : () => {}}
      className={cn("flex items-center w-full flex-col mb-4", wrapperClassName)}
      type="button"
    >
      {childContent}
    </button>
  );
};

export default BorderButton;

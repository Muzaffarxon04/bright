"use client";

import React, { useRef, useState } from "react";
import { Locale, usePathname, useRouter } from "../../../i18n.config";
import Image from "next/image";
import { useClickOutside } from "@/lib/hooks/useClickOutside";
import { cn } from "@/lib/utils/cn";

const LangSwitcher = ({
  locale,
  type,
}: {
  locale: Locale;
  type: "default" | "auth";
}) => {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState(locale);
  const pathName = usePathname();
  const router = useRouter();
  const langRef = useRef<HTMLDivElement>(null);
  const langsList = ["uz", "en", "ru"];
  const reorderedLangsList = [
    locale,
    ...langsList.filter((item) => item !== lang),
  ];

  const handleOpenSelector = () => {
    setOpen((prev) => !prev);
  };

  //For screen readers
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      handleOpenSelector();
    }
  };

  const changeLocale = (locale: Locale) => {
    setLang(locale);
    router.replace(pathName, { locale: locale });
  };

  //For screen readers
  const handleLocaleKeyDown = (
    event: React.KeyboardEvent<HTMLLIElement>,
    locale: Locale
  ) => {
    if (event.key === "Enter") {
      changeLocale(locale);
    }
  };

  useClickOutside(langRef, setOpen);

  return (
    <div
      tabIndex={0}
      role="button"
      aria-pressed="false"
      onClick={handleOpenSelector}
      onKeyDown={handleKeyDown}
      style={{
        boxShadow: "0px 4px 4px rgba(0 0 0 0.1)",
      }}
      className="relative"
      ref={langRef}
    >
      <div className="cursor-pointer">
        <div className="flex items-center">
          <Image src={"/globe.svg"} width={28} height={28} alt="globe" />
        </div>
        <ul
          className={cn(
            "absolute left-[24px] top-[20px] transition-all ease-in-out bg-bgColor flex flex-col gap-[6px]  rounded-[8px] lg:text-[18px] lg:leading-[140%] text-md overflow-hidden",
            null,
            {
              "h-auto max-h-[109px] px-[17px] py-[6px]": open,
              "max-h-0 px-[0px] py-[0px]": !open,
              "-left-[48px] top-[30px] ": type === "auth",
            }
          )}
        >
          {reorderedLangsList.map((item, index) => (
            <li
              role="menuitem"
              tabIndex={0}
              className={cn("uppercase pb-[5px]  font-medium", null, {
                "font-bold text-accentColor border-b border-solid border-accentColor":
                  locale === item,
              })}
              onClick={() => changeLocale(item as Locale)}
              onKeyDown={(event) => handleLocaleKeyDown(event, item as Locale)}
              key={index}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LangSwitcher;

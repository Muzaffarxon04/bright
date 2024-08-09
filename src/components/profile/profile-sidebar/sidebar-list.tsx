"use client";

import {
  Card,
  Cart,
  DeleteAccount,
  Home,
  LogOut,
} from "@/components/svg/svg-list";
import { cn } from "@/lib/utils/cn";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "../../../../i18n.config";
import { isActiveLink } from "@/lib/utils/commonFunctions";

const SidebarList = () => {
  const t = useTranslations("Profile.ProfileSidebar");
  const c = useTranslations("Profile");
  const pathname = usePathname();
  const keys = ["One", "Two", "Three"];

  const iconsHandler = (activeLink: string) => {
    return [
      <Home
        key="home-icon"
        strokeWidth={isActiveLink(activeLink, pathname) ? 1.5 : 1}
        className=""
      />,
      <Card
        key="card-icon"
        strokeWidth={isActiveLink(activeLink, pathname) ? 1.5 : 1}
        className=""
      />,
      <Cart
        key="cart-icon"
        strokeWidth={isActiveLink(activeLink, pathname) ? 1.5 : 1}
        width="24"
        height="24"
      />,
    ];
  };

  return (
    <ul className="flex flex-col">
      {keys.map((item, index) => (
        <li
          key={index}
          className={cn("flex justify-between mb-[8px] transition-all", null, {
            "mb-[16px] pb-[16px] border-b border-solid border-[#33333326]":
              index === keys.length - 1,
            "bg-[#FFF0E0] rounded-[8px] py-[20px] font-semibold": isActiveLink(
              t(`${item}.Link`),
              pathname
            ),
          })}
        >
          <Link
            className="w-full flex gap-[8px] items-center leading-[19px] hover:text-accentColor transition-colors py-[8px] px-[10px] md:px-[24px]"
            href={t(`${item}.Link`)}
          >
            {iconsHandler(t(`${item}.Link`))[index]}
            <span className="">{t(`${item}.Name`)}</span>
          </Link>
        </li>
      ))}
      <li className="leading-[19px] hover:text-accentColor transition-colors  mb-[8px] py-[8px] px-[10px] md:px-[24px]">
        <button className="flex gap-[8px] items-center">
          <LogOut />

          <span className="text-[#FF4F4F]">{c(`LeaveAcc`)}</span>
        </button>
      </li>
      <li className="leading-[19px]  mb-[8px] py-[8px] px-[10px] md:px-[24px]">
        <button className="flex gap-[8px] items-center">
          <DeleteAccount />
          <span className="text-[#FF4F4F]">{c(`DeleteAcc`)}</span>
        </button>
      </li>
    </ul>
  );
};

export default SidebarList;

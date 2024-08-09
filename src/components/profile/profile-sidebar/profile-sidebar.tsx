import React from "react";
import { Link, Locale } from "../../../../i18n.config";
import { getTranslations } from "next-intl/server";
import { Pen } from "../../svg/svg-list";
import SidebarList from "./sidebar-list";
import { cn } from "@/lib/utils/cn";

const ProfileSidebar = async ({
  type,
}: {
  type: "largerScreen" | "smallerScreen";
}) => {
  const t = await getTranslations("Profile");

  return (
    <div
      className={cn(
        "w-[50vw] lg:w-[30vw] md:h-[552px] sticky bg-white left-0 px-[20px] md:rounded-b-[20px] md:flex flex-col md:pt-0 pt-[40px] md:shadow-[0px_2px_4px_#00000014] shadow-none mb-auto md:mb-[164px] hidden",
        {
          "flex md:hidden w-[100vw]": type === "smallerScreen",
        }
      )}
    >
      <p className="md:hidden font-semibold text-[#000000] text-[29px] leading-[32px]">
        {t("Profile")}
      </p>
      <Link
        className="w-full py-[8px] px-[16px] bg-accentColor rounded-[8px] mt-[20px] md:mt-[41px] mb-[16px] flex justify-between items-center "
        href={"/profile"}
      >
        <div className="flex flex-col gap-[6px] text-white ">
          <span className="leading-[1] font-semibold break-all">
            Guy Hawkins
          </span>
          <span className="leading-[1] break-all">guyhawkins@gmail.com</span>
        </div>
        <div className="text-white">
          <Pen />
        </div>
      </Link>
      <SidebarList />
    </div>
  );
};

export default ProfileSidebar;

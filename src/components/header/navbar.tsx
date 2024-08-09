"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "../../../i18n.config";
import { cn } from "@/lib/utils/cn";
import { isActiveLink } from "@/lib/utils/commonFunctions";

const Navbar = () => {
  const n = useTranslations("Header.Nav");
  const keysNav = ["Home", "Products", "AboutUs", "ContactUs"] as const;
  const pathName = usePathname();

  return (
    <nav className="flex justify-center items-center text-center md:mb-0 mb-[60px]">
      <ul className="flex lg:gap-[60px] gap-[30px] flex-col md:flex-row">
        {keysNav.map((item, index) => (
          <li key={index}>
            <Link
              className={cn(
                "hover:border-b border-accentColor border-solid transition lg:leading-[28.18px] lg:text-[24px] text-[20px] leading-[23px] pb-[10px]",
                null,
                {
                  "text-accentColor border-b border-accentColor border-solid font-bold":
                    isActiveLink(n(`${item}.link`), pathName),
                }
              )}
              href={n(`${item}.link`)}
            >
              {n(`${item}.name`)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;

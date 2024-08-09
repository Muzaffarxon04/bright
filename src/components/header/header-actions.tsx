"use client";

import { cn } from "@/lib/utils/cn";
import { Link, Locale, usePathname } from "../../../i18n.config";
import { Cart, Profile } from "../svg/svg-list";
import LangSwitcher from "./lang-switcher";
import { isActiveLink } from "@/lib/utils/commonFunctions";
import { useScreenSize } from "@/lib/hooks/useScreenSize";

const HeaderActions = ({ locale }: { locale: Locale }) => {
  const pathName = usePathname();
  const screen = useScreenSize();

  return (
    <div className="items-center gap-[20px] flex md:justify-normal justify-center">
      <Link
        className={cn("hover:text-accentColor transition-colors", null, {
          "text-accentColor": isActiveLink("/profile", pathName),
        })}
        href={screen.width >= 768 ? "/profile" : "/profile/mobile"}
      >
        <Profile width="28" height="28" />
      </Link>
      <Link
        className={cn("hover:text-accentColor transition-colors", null, {
          "text-accentColor": isActiveLink("/cart", pathName),
        })}
        href={"/cart"}
      >
        <Cart width="28" height="28" />
      </Link>
      <LangSwitcher type="default" locale={locale} />
    </div>
  );
};

export default HeaderActions;

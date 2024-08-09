"use client";

import Image from "next/image";
import HeaderActions from "./header-actions";
import Navbar from "./navbar";
import { Link, Locale } from "../../../i18n.config";
import BurgerMenu from "./burger-menu";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

const Header = ({ locale }: { locale: Locale }) => {
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "md:py-[24px] md:border-b border-none border-[#E5E5E5] md:border-solid sticky top-0 w-full bg-white z-30 md:shadow-[0px_4px_20px_0px_#0000000F] shadow-none mt-[16px] md:mt-0",
        { hidden: pathname.includes("auth") }
      )}
    >
      <div className="my-container flex justify-between items-center">
        <Link href={"/"}>
          <Image
            className="lg:w-[84px] lg:h-[76px] w-[45px] h-[41px] relative z-20"
            priority
            alt="Logo"
            width={84}
            height={76}
            src={"/logo.svg"}
          />
        </Link>
        <div className="md:block hidden">
          <Navbar />
        </div>
        <div className="md:block hidden">
          <HeaderActions locale={locale} />
        </div>
        {/*BurgerMenu visible within mobile screen sizes (640px) */}
        <BurgerMenu locale={locale} />
      </div>
    </header>
  );
};

export default Header;

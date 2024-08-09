"use client";

import { useScrollFixed } from "@/lib/hooks/useScrollFixed";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Locale, usePathname } from "../../../i18n.config";
import FooterContent from "../footer/footer-content";
import HeaderActions from "./header-actions";
import Navbar from "./navbar";

const BurgerMenu = ({ locale }: { locale: Locale }) => {
  const [open, setOpen] = useState(false);
  const pathName = usePathname();
  useScrollFixed(open);

  useEffect(() => {
    if (open) {
      setOpen(false);
    }
  }, [pathName]);

  return (
    <div className="block md:hidden">
      <button type="button" onClick={() => setOpen(true)}>
        <Image
          className="lg:w-[84px] lg:h-[76px] w-[45px] h-[41px]"
          priority
          alt="Logo"
          width={24}
          height={24}
          src={"/burger.svg"}
        />
      </button>

      <div className={`${open ? "fixed inset-0 z-10 h-[100vh]" : ""}`}>
        <div
          className={`transition-transform duration-500 bg-white w-[100vw] h-full fixed right-0 top-0 p-[16px] flex flex-col justify-between shadow-xl ${
            open ? "-translate-x-0" : "translate-x-full"
          }`}
        >
          <div>
            <div className="flex justify-end mb-[107px]">
              <button type="button" onClick={() => setOpen(false)}>
                <Image
                  priority
                  alt="Close"
                  width={24}
                  height={24}
                  src={"/close.svg"}
                />
              </button>
            </div>
            <Navbar />
            <HeaderActions locale={locale} />
          </div>
          <FooterContent />
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;

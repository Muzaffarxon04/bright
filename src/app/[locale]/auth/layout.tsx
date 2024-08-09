import LangSwitcher from "@/components/header/lang-switcher";
import Image from "next/image";
import React from "react";
import { Locale } from "../../../../i18n.config";

const AuthLayout = ({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) => {
  return (
    <div>
      <div className="mt-[24px] md:mt-[30px]  flex w-full max-w-[1200px] px-[20px] mx-auto justify-between items-center">
        <Image
          src={"/logo.svg"}
          width={73}
          height={66}
          alt="Логотип компании Bright gallery"
        />
        <LangSwitcher type="auth" locale={locale} />
      </div>
      <div className="max-w-[950px] px-[20px] mx-auto">{children}</div>
    </div>
  );
};

export default AuthLayout;

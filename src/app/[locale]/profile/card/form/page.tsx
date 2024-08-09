import CardForm from "@/components/card-form/card-form";
import { getTranslations } from "next-intl/server";
import React from "react";
import { Locale } from "../../../../../../i18n.config";

const ProfileCardForm = async ({
  params: { locale },
}: {
  params: { locale: Locale };
}) => {
  const t = await getTranslations("Common");
  return (
    <div className="mt-[32px] px-[20px] md:mt-[41px] md:pl-[45px] max-w-[968px] w-full">
      <p className="text-[#000000] font-semibold text-[20px] leading-[24px] mb-[16px] md:mb-[20px]">
        {t("AddNewCard")}
      </p>
      <CardForm locale={locale} styleType="profile" />
    </div>
  );
};

export default ProfileCardForm;

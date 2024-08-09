import { getTranslations } from "next-intl/server";
import Image from "next/image";
import React from "react";
import { Locale } from "../../../i18n.config";

const Requisites = async ({ locale }: { locale: Locale }) => {
  const t = await getTranslations("Contacts.Requisites");
  const keys = ["ROne", "RTwo", "RThree"];

  const findLink = (item: string) => {
    if (t(`${item}.type`) === "phoneType") {
      return `tel:${t(`${item}.value`)}`;
    } else if (t(`${item}.type`) === "emailType") {
      return `mailto:${t(`${item}.value`)}`;
    } else if (t(`${item}.type`) === "addressType") {
      const coordinates = [69.250973, 41.317245];
      return `https://yandex.com/maps/?ll=${coordinates[0]},${coordinates[1]}&z=16&pt=${coordinates[0]},${coordinates[1]},pm2rdl&lang=${locale}`;
    }
  };

  // flex flex-wrap justify-between gap-[60px] lg:gap-[100px]

  return (
    <ul className="flex justify-center gap-[60px] lg:gap-[100px] flex-wrap flex-col lg:flex-row">
      {keys.map((item, index) => (
        <li
          key={index}
          className="flex flex-col gap-[15px] lg:items-start items-center"
        >
          <span className="text-secondaryColor leading-[25px] text-[18px] font-medium">
            {t(`${item}.name`)}
          </span>
          <a
            target="_blank"
            href={findLink(item)}
            className="font-inter text-[#22282B] leading-[25px] text-[18px] font-medium hover:text-accentColor transition-colors sm:w-[240px] lg:text-left text-center"
          >
            {t(`${item}.value`)}
          </a>
        </li>
      ))}
      <li className="flex flex-col gap-[15px] items-center">
        <span className="text-secondaryColor leading-[25px] text-[18px] font-medium">
          {t(`RFour.name`)}
        </span>
        <div className="flex justify-center gap-[30px] w-full">
          <a target="_blank" href="https://t.me/brightgallery_uz">
            <Image
              className="min-w-[26px] min-h-[26px]"
              width={26}
              height={26}
              src={t(`RFour.value.One`)}
              alt="Телеграм"
            />
          </a>
          <a target="_blank" href="https://www.instagram.com/reel/C8w_j-Wod5C/">
            <Image
              width={26}
              height={26}
              src={t(`RFour.value.Two`)}
              alt="Инстаграм"
            />
          </a>
        </div>
      </li>
    </ul>
  );
};

export default Requisites;

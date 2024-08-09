"use client";

import { useScreenSize } from "@/lib/hooks/useScreenSize";
import { cn } from "@/lib/utils/cn";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { SwiperOptions } from "swiper/types";
import BorderButton from "../border-button/border-button";
import MySwiper from "../my-swiper/my-swiper";
import PaymentCard from "../payment-card/payment-card";
import { PaymentCardType } from "@/lib/types/api-types";
import { getAllPaymentCards } from "@/services/paymentCardsApi";
import { Locale } from "../../../i18n.config";
import { CardIdType } from "../profile/profile-card";
import Skeleton from "../common/skeleton";

type CardListProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  cardId: CardIdType;
  setCardId: (value: CardIdType) => void;
  buttonClassName?: string;
  wrapperClassName?: string;
  styleType: "modal" | "profile";
  locale: Locale;
};

const CardList = ({
  cardId,
  locale,
  setCardId,
  onClick,
  styleType,
  buttonClassName,
  wrapperClassName,
}: CardListProps) => {
  const c = useTranslations("Common");
  const [data, setData] = useState<{ data: PaymentCardType[] | null }>();

  useEffect(() => {
    setCardId({
      forSelect: data?.data?.[0].id || null,
      forDelete: cardId?.forDelete,
    });
  }, []);

  const mockData = {
    data: [
      {
        id: 1,
        card_number: 4085457841219530,
        system: "humo",
      },
      {
        id: 2,
        card_number: 8600457841219530,
        system: "uzcard",
      },
      {
        id: 3,
        card_number: 8600457841218758,
        system: "uzcard",
      },
    ],
  };

  const screenWidth = useScreenSize();

  const params: SwiperOptions = {
    slidesPerView: screenWidth.width >= 768 ? "auto" : 1,
    spaceBetween: screenWidth.width >= 768 ? 40 : 10,
    slideClass: "order_swiper-slide",
  };

  useEffect(() => {
    const getCards = async () => {
      const data: { data: PaymentCardType[] } = await getAllPaymentCards(
        locale
      );
      setData(data);
    };
    getCards();
  }, [cardId?.forDelete]);

  return (
    <>
      <div
        className={cn(
          "md:mt-[20px] mt-[16px] mb-[20px] md:mb-[20px]",
          wrapperClassName
        )}
      >
        <MySwiper params={params}>
          {data?.data?.map((card, index) => (
            <swiper-slide
              class={cn("w-full max-w-[337px] md:max-w-[337px]", null, {
                "max-w-[305px]": styleType === "modal",
              })}
              key={index}
            >
              <PaymentCard
                type="selection"
                styleType={styleType}
                card={card}
                cardId={cardId}
                setCardId={setCardId}
              />
            </swiper-slide>
          ))}
          {!data?.data?.length && (
            <Skeleton
              className={cn(
                "w-full max-w-[337px] md:max-w-[337px] h-[188px] md:h-[188px] rounded-[15px]",
                null,
                {
                  "max-w-[305px]": styleType === "modal",
                }
              )}
            />
          )}
        </MySwiper>
      </div>
      <BorderButton
        href={styleType === "profile" ? "card/form" : ""}
        onClick={onClick}
        wrapperClassName="md:mb-[32px] mb-[92px]"
      >
        {c("AddNewCard")}
      </BorderButton>
    </>
  );
};

export default CardList;

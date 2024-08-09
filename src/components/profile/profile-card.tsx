"use client";

import React, { useState, useTransition } from "react";
import CardList from "../card-list/card-list";
import { useTranslations } from "use-intl";
import { Locale } from "../../../i18n.config";
import { deletePaymentCard } from "@/services/paymentCardsApi";
import { ResponseType } from "@/lib/types/api-types";
import toast from "react-hot-toast";
import ConfirmModal from "../confirm-modal/confirm-modal";

export type CardIdType = { forDelete: null | number; forSelect: null | number };

const ProfileCard = ({ locale }: { locale: Locale }) => {
  const t = useTranslations("Common");
  const [cardId, setCardId] = useState<CardIdType>({
    forDelete: null,
    forSelect: null,
  });

  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    setLoading(true);
    const data: ResponseType | string = await deletePaymentCard(
      cardId.forDelete!,
      locale
    );
    if (typeof data !== "string" && data?.status_code === 200) {
      toast.success(t("SuccessDeleted"));
      setLoading(false);
      setCardId({ forSelect: cardId.forSelect, forDelete: null });
    } else {
      toast.error(data as string);
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <span className="text-[#000000] text-[20px] font-semibold leading-[24px] md:text-[28px] md:leading-[1] tracking-[0.03rem]">
        {t("ChoosePayment")}
      </span>
      <CardList
        locale={locale}
        wrapperClassName="mt-[16px] mb-[24px] md:mt-[20px] md:mb-[39px]"
        styleType="profile"
        cardId={cardId}
        setCardId={setCardId}
        onClick={() => {}}
      />
      {/* This modal renders when delete button (trash icon) hit by user */}
      <ConfirmModal
        loading={loading}
        handleClick={handleClick}
        type="delete"
        state={cardId?.forDelete!}
        setState={setCardId}
      />
    </div>
  );
};

export default ProfileCard;

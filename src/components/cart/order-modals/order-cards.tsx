import CardForm from "@/components/card-form/card-form";
import CardList from "@/components/card-list/card-list";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { StepType } from ".";
import { Locale } from "../../../../i18n.config";
import { CardIdType } from "@/components/profile/profile-card";

type OrderCardsProps = {
  locale: Locale;
  setStep: (value: StepType) => void;
  step: StepType;
  cardId: CardIdType | null;
  setCardId: (value: CardIdType | null) => void;
};

const OrderCards = ({
  setStep,
  step,
  locale,
  cardId,
  setCardId,
}: OrderCardsProps) => {
  const t = useTranslations("Order");

  return (
    <div className="">
      {step.card === "select" && (
        <>
          <span className="text-[#000000] text-[20px] font-semibold leading-[24px]">
            {t("ChoosePayment")}
          </span>
          <CardList
            locale={locale}
            styleType="modal"
            cardId={cardId!}
            setCardId={setCardId}
            onClick={() =>
              setStep({
                location: step.location,
                card: "add",
                view: step.view,
              })
            }
          />
        </>
      )}

      {step.card === "add" && (
        <div className="md:mb-[32px] mb-[16px]">
          <CardForm
            locale={locale}
            styleType="modal"
            step={step}
            setStep={setStep}
          />
        </div>
      )}
    </div>
  );
};

export default OrderCards;

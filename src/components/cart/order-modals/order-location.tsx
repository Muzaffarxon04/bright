"use client";

import LocationList from "@/components/location-list/location-list";
import UseCart from "@/lib/hooks/useCart";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { StepType } from ".";
import LocationDetailsContent from "./location-details-content";
import { Locale } from "../../../../i18n.config";

type OrderLocationProps = {
  locale: Locale;
  setStep: (value: StepType) => void;
  step: StepType;
  location: number | null;
  setLocation: (value: number | null) => void;
};

const OrderLocation = ({
  setStep,
  step,
  locale,
  location,
  setLocation,
}: OrderLocationProps) => {
  const t = useTranslations("Order");
  const c = useTranslations("Common");
  const { cart } = UseCart();

  return (
    <div className="mb-[43px] md:mb-[35px]">
      {step.location === "select" && (
        <>
          <span className="text-[#000000] text-[20px] font-semibold leading-[24px]">
            {t("ChooseOrderLocation")}
          </span>
          <LocationList
            locale={locale}
            styleType="modal"
            buttonClassName="md:mb-[32px] mb-[92px]"
            onClick={() =>
              setStep({
                location: "add",
                card: step.card,
                view: step.view,
              })
            }
            location={location!}
            setLocation={setLocation}
          />
        </>
      )}

      {step.location === "add" && (
        <LocationDetailsContent locale={locale} step={step} setStep={setStep} />
      )}
    </div>
  );
};

export default OrderLocation;

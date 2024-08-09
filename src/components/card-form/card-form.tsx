"use client";

import { PaymentCardType, ResponseType } from "@/lib/types/api-types";
import { cn } from "@/lib/utils/cn";
import {
  identifyCardSystem,
  validateInputLocale,
} from "@/lib/utils/commonFunctions";
import { addPaymentCard } from "@/services/paymentCardsApi";
import { FormikHelpers } from "formik";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as yup from "yup";
import { Locale, useRouter } from "../../../i18n.config";
import { StepType } from "../cart/order-modals";
import MyFormik from "../my-formik/my-formik";
import MyInput from "../my-input/my-input";
import PaymentCard from "../payment-card/payment-card";
import TwoButtons from "../two-buttons/two-buttons";

const CardForm = ({
  styleType,
  setStep,
  locale,
  step,
}: {
  styleType?: "modal" | "profile";
  setStep?: (value: StepType) => void;
  step?: StepType;
  locale: Locale;
}) => {
  const t = useTranslations("Order");
  const c = useTranslations("Common");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [cardSystem, setCardSystem] = useState<string | null>(null);
  const [cardValues, setCardValues] = useState({
    cardNumber: "",
    expDate: "",
  });

  console.log(cardValues);

  const initialValues = {
    card_number: "",
    // card_name: "",
    exp_date: "",
    cvv: "",
  };

  const validationSchema = yup.object({
    // card_name: yup.string(),
    card_number: yup
      .string()
      .required(c("FieldRequired"))
      .min(19, validateInputLocale(16, locale)),
    exp_date: yup
      .string()
      .required(c("FieldRequired"))
      .min(5, validateInputLocale(4, locale)),
    cvv:
      cardSystem && cardSystem !== "uzcard" && cardSystem !== "humo"
        ? yup
            .string()
            .required(c("FieldRequired"))
            .min(3, validateInputLocale(3, locale))
        : yup.string(),
  });

  useEffect(() => {
    if (cardValues.cardNumber) {
      const system = identifyCardSystem(cardValues.cardNumber);
      setCardSystem(system);
    } else if (!cardValues.cardNumber) {
      setCardSystem(null);
    }
  }, [cardValues.cardNumber]);

  const handleSubmit = async (
    values: typeof initialValues,
    helpers: FormikHelpers<typeof values>
  ) => {
    setLoading(true);
    const { cvv, exp_date, ...restValues } = values;

    const expire_month = exp_date.split("/")[0];
    const expire_year = exp_date.split("/")[1];

    let body: PaymentCardType = {
      expire_month,
      expire_year,
      is_visa: false,
      ...restValues,
    };

    if (cardSystem && cardSystem !== "uzcard" && cardSystem !== "humo") {
      body = { cvv, ...body };
      body.is_visa = true;
    }
    const data: ResponseType | string = await addPaymentCard(body, locale);
    if (typeof data !== "string" && data.status_code === 201) {
      toast.success(c("SuccessCard"));
      helpers.resetForm();
      setLoading(false);
      if (styleType === "modal") {
        setStep?.({ location: step?.location!, card: "select", view: "one" });
      } else {
        router.push("/profile/card");
      }
    } else {
      toast.error(data as string);
      setLoading(false);
    }
  };

  return (
    <div
      className={cn("", null, {
        "md:flex gap-[35px] items-start": styleType === "profile",
        "justify-between flex-wrap": styleType === "profile",
      })}
    >
      {styleType === "modal" && (
        <p className="text-[#000000] font-semibold text-[20px] leading-[24px] mb-[16px] md:mb-[20px]">
          {t("AddPaymentCard")}
        </p>
      )}
      {styleType === "profile" && (
        <PaymentCard
          cardValues={cardValues}
          type="filling"
          styleType="profile"
        />
      )}
      <MyFormik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <div
          className={cn(
            "grid grid-cols-1 gap-[16px] md:grid-cols-2 md:gap-x-[53px] md:gap-y-[32px] mb-[32px] md:mb-[20px] items-end",
            null,
            {
              "w-full md:max-w-[512px] md:gap-[16px] mb-[16px] md:mb-[40px]":
                styleType === "profile",
            }
          )}
        >
          <MyInput
            wrapperClassName={cn("", {
              "md:col-span-2": styleType === "profile",
            })}
            required
            styleType="white"
            name="card_name"
            placeholder={t("CardName")}
            type="text"
          />
          <MyInput
            inputMode="numeric"
            cardSystem={cardSystem!}
            cardValues={cardValues}
            setCardValues={setCardValues}
            onlyDigits={true}
            maxLength={19}
            wrapperClassName={cn("", {
              "md:col-span-2": styleType === "profile",
            })}
            required
            styleType="white"
            name="card_number"
            placeholder={t("CardNumber")}
            type="text"
          />
          <MyInput
            inputMode="numeric"
            cardValues={cardValues}
            setCardValues={setCardValues}
            required
            styleType="white"
            name="exp_date"
            placeholder={`${t("ExpDate")} 05/25`}
            type="text"
          />
          {cardSystem && cardSystem !== "uzcard" && cardSystem !== "humo" && (
            <MyInput
              inputMode="numeric"
              onlyDigits
              maxLength={3}
              styleType="white"
              name="cvv"
              placeholder={"CVV"}
              type="text"
            />
          )}
        </div>
        <TwoButtons
          setCardValues={setCardValues}
          loading={loading}
          styleType={setStep ? "modal" : "profile"}
          onClick={() => {
            setStep?.({
              card: "select",
              location: step?.location!,
              view: step?.view!,
            });
          }}
          textLeft={styleType === "modal" ? c("Cancel") : c("Delete")}
          textRight={c("Save")}
        />
      </MyFormik>
    </div>
  );
};

export default CardForm;

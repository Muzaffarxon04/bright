"use client";

import { useScrollFixed } from "@/lib/hooks/useScrollFixed";
import { cn } from "@/lib/utils/cn";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import MyButton from "../../my-button/my-button";
import OrderLocation from "./order-location";
import OrderSuccess from "./order-success";
import OrderCards from "./order-cards";
import { Locale } from "../../../../i18n.config";
import ConfirmModal from "@/components/confirm-modal/confirm-modal";
import { CardIdType } from "@/components/profile/profile-card";
import UseCart from "@/lib/hooks/useCart";
import { makeOrder } from "@/services/ordersApi";
import { OrderType, ResponseType } from "@/lib/types/api-types";
import toast from "react-hot-toast";
import { parseCurrency } from "@/lib/utils/commonFunctions";

export type StepType = {
  location: "select" | "add";
  card: "select" | "add";
  view: "one" | "final" | "confirmation";
};

const OrderModal = ({ locale }: { locale: Locale }) => {
  const t = useTranslations("Cart");
  const o = useTranslations("Order");
  const c = useTranslations("Common");
  const [step, setStep] = useState<StepType | null>(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<null | number>(null);
  const [cardId, setCardId] = useState<CardIdType | null>(null);
  const { cart, discountTotal, totalPrice, subTotalPrice } = UseCart();
  useScrollFixed(!!step);

  const products = cart.map((product) => {
    return {
      id: product.id,
      amount: product.qty,
    };
  });

  const handleClick = () => {
    setStep({ location: "select", card: "select", view: "one" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body: OrderType = {
      user_credit_card: {
        id: cardId?.forSelect!,
      },
      user_location: {
        id: location!,
      },
      total_to_pay: parseCurrency(totalPrice),
      total_price: parseCurrency(subTotalPrice),
      given_discount: parseCurrency(discountTotal),
      product: products,
    };
    const data: ResponseType | string = await makeOrder(body, locale);

    if (typeof data !== "string" && data?.status_code === 201) {
      // toast.success(c("SuccessLocationUpdate"));
      setStep((prev) =>
        prev
          ? { ...prev, view: "final" }
          : { location: "select", card: "select", view: "final" }
      );
    } else {
      toast.error(data as string);
    }
  };

  return (
    <div>
      <MyButton
        onClick={() =>
          setStep({ location: "select", card: "select", view: "confirmation" })
        }
        className="rounded-[6px] w-full text-[16px] leading-[24px] font-medium min-h-[56px]"
      >
        {t("Pay")}
      </MyButton>
      {step?.view === "confirmation" && (
        <ConfirmModal
          handleClick={handleClick}
          setState={setStep}
          state={!!step}
          type="order"
        />
      )}
      {step?.view !== "confirmation" && (
        <div
          className={cn(
            "fixed inset-0 bg-[#00000099] -z-10 flex items-center justify-center px-[20px] opacity-0 transition-transform duration-300 ease-in-out",
            null,
            {
              "opacity-100 z-30": step,
            }
          )}
        >
          <div
            style={{
              boxShadow:
                "0px 0px 2px rgba(0, 0, 40, 0.08), 0px 4px 120px rgba(0, 0, 40, 0.08)",
            }}
            className={cn(
              "bg-white rounded-[24px] py-[21px] md:px-[30px] px-[16px] w-full max-w-[794px] scale-0 transition-transform duration-300 ease-in-out",
              null,
              {
                "scale-100": step,
                "px-[16px] py-[20px] flex items-center justify-center flex-col":
                  step?.view === "final",
              }
            )}
          >
            {step?.view !== "final" && (
              <div className="flex justify-between items-center mb-[20px]">
                <span className="invisible">1</span>
                <span className="font-semibold text-[24px] text-[#000000] leading-[29px]">
                  {o("OrderDetails")}
                </span>
                <button type="button" onClick={() => setStep(null)}>
                  <Image
                    width={32}
                    height={32}
                    alt="Закрыть"
                    src={"/close.svg"}
                  />
                </button>
              </div>
            )}
            {step?.view === "one" && (
              <div className="overflow-y-auto max-h-[70vh] md:max-h-[70vh] w-full md:px-4 px-6">
                <OrderLocation
                  location={location}
                  setLocation={setLocation}
                  locale={locale}
                  step={step}
                  setStep={setStep}
                />
                <OrderCards
                  cardId={cardId}
                  setCardId={setCardId}
                  locale={locale}
                  setStep={setStep}
                  step={step}
                />
              </div>
            )}

            {step?.view === "final" && <OrderSuccess />}
            <form
              className="w-full flex justify-center"
              onSubmit={handleSubmit}
            >
              <MyButton
                type="submit"
                href={step?.view === "final" ? "/" : ""}
                loading={loading}
                className={cn(
                  "min-h-[56px] rounded-[6px] w-full text-[16px] leading-[24px] mt-auto",
                  null,
                  {
                    "mt-[15px]": step?.card === "select",
                    "max-w-[452px] flex items-center justify-center":
                      step?.view === "final",
                  }
                )}
              >
                {step?.view !== "final" ? o("MakeOrder") : c("BackToMain")}
              </MyButton>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderModal;

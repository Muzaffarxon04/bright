import { PaymentCardType } from "@/lib/types/api-types";
import { cn } from "@/lib/utils/cn";
import { formatCardNumber } from "@/lib/utils/commonFunctions";
import Image from "next/image";
import { CardIdType } from "../profile/profile-card";

type PaymentCardProps = {
  card?: PaymentCardType;
  cardId?: CardIdType;
  styleType: "modal" | "profile";
  type: "selection" | "filling";
  setCardId?: (value: CardIdType) => void;
  cardValues?: {
    cardNumber: string;
    expDate: string;
  };
};

const PaymentCard = ({
  type,
  card,
  setCardId,
  cardId,
  styleType,
  cardValues,
}: PaymentCardProps) => {
  return (
    <div
      onClick={
        type === "selection"
          ? () =>
              setCardId?.({
                forSelect: card?.id!,
                forDelete: cardId?.forDelete!,
              })
          : () => {}
      }
      className={cn(
        "bg-accentColor rounded-[15px] pt-[21px] md:pt-[23px] pb-[17px] md:pb-[25px] pl-[20px] md:pl-[22px] pr-[14px] md:pr-[16px] relative overflow-hidden z-10 h-[188px]  md:h-[188px] border-[3px] border-solid border-transparent transition-all cursor-pointer hover:shadow-lg group ",
        null,
        {
          "border-[#4B4646]": cardId?.forSelect === card?.id,
          "h-[169px] md:h-[188px]": styleType === "modal",
          "w-[337px] h-[190px] hidden md:block border-none cursor-default select-none":
            type === "filling",
        }
      )}
    >
      <div className="flex items-center gap-[5px] mb-[45px] md:[52px]">
        <Image
          unoptimized
          width={20}
          height={20}
          alt="Чип карты"
          src={"/card-chip.svg"}
        />
        <Image
          unoptimized
          width={24}
          height={24}
          alt="Беспрводной"
          src={"/wireless.svg"}
        />
      </div>
      <div className="font-semibold text-[17px] leading-[24px] text-white font-inter mb-[23px]">
        {type === "selection"
          ? formatCardNumber(String(card?.card_number))
          : formatCardNumber(String(cardValues?.cardNumber))}
      </div>
      <p className="font-semibold text-[17px] leading-[24px] text-white font-inter mb-[5px]">
        {cardValues?.expDate}
      </p>
      <span className="text-[14px] leading-[16px] text-white">
        {/* {type === "selection"
          ? card?.system.at(0)?.toUpperCase() + card?.system.slice(1)!
          : ""} */}
      </span>
      <Image
        className="absolute top-0 bottom-0 h-full left-[30%] -z-10"
        unoptimized
        width={114}
        height={188}
        alt=""
        src={"/card-figure.svg"}
      />
      <Image
        className="absolute top-0 bottom-0 left-[44%] -z-10"
        unoptimized
        width={114}
        height={188}
        alt=""
        src={"/card-figure.svg"}
      />
      {styleType === "profile" && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setCardId?.({
              forSelect: cardId?.forSelect!,
              forDelete: card?.id!,
            });
          }}
          className="absolute right-2 top-2 bg-white md:scale-0 scale-100 items-center justify-center transition-all md:group-hover:scale-100 w-[40px] h-[40px] rounded-full shadow-sm flex"
        >
          <Image
            className="hover:scale-105 transition-transform"
            unoptimized
            width={24}
            height={24}
            alt="Рисунок корзинки"
            src={"/trash.svg"}
          />
        </button>
      )}
    </div>
  );
};

export default PaymentCard;

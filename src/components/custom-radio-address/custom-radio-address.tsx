"use client";

import { cn } from "@/lib/utils/cn";
import { CloseIcon, Pen } from "../svg/svg-list";
import { Link } from "../../../i18n.config";
import { UserAddressType } from "@/lib/types/api-types";
import { useTranslations } from "next-intl";

type CustomRadioAddressProps = {
  address: UserAddressType;
  setLocation: (values: number | null) => void;
  location: number | null;
  styleType?: "modal" | "profile";
  handleChange: (id: number | null) => void;
  setOpenDeleteModal: (value: number) => void;
};

const CustomRadioAddress = ({
  address,
  location,
  styleType,
  setLocation,
  handleChange,
  setOpenDeleteModal,
}: CustomRadioAddressProps) => {
  const t = useTranslations("Common");

  return (
    <label
      className="md:p-[24px] p-[10px] rounded-[7px] bg-[#F5F6F8] w-full block cursor-pointer font-inter"
      htmlFor={address.id + ""}
    >
      <div>
        <input
          onChange={() => handleChange(address.id || null)}
          name="address"
          className="hidden"
          id={address.id + ""}
          type="radio"
        />
        <div className="flex flex-col items-start">
          <div className="flex mb-[16px] items-start w-full">
            <div className="w-[24px] h-[24px] rounded-full border-[2px] border-solid border-accentColor p-[6px] relative z-10 flex items-center justify-center mr-[16px]">
              <div
                className={cn(
                  "min-w-[13px] min-h-[13px] bg-accentColor rounded-full scale-0 transition-transform ease-in-out",
                  null,
                  {
                    "scale-100": location === address.id,
                  }
                )}
              />
            </div>
            <p className="text-[18px] leading-[24px] mr-auto md:mr-[32px] break-all">
              {address.name_of_address}
            </p>{" "}
            <span className="py-[4px] px-[8px] rounded-[4px] bg-accentColor text-white text-[12px] leading-[14px] font-medium ml-2">
              {/* {address.name_of_address.at(0)?.toUpperCase() +
                address.name_of_address.slice(1)} */}
              Test
            </span>
          </div>
          <div className="flex justify-between items-center w-full mb-[8px]">
            <p className="pl-[40px] text-[14px] leading-[20px] md:text-[16px] md:leading-[24px] ">
              {address.country}&nbsp;{address.city}&nbsp;{address.street}{" "}
            </p>

            <div
              className={cn("hidden", {
                "flex gap-[10px]": styleType === "profile",
              })}
            >
              <Link
                href={`address/form?${new URLSearchParams({
                  "address-id": address.id + "",
                })}`}
              >
                <Pen />
              </Link>{" "}
              <button
                className={cn("", {
                  hidden: address.is_main,
                })}
                disabled={address.is_main}
                onClick={() => setOpenDeleteModal(address.id!)}
              >
                <CloseIcon />
              </button>
            </div>
          </div>
          <span className="pl-[40px] text-[14px] leading-[24px] md:text-[16px]">
            {address.phone_number}
          </span>
        </div>
      </div>
    </label>
  );
};

export default CustomRadioAddress;

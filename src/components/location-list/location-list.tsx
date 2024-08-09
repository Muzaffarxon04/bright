import { ResponseType, UserAddressType } from "@/lib/types/api-types";
import { cn } from "@/lib/utils/cn";
import { getLocations, updateLocation } from "@/services/locationsApi";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Locale } from "../../../i18n.config";
import BorderButton from "../border-button/border-button";
import Skeleton from "../common/skeleton";
import CustomRadioAddress from "../custom-radio-address/custom-radio-address";

type LocationListProps = {
  locale: Locale;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  location: number;
  styleType?: "modal" | "profile";
  setLocation: (value: number | null) => void;
  buttonClassName?: string;
  openDeleteModal?: number | null;
  wrapperClassName?: string;
  setOpenDeleteModal?: (value: number) => void;
};

const LocationList = ({
  locale,
  location,
  setLocation,
  onClick,
  styleType,
  openDeleteModal,
  buttonClassName,
  wrapperClassName,
  setOpenDeleteModal,
}: LocationListProps) => {
  const c = useTranslations("Common");
  const [data, setData] = useState<null | { data: UserAddressType[] }>(null);

  // const mockData = {
  //   data: [
  //     {
  //       id: 1,
  //       point: "2118 Thornridge",
  //       address: "2118 Thornridge Cir. Syracuse, Connecticut 35624",
  //       phone: "(209) 555-0104",
  //       place: "Home",
  //     }
  //   ],
  // };

  const selectedAddress = data?.data?.find((a) => a.is_main);

  const getAllLocations = async () => {
    const data = await getLocations(locale);
    setData(data);
  };

  useEffect(() => {
    getAllLocations();
  }, [openDeleteModal]);

  //Set main location
  useEffect(() => {
    if (!location) {
      setLocation(selectedAddress?.id!);
    }
  }, [data?.data]);

  const handleChange = (id: number | null) => {
    setLocation(id);
    const selectMain = async () => {
      const data: ResponseType | string = await updateLocation(
        id!,
        locale,
        "PATCH",
        { is_main: true }
      );

      if (typeof data !== "string" && data?.status_code === 200) {
        toast.success(c("SuccessLocationUpdate"));
      } else {
        toast.error(data as string);
      }
      getAllLocations();
    };
    selectMain();
  };

  return (
    <>
      <ul
        className={cn(
          "flex flex-col gap-[24px] mt-[20px] mb-[20px]",
          wrapperClassName
        )}
      >
        {data?.data.map((address) => (
          <li key={address.id}>
            <CustomRadioAddress
              handleChange={handleChange}
              setOpenDeleteModal={setOpenDeleteModal!}
              styleType={styleType}
              location={location}
              setLocation={setLocation}
              address={address}
            />
          </li>
        ))}
        {!data?.data.length && (
          <Skeleton className="w-full h-[144px] rounded-[7px]" />
        )}
      </ul>
      <BorderButton
        href={styleType === "profile" ? "address/form" : ""}
        onClick={onClick}
        wrapperClassName={buttonClassName}
      >
        {c("AddNewAddress")}
      </BorderButton>
    </>
  );
};

export default LocationList;

"use client";

import React, { useState } from "react";
import LocationList from "../location-list/location-list";
import { useTranslations } from "next-intl";
import ConfirmModal from "../confirm-modal/confirm-modal";
import { Locale } from "../../../i18n.config";
import { updateLocation } from "@/services/locationsApi";
import { ResponseType } from "@/lib/types/api-types";
import toast from "react-hot-toast";

const ProfileLocation = ({ locale }: { locale: Locale }) => {
  const t = useTranslations("Common");
  const [location, setLocation] = useState<number | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const id = openDeleteModal;
    const data: ResponseType | string = await updateLocation(
      id!,
      locale,
      "DELETE"
    );
    if (typeof data !== "string" && data?.status_code === 200) {
      toast.success(t("SuccessDeleted"));
      setLoading(false);
      setOpenDeleteModal(null);
    } else {
      toast.error(data as string);
      setLoading(false);
    }
  };

  return (
    <div>
      <span className="md:text-[28px] text-[20px] leading-[24px]  font-semibold md:leading-[1]">
        {t("SelectAddress")}
      </span>
      <LocationList
        locale={locale}
        setOpenDeleteModal={setOpenDeleteModal}
        openDeleteModal={openDeleteModal}
        styleType="profile"
        buttonClassName=""
        wrapperClassName="mt-[16px] md:mt-[32px] mb-[32px] md:mb-[48px]"
        onClick={() => {}}
        location={location!}
        setLocation={setLocation}
      />
      {/* This modal renders when delete button (x icon) hit by user */}
      <ConfirmModal
        loading={loading}
        handleClick={handleClick}
        type="delete"
        state={openDeleteModal!}
        setState={setOpenDeleteModal}
      />
    </div>
  );
};

export default ProfileLocation;

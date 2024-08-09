"use client";

import { ResponseType, UserAddressType } from "@/lib/types/api-types";
import { validateInputLocale } from "@/lib/utils/commonFunctions";
import {
  addLocation,
  getLocations,
  updateLocation,
} from "@/services/locationsApi";
import { FormikHelpers } from "formik";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as yup from "yup";
import { Locale, useRouter } from "../../../i18n.config";
import { StepType } from "../cart/order-modals";
import MyFormik from "../my-formik/my-formik";
import MyInput from "../my-input/my-input";
import TwoButtons from "../two-buttons/two-buttons";

const LocationForm = ({
  onClick,
  textLeft,
  locale,
  setStep,
  step,
  styleType,
}: {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  textLeft: string;
  locale: Locale;
  setStep?: (value: StepType) => void;
  step?: StepType;
  styleType: "profile" | "modal";
}) => {
  const t = useTranslations("Order");
  const c = useTranslations("Common");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [data, setData] = useState<UserAddressType | null>(null);

  const addressId = new URLSearchParams(window.location.search).get(
    "address-id"
  );

  useEffect(() => {
    //fetch user location
    const getLocationById = async () => {
      const data = await getLocations(locale, +addressId!);
      setData(data?.data);
    };
    getLocationById();
  }, [addressId]);

  const { city, country, name_of_address, phone_number, street, zip_code } =
    data ?? {};

  const initialValues = {
    phone_number: phone_number || "",
    country: country || "",
    city: city || "",
    street: street || "",
    zip_code: zip_code || "",
    name_of_address: name_of_address || "",
  };

  const validationSchema = yup.object({
    phone_number: yup.string().required(c("FieldRequired")),
    country: yup
      .string()
      .required(c("FieldRequired"))
      .min(3, validateInputLocale(3, locale)),
    city: yup
      .string()
      .required(c("FieldRequired"))
      .min(3, validateInputLocale(3, locale)),
    street: yup
      .string()
      .required(c("FieldRequired"))
      .min(3, validateInputLocale(3, locale)),
    name_of_address: yup
      .string()
      .required(c("FieldRequired"))
      .min(3, validateInputLocale(3, locale)),
    zip_code: yup
      .string()
      .required(c("FieldRequired"))
      .min(3, validateInputLocale(3, locale)),
  });

  const handleSubmit = async (
    values: typeof initialValues,
    helpers: FormikHelpers<typeof values>
  ) => {
    setLoading(true);
    let data: ResponseType | string | null = null;
    if (!addressId) {
      data = await addLocation(values, locale);
    } else {
      data = await updateLocation(+addressId, locale, "PATCH", values);
    }
    if (
      typeof data !== "string" &&
      (data?.status_code === 201 || data?.status_code === 200)
    ) {
      toast.success(c(addressId ? "SuccessLocationUpdate" : "SuccessLocation"));
      !addressId && helpers.resetForm();
      setLoading(false);
      if (styleType === "modal") {
        setStep?.({ card: step?.card!, location: "select", view: "one" });
      } else {
        router.push("/profile/address");
      }
    } else {
      toast.error(data as string);
      setLoading(false);
    }
  };

  return (
    <MyFormik
      enableReinitialize={true}
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      <div className="grid grid-cols-1 gap-[16px] md:grid-cols-2 md:gap-x-[53px] md:gap-y-[32px] mb-[32px] md:mb-[20px] items-end">
        <MyInput
          required
          name="country"
          placeholder={t("Uzbekistan")}
          label={t("Country")}
          type="text"
        />
        <MyInput
          required
          name="city"
          placeholder={t("Tashkent")}
          label={t("City")}
          type="text"
        />
        <MyInput
          required
          name="street"
          placeholder={t("ANavoiy")}
          label={t("Street")}
          type="text"
        />
        <MyInput
          required
          onlyDigits
          name="zip_code"
          placeholder={"100044"}
          label={t("ZipCode")}
          type="text"
        />
        <MyInput
          required
          name="phone_number"
          placeholder={"+99893555555588"}
          label={t("PhoneNumber")}
          type="phone"
        />
        <MyInput
          required
          name="name_of_address"
          placeholder={"First"}
          label={t("TitleAddress")}
          type="text"
        />
      </div>
      <TwoButtons
        loading={loading}
        styleType={onClick ? "modal" : "profile"}
        onClick={onClick}
        textLeft={textLeft}
        textRight={c("Save")}
      />
    </MyFormik>
  );
};

export default LocationForm;

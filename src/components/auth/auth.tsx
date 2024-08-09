"use client";

import { cn } from "@/lib/utils/cn";
import { validateInputLocale } from "@/lib/utils/commonFunctions";
import { useTranslations } from "next-intl";
import { useState } from "react";
import * as yup from "yup";
import { Link, Locale } from "../../../i18n.config";
import MyButton from "../my-button/my-button";
import MyFormik from "../my-formik/my-formik";
import MyInput from "../my-input/my-input";
import { Email, Key, Profile } from "../svg/svg-list";
import { FormikErrors, FormikValues } from "formik";

const Auth = ({
  type,
  locale,
  enableValidateInputOnChange,
}: {
  type: "sigin" | "signup";
  locale: Locale;
  enableValidateInputOnChange?: boolean;
}) => {
  const t = useTranslations("Auth");
  const c = useTranslations("Common");
  const [formikErrors, setFormikErrors] = useState<FormikErrors<FormikValues>>(
    {}
  );
  const [formikValues, setFormikValues] = useState<
    Partial<{
      email: string;
      password: string;
      first_name: string;
      last_name: string;
      confirm_password: string;
    }>
  >();
  let initialValues = {
    email: "",
    password: "",
  };

  const allValuesAreTruthy = formikValues
    ? Object.values(formikValues).every((value) => Boolean(value))
    : false;

  const allInputAreValid = formikErrors
    ? Object.values(formikErrors).every((value) => Boolean(value))
    : false;

  const validationSchemaSignUp = {
    first_name: yup
      .string()
      .required(c("FieldRequired"))
      .min(3, validateInputLocale(3, locale)),
    last_name: yup
      .string()
      .required(c("FieldRequired"))
      .min(3, validateInputLocale(3, locale)),
    confirm_password: yup
      .string()
      .required(c("FieldRequired"))
      .oneOf([yup.ref("password")], c("PassMatch")),
    email: yup
      .string()
      .email(c("InvalidEmail"))
      .required(c("FieldRequired"))
      .min(3, validateInputLocale(3, locale)),
    password: yup
      .string()
      .required(c("FieldRequired"))
      .min(8, c("PassLong"))
      .matches(/[^A-Za-z0-9]/, c("PassSpecial")),
  };

  const validationSchemaSignIn = {
    email: yup.string(),
    password: yup.string(),
  };

  if (type === "signup") {
    const initialValuesSignUp = {
      first_name: "",
      last_name: "",
      confirm_password: "",
    };

    initialValues = { ...initialValues, ...initialValuesSignUp };
  }

  const validationSchema = yup.object(
    type === "signup" ? validationSchemaSignUp : validationSchemaSignIn
  );

  const handleSubmit = (values: typeof initialValues) => {
    console.log("Form data", values);
  };

  return (
    <div
      className={cn("", {
        "md:mt-[35px] mt-[30px] mb-[30px]": type === "signup",
        "md:mt-[135px] mt-[30px] mb-[30px]": type === "sigin",
      })}
    >
      <p
        className={cn(
          "text-center font-inter font-medium text-[24px] leading-[29px] text-[#131111] mb-[24px] md:mb-[20px]",
          { "md:mb-[40px]": type === "sigin" }
        )}
      >
        {t(type === "signup" ? "SignUpAccount" : "SignInAccount")}
      </p>
      <MyFormik
        setFormikErrors={setFormikErrors}
        setFormikValues={setFormikValues}
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        className="grid md:grid-cols-[repeat(auto-fit,_minmax(345px,_1fr))] grid-cols-1 md:gap-[40px] gap-[16px] mb-[24px] sm:mb-[32px] justify-center"
      >
        {type === "signup" && (
          <MyInput
            enableValidateInputOnChange
            label={t("Name")}
            required
            styleType="rounded"
            name="first_name"
            placeholder={t("NamePlaceholder")}
            type="text"
            icon={<Profile height="24" width="24" />}
          />
        )}
        {type === "signup" && (
          <MyInput
            enableValidateInputOnChange
            label={t("Surname")}
            required
            styleType="rounded"
            name="last_name"
            placeholder={t("SurnamePlaceholder")}
            type="text"
            icon={<Profile height="24" width="24" />}
          />
        )}

        <MyInput
          enableValidateInputOnChange
          label={t("Email")}
          required
          styleType="rounded"
          name="email"
          placeholder={t("EmailPlaceholder")}
          type="text"
          icon={<Email />}
        />
        <MyInput
          enableValidateInputOnChange
          enableSeePass
          label={t("Password")}
          required
          styleType="rounded"
          name="password"
          placeholder={t("PassPlaceholder")}
          type="password"
          icon={<Key />}
        />
        {type === "signup" && (
          <MyInput
            enableValidateInputOnChange
            wrapperClassName="sm:col-span-2 mb-[8px] md:mb-0"
            label={t("ConfirmPassWord")}
            required
            styleType="rounded"
            name="confirm_password"
            placeholder={t("ConfirmPassPlaceholder")}
            type="password"
            icon={<Key />}
          />
        )}
        {type === "sigin" && (
          <Link
            className="text-accentColor font-inter font-medium text-[14px] leading-[17px] -mt-[8px] sm:hidden inline"
            href={"#"}
          >
            {c("ForgotPass")}
          </Link>
        )}
        <div className="sm:col-span-2">
          <div className="flex justify-center">
            <MyButton
              disabled={!allValuesAreTruthy}
              // loading={!formikValues?.email || !formikValues.password}
              type="submit"
              className="min-h-[51px] rounded-[20px] text-[16px] font-medium  w-full max-w-[435px]"
            >
              {t(type === "signup" ? "SignUp" : "SignIn")}
            </MyButton>
          </div>
        </div>
        {/*
        can be removed
        <MyButton className="bg-white min-h-[51px] border-accentColor border border-solid text-[18px] leading-[21px] text-textColor rounded-[24px] -mt-[4px] sm:mt-0">
          {t(type === "signup" ? "SignUpGoogle" : "SignInGoogle")}
        </MyButton> */}
      </MyFormik>
      <div className="flex justify-center flex-col items-center">
        <p className="text-secondaryColor leading-[22px] w-[263px] text-center">
          {t("IfYouHavent")}&nbsp;
          <Link
            className="underline"
            href={type === "signup" ? "/auth/signin" : "/auth/signup"}
          >
            {t(type === "signup" ? "SignIn" : "SignUp")}
          </Link>
        </p>
        {type === "sigin" && (
          <Link
            className="text-accentColor font-inter font-medium text-[14px] leading-[17px] mt-[8px] sm:inline hidden"
            href={"#"}
          >
            {c("ForgotPass")}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Auth;

"use client";

import React from "react";
import MyFormik from "../my-formik/my-formik";
import MyInput from "../my-input/my-input";
import * as yup from "yup";
import { useTranslations } from "next-intl";
import MyTextArea from "../my-textarea/my-textarea";
import MyButton from "../my-button/my-button";

const ContactForm = () => {
  const t = useTranslations("Contacts");

  const initialValues = {
    name: "",
  };

  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
  });

  const handleSubmit = (values: any) => {
    console.log("Form data", values);
  };

  return (
    // <div className="md:w-auto w-full">
    <MyFormik
      className="md:w-auto w-full"
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      <div className="w-full md:max-w-[593px] grid grid-cols-1 gap-x-[32px] gap-y-[20px] md:gap-y-[28px] md:grid-cols-2 mb-[20px] md:mb-[28px] ">
        <MyInput
          label={t("Name")}
          required={true}
          styleType="shadow"
          name="name"
          placeholder={"Brian Clark"}
          type="text"
        />
        <MyInput
          label={t("PhoneNumber")}
          required={true}
          styleType="shadow"
          name="phone"
          placeholder={"+9989566565"}
          type="phone"
        />

        <MyTextArea
          className="min-h-[128px]"
          wrapperClassName="md:col-span-2"
          label={t("Message")}
          name="message"
          styleType="shadow"
          placeholder={t("TypeMsg")}
          maxLength={300}
        />
      </div>
      <div className="flex justify-end">
        <MyButton
          type="submit"
          className="text-[18px] leading-[21px]"
          styleType="textStyle"
        >
          {t("SendMessage")} &#x2192;
        </MyButton>
      </div>
    </MyFormik>
    // </div>
  );
};

export default ContactForm;

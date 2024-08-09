"use client";

import MyFormik from "@/components/my-formik/my-formik";
import MyInput from "@/components/my-input/my-input";
import TwoButtons from "@/components/two-buttons/two-buttons";
import { useTranslations } from "next-intl";
import * as yup from "yup";

const ProfileUserForm = () => {
  const t = useTranslations("Profile.ProfileForm");
  const c = useTranslations("Common");

  const initialValues = {
    name: "",
    surname: "",
    email: "",
  };

  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    surname: yup.string().required("Surname is required"),
    email: yup.string().required("Email is required"),
  });

  const handleSubmit = (values: typeof initialValues) => {
    console.log("Form data", values);
  };

  return (
    <MyFormik
      className="grid md:grid-cols-2 grid-cols-1 w-full gap-[32px] md:gap-x-[41px] md:gap-y-[30px] items-end"
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      <MyInput
        label={t("Name")}
        required={true}
        name="name"
        placeholder={"Brian"}
        type="text"
      />
      <MyInput
        label={t("Surname")}
        required={true}
        name="surname"
        placeholder={"Clark"}
        type="text"
      />
      <MyInput
        label={t("Email")}
        required={true}
        name="email"
        placeholder={"brnclrk@email.com"}
        type="text"
      />
      <TwoButtons
        styleType="profile"
        textLeft={c("Delete")}
        wrapperClassName="max-h-[48px] flex-wrap"
      />
    </MyFormik>
  );
};

export default ProfileUserForm;

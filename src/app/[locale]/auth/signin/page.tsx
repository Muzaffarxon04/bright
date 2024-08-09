import Auth from "@/components/auth/auth";
import React from "react";
import { Locale } from "../../../../../i18n.config";

const SignIn = ({ params: { locale } }: { params: { locale: Locale } }) => {
  return <Auth locale={locale} type="sigin" />;
};

export default SignIn;

import Auth from "@/components/auth/auth";
import { Locale } from "../../../../../i18n.config";

const SignUpPage = ({ params: { locale } }: { params: { locale: Locale } }) => {
  return <Auth enableValidateInputOnChange locale={locale} type="signup" />;
};

export default SignUpPage;

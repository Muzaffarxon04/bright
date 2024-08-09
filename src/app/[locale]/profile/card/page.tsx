import ProfileCard from "@/components/profile/profile-card";
import { getTranslations } from "next-intl/server";
import { Locale } from "../../../../../i18n.config";

const ProfileCardPage = async ({
  params: { locale },
}: {
  params: { locale: Locale };
}) => {
  const t = await getTranslations("Common");
  return (
    <div className="w-full max-w-[780px] md:pl-[45px] md:pr-[20px] overflow-hidden md:mt-[40px] mt-[32px] px-[20px]">
      <ProfileCard locale={locale} />
    </div>
  );
};

export default ProfileCardPage;

import ProfileLocation from "@/components/profile/profile-location";
import { Locale } from "../../../../../i18n.config";

const ProfileAddress = ({
  params: { locale },
}: {
  params: { locale: Locale };
}) => {
  return (
    <div className="w-full max-w-[930px] md:pl-[20px] md:pr-[20px] mt-[40px] px-[20px]">
      <ProfileLocation locale={locale} />
    </div>
  );
};

export default ProfileAddress;

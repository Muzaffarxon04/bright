import LocationForm from "@/components/location-form/location-form";
import { getTranslations } from "next-intl/server";
import { Locale } from "../../../../../../i18n.config";

type ProfileAddressFormProps = {
  params: { locale: Locale };
};

const ProfileAddressForm = async ({
  params: { locale },
}: ProfileAddressFormProps) => {
  const t = await getTranslations("Common");
  return (
    <div className="mt-[32px] md:mt-[41px] px-[20px] md:pl-[40px] md:pr-[20px] w-full max-w-[903px]">
      <LocationForm
        locale={locale}
        styleType="profile"
        textLeft={t("Delete")}
      />
    </div>
  );
};

export default ProfileAddressForm;

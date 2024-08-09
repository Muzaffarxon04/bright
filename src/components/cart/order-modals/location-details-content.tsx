import LocationForm from "@/components/location-form/location-form";
import { useTranslations } from "next-intl";
import { StepType } from ".";
import { Locale } from "../../../../i18n.config";

const LocationDetailsContent = ({
  locale,
  setStep,
  step,
}: {
  locale: Locale;
  setStep: (value: StepType) => void;
  step: StepType;
}) => {
  const t = useTranslations("Order");
  const c = useTranslations("Common");

  return (
    <div>
      <p className="text-[#000000] font-semibold text-[20px] leading-[24px] mb-[16px] md:mb-[20px]">
        {t("AddOrderLocation")}
      </p>
      <LocationForm
        locale={locale}
        setStep={setStep}
        step={step}
        styleType="modal"
        textLeft={c("Cancel")}
        onClick={() => {
          setStep({ location: "select", card: step.card, view: step.view });
        }}
      />
    </div>
  );
};

export default LocationDetailsContent;

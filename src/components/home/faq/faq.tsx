import MyTitle from "@/components/my-title/my-title";
import FaqList from "./faqList";
import { getTranslations } from "next-intl/server";
import { getAllFaqs } from "@/services/faqApi";
import { Locale } from "../../../../i18n.config";
import { FaqItemType } from "@/lib/types/api-types";

type FaqProps = {
  locale: Locale;
};

const Faq = async ({ locale }: FaqProps) => {
  const t = await getTranslations("Faq");
  const data: { data: FaqItemType[] } = await getAllFaqs(locale);
  return (
    <section className="pb-[152px]">
      <div className="my-container">
        <MyTitle className="tracking-[0.03em] text-[#22282B] md:hidden  mb-[35px]">
          {t("Faq")}
        </MyTitle>
        <MyTitle className="md:text-[52px] md:leading-[62.4px] tracking-[0.03em] text-[#22282B] md:block hidden md:mb-[40px]">
          {t("FaqTitle")}
        </MyTitle>
        <FaqList data={data} />
      </div>
    </section>
  );
};

export default Faq;

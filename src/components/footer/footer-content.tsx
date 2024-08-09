import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "../../../i18n.config";

const FooterContent = () => {
  const styles = "pr-1 border-r border-solid";
  const t = useTranslations("Footer");
  return (
    <div className="border-t border-solid border-[#F1F3F7] lg:pt-[24px] lg:pb-[30px] pt-[48px] pb-[24px]">
      <div className="my-container">
        <div className="px-[27px] flex lg:justify-between items-center lg:flex-row flex-col justify-normal">
          <Link href={"/"}>
            <Image
              className="lg:mb-0 mb-[50px]"
              priority
              alt="Logo"
              width={73}
              height={66}
              src={"/logo.svg"}
            />
          </Link>
          <div className="text-[#6D758F] lg:w-full w-[263px] lg:text-right text-center">
            <span className={`${styles}`}>
              {t("Copyright")} &copy; {new Date().getFullYear()} Bright gallery
            </span>
            <span className={`${styles} border-[#6D758F] pl-1`}>
              {t("AllRights")}
            </span>
            <a
              target="_blank"
              href="https://dynamicsoft.uz"
              className={`${styles} pl-1 border-none`}
            >
              {t("DevelopedBy")} Dynamic Soft
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterContent;

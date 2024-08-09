import { API_URL } from "@/consts/API_URL";
import { NewsType } from "@/lib/types/api-types";
import { formatDate } from "@/lib/utils/commonFunctions";
import Image from "next/image";
import { Locale } from "../../../../i18n.config";
import { cn } from "@/lib/utils/cn";

type NewsCardProps = {
  news: NewsType;
  locale: Locale;
  setNewsModal: (value: string) => void;
  index: number;
};

const NewsCard = ({ news, locale, setNewsModal, index }: NewsCardProps) => {
  return (
    <li
      onClick={() => setNewsModal(index + "")}
      className="md:h-[372px] h-[231px] rounded-[10px] w-full cursor-pointer"
    >
      <Image
        quality={90}
        src={`${API_URL}/upload/${news.files[0].path}`}
        width={541}
        height={372}
        alt={news.title}
        className="rounded-[10px] object-cover w-full md:h-[372px] h-[231px]"
      />

      <div className="p-[16px] w-[94%] h-[97px] rounded-[10px] shadow-[0px_1px_4px_rgba(25_33_61_0.08)] border border-solid border-[#E1E4ED] bg-white md:p-[32px] md:h-[147px] md:-mt-[88px] -mt-[57px] relative z-10">
        <span className="font-normal text-[14px] leading-[10px] text-[#6D758F]">
          {formatDate(+news.created_at, locale)}
        </span>
        <p className="font-medium leading-[16px] md:font-semibold md:text-[24px] md:leading-[24.5px] mt-[10px] md:mt-[16px] line-clamp-2">
          {news.title}
        </p>
      </div>
    </li>
  );
};

export default NewsCard;

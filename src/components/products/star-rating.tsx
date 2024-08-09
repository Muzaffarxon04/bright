"use client";

import { cn } from "@/lib/utils/cn";
import React, { useEffect, useState } from "react";

type StarRatingProps = {
  type: "static" | "button";
  wrapperClassName?: string;
  rating: number;
  setRating?: (value: number) => void;
};

const StarRating = ({
  type,
  wrapperClassName,
  rating,
  setRating,
}: StarRatingProps) => {
  const [hover, setHover] = useState<null | number>(null);
  const [animate, setAnimate] = useState(true);

  setTimeout(() => {
    setAnimate(false);
  }, 3000);

  return (
    <div
      className={cn("flex", wrapperClassName, {
        "gap-[6px] mb-[20px]": type === "static",
        "justify-center mb-[16px]": type === "button",
      })}
    >
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={`transition-color duration-600 ease-in-out w-[18px] h-[18px] ${
              index <= (hover || rating || 5)
                ? "text-[#A87C4F]"
                : type === "static"
                ? "text-[#B4B9C9]"
                : "text-white"
            } ${
              type === "static"
                ? "cursor-default"
                : "flex w-[48px] h-[48px] items-center justify-center hover:bg-[#FFE7CE] rounded-full"
            } ${type === "button" && animate ? "animate-pulse" : ""}`}
            onClick={type === "button" ? () => setRating?.(index) : () => {}}
            onMouseEnter={type === "button" ? () => setHover(index) : () => {}}
            onMouseLeave={type === "button" ? () => setHover(null) : () => {}}
          >
            {type === "static" ? (
              <svg
                className="transition-color duration-600"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 7.20663C17.9911 7.41862 17.879 7.66072 17.6616 7.85191C16.791 8.61668 15.9199 9.38074 15.0484 10.1441C14.6415 10.5011 14.234 10.8576 13.826 11.2136C13.7677 11.2642 13.7528 11.3092 13.7708 11.3878C14.084 12.7566 14.3947 14.1259 14.7028 15.4958C14.7652 15.7712 14.8266 16.047 14.894 16.3213C14.9923 16.7276 14.8668 17.1291 14.5501 17.3564C14.2017 17.6064 13.8317 17.6226 13.4634 17.4042C12.2903 16.7068 11.1187 16.0066 9.94856 15.3037C9.67539 15.1405 9.39888 14.981 9.13025 14.8118C9.04039 14.7552 8.97514 14.7547 8.88289 14.8102C7.45993 15.6643 6.03387 16.5132 4.61258 17.3671C4.31073 17.5483 4.00243 17.6164 3.6688 17.4795C3.22738 17.2983 2.99675 16.8342 3.10645 16.3519C3.41666 14.9868 3.72735 13.6217 4.03852 12.2565C4.104 11.9697 4.16256 11.6808 4.23354 11.3962C4.25409 11.314 4.23975 11.2654 4.17737 11.2112C3.64267 10.7461 3.10932 10.2794 2.57732 9.81117C1.8319 9.15681 1.08362 8.50699 0.342505 7.84785C0.0399405 7.57922 -0.0747758 7.23627 0.0492612 6.84408C0.173298 6.45189 0.450529 6.21577 0.863986 6.17323C1.59674 6.09818 2.33068 6.03533 3.06415 5.96817C3.78973 5.90173 4.51531 5.83577 5.24089 5.77029C5.48275 5.74854 5.72461 5.72416 5.96671 5.70576C6.04462 5.70002 6.08621 5.66585 6.11536 5.59487C6.77259 4.0505 7.43094 2.50677 8.09039 0.963675C8.27251 0.537074 8.59778 0.298798 9.01123 0.309553C9.42469 0.320308 9.72295 0.522256 9.8869 0.902015C10.3331 1.93518 10.7736 2.97073 11.2159 4.00581C11.4411 4.53159 11.6667 5.05881 11.888 5.58698C11.9219 5.66824 11.9704 5.69978 12.0553 5.70648C12.6384 5.75587 13.2214 5.80765 13.8042 5.86182C14.6528 5.93894 15.5013 6.01669 16.3497 6.09508C16.6193 6.11898 16.8891 6.14288 17.158 6.17299C17.647 6.23082 18.0038 6.63878 18 7.20663Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg
                width="33"
                height="32"
                viewBox="0 0 33 32"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_868_1104)">
                  <path
                    d="M16.5 2.14298L20.5059 9.73562L20.7354 10.1705L21.2199 10.2543L29.6788 11.7179L23.6957 17.8741L23.353 18.2267L23.423 18.7134L24.645 27.2106L16.9412 23.4226L16.5 23.2057L16.0588 23.4226L8.35505 27.2106L9.57703 18.7134L9.64702 18.2267L9.30432 17.8741L3.32119 11.7179L11.7801 10.2543L12.2646 10.1705L12.4941 9.73562L16.5 2.14298Z"
                    stroke="#A87C4F"
                    strokeWidth="2"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_868_1104">
                    <rect
                      width="32"
                      height="32"
                      fill="white"
                      transform="translate(0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;

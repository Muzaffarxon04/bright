import { Locale } from "../../../i18n.config";

type ApiErrorString = {
  message: {
    message: string;
  };
};

type ApiErrorArr = {
  message: {
    message: string[];
  };
};

type ApiErrorArrSecond = {
  message: string[];
};

export const getErrorMessage = (error: unknown, locale: Locale): string => {
  const obj = {
    en: "Something went wrong",
    ru: "Что то пошло не так",
    uz: "No'malum xatolik",
  };

  let message = "";
  if (typeof (error as ApiErrorString)?.message?.message === "string") {
    message = (error as ApiErrorString)?.message?.message;
  } else if (Array.isArray((error as ApiErrorArr)?.message?.message)) {
    message = (error as ApiErrorArr)?.message?.message?.join(", ");
  } else if (typeof error === "string") {
    return (message = error);
  } else if (Array.isArray((error as ApiErrorArrSecond)?.message)) {
    message = (error as ApiErrorArrSecond)?.message?.join(", ");
  } else {
    message = obj[locale];
  }
  return message;
};

import { Locale } from "../../../i18n.config";

export const validateFile = (
  file: File,
  maxSize: number,
  allowedMimeTypes: string[],
  locale: Locale
): string => {
  let error = "";

  console.log(file);

  const objErrorsSize = {
    en: `File size should be more than ${maxSize} MB`,
    ru: `Размер файла не должен превышать ${maxSize} MB`,
    uz: `Fayl hajmi ${maxSize} MB dan oshmasligi kerak`,
  };

  const objErrorsType = {
    en: "Only pictures are accepted",
    ru: "Принимаются только картики",
    uz: "Faqat rasmlar qabul qilinadi",
  };

  // Validate file size
  if (file && file.size > maxSize * 1024 * 1024) {
    error = objErrorsSize[locale];
  }

  // Validate MIME type
  if (file && !allowedMimeTypes.includes(file.type)) {
    error = objErrorsType[locale];
  }

  console.log(error);

  return error;
};

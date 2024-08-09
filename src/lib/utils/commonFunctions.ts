import { Locale } from "../../../i18n.config";

export const isActiveLink = (link: string, pathName: string) => {
  if (link === "/") {
    return pathName === "/";
  }
  return pathName.includes(link);
};

export const formatCurrency = (
  value: number,
  style: "decimal" | "currency" | "percent" | "unit",
  locale?: string,
  currency?: string
) => {
  return new Intl.NumberFormat(locale ? locale : "en-US", {
    style: style,
    currency: currency ? currency : "USD",
  }).format(value);
};

export const parseCurrency = (
  formattedValue: string,
  locale: string = "en-US"
): number => {
  // Remove all non-numeric characters except for the decimal separator and minus sign
  const numberString = formattedValue.replace(new RegExp(`[^0-9.-]+`, "g"), "");

  // Parse the cleaned string to a number
  const parsedNumber = parseFloat(numberString);

  // Check if the parsed number is a valid number
  if (isNaN(parsedNumber)) {
    throw new Error(
      `Unable to parse number from the formatted string: ${formattedValue}`
    );
  }

  return parsedNumber;
};

export const formatDate = (timestamp: number, locale = "en-US") => {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

// export const formatDate = (timestamp: number, locale = "en-US") => {
//   const date = new Date(timestamp);
//   const now = new Date();

//   const isToday = (date: Date, now: Date) =>
//     date.getDate() === now.getDate() &&
//     date.getMonth() === now.getMonth() &&
//     date.getFullYear() === now.getFullYear();

//   const isYesterday = (date: Date, now: Date) => {
//     const yesterday = new Date(now);
//     yesterday.setDate(now.getDate() - 1);
//     return (
//       date.getDate() === yesterday.getDate() &&
//       date.getMonth() === yesterday.getMonth() &&
//       date.getFullYear() === yesterday.getFullYear()
//     );
//   };

//   const obj = {}

//   if (isToday(date, now)) {
//     return locale === "en-US" ? "Today" : "Bugun"; // Add more locale cases as needed
//   } else if (isYesterday(date, now)) {
//     return locale === "en-US" ? "Yesterday" : "Kecha"; // Add more locale cases as needed
//   } else {
//     return new Intl.DateTimeFormat(locale, {
//       month: "long",
//       day: "numeric",
//       year: "numeric",
//     }).format(date);
//   }
// };

export const formatCardNumber = (cardNumber: string): string => {
  // Remove all non-digit characters
  const cleaned = cardNumber.replace(/\D/g, "");

  // Split into groups of 4 digits
  const matchedGroups = cleaned.match(/.{1,4}/g);

  // Join groups with a space
  return matchedGroups ? matchedGroups.join(" ") : "";
};

export const formatCardExpiryDate = (date: string): string => {
  // Remove non-digit characters
  const digits = date.replace(/\D/g, "");

  // Extract month and year
  const month = digits.slice(0, 2);
  const year = digits.slice(2, 4);

  // Format the date
  return `${month}${year ? "/" + year : ""}`;
};

export const validateInputLocale = (
  min: number,
  locale: Locale,
  keyWord?: string
) => {
  const obj = {
    en: `Should not be less than ${min} symbols`,
    ru: `Должно быть не менее ${min} символов`,
    uz: `${min} simvoldan kam bolmasligi lozim`,
  };

  return obj[locale];
};

export const localeInStock = (inStock: number, locale: Locale) => {
  const obj = {
    en: `Only ${inStock}  pcs. in stock`,
    ru: `В наличии ${inStock} шт.`,
    uz: `Sotuvda ${inStock} dona`,
  };
  return obj[locale];
};

export const identifyCardSystem = (cardNumber: string) => {
  const patterns = {
    visa: /^4/,
    mastercard: /^(5[1-5]|2[2-7])/,
    uzcard: /^8600/,
    humo: /^9860/,
    // amex: /^3[47]/,
    // discover: /^6(?:011|5)/,
    // Add other card systems as needed
  };

  for (const [system, pattern] of Object.entries(patterns)) {
    if (pattern.test(cardNumber)) {
      return system;
    }
  }
  return null;
};

import { API_URL, token } from "@/consts/API_URL";
import { Locale } from "../../i18n.config";
import { PaymentCardType } from "@/lib/types/api-types";
import { getErrorMessage } from "@/lib/utils/getErrorMessage";

export const getAllPaymentCards = async (locale: Locale) => {
  try {
    const url = new URL(`${API_URL}/user-credit-card/all-by-user`);

    const response = await fetch(url.toString(), {
      headers: {
        lang: locale,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Unable to fetch payment cards.");
    console.log(response.json);

    return response.json();
  } catch (error) {
    // console.error(error);
    // throw error; // Re-throw the error after logging it
  }
};

export const addPaymentCard = async (body: PaymentCardType, locale: Locale) => {
  try {
    const url = new URL(`${API_URL}/user-credit-card`);

    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        lang: locale,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    if (!response.ok) {
      return getErrorMessage(await response.json(), locale);
      // throw new Error("Unable to post payment cards.");
    }
    return response.json();
  } catch (error) {
    // console.log(error);
  }
};

export const deletePaymentCard = async (id: number, locale: Locale) => {
  try {
    const url = new URL(`${API_URL}/user-credit-card/${id}`);

    const response = await fetch(url.toString(), {
      method: "DELETE",
      headers: {
        lang: locale,
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return getErrorMessage(await response.json(), locale);
    }

    return response.json();
  } catch (error) {
    // console.error(error);
    // throw error; // Re-throw the error after logging it
  }
};

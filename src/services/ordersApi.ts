import { API_URL, token } from "@/consts/API_URL";
import { Locale } from "../../i18n.config";
import { getErrorMessage } from "@/lib/utils/getErrorMessage";
import { OrderType } from "@/lib/types/api-types";

export const getOrders = async (locale: Locale) => {
  try {
    const url = new URL(`${API_URL}/order/get-user-self-order`);

    const response = await fetch(url.toString(), {
      headers: {
        lang: locale,
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Unable to fetch orders.");

    return response.json();
  } catch (error) {
    // console.error(error);
    // throw error; // Re-throw the error after logging it
  }
};

export const makeOrder = async (body: OrderType, locale: Locale) => {
  try {
    const url = new URL(`${API_URL}/order`);
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
    }
    return response.json();
  } catch (error) {}
};

import { API_URL, token } from "@/consts/API_URL";
import { UserAddressType } from "@/lib/types/api-types";
import { getErrorMessage } from "@/lib/utils/getErrorMessage";
import { Locale } from "../../i18n.config";

export const getLocations = async (locale: Locale, id?: number) => {
  try {
    const url = new URL(
      `${API_URL}/user-location${!id ? "/self" : ""}${id ? `/${id}` : ""}`
    );

    const response = await fetch(url.toString(), {
      headers: {
        lang: locale,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Unable to fetch locations.");

    return response.json();
  } catch (error) {
    // console.error(error);
    // throw error; // Re-throw the error after logging it
  }
};

export const addLocation = async (body: UserAddressType, locale: Locale) => {
  try {
    const url = new URL(`${API_URL}/user-location/self-location`);

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

export const updateLocation = async (
  id: number,
  locale: Locale,
  method: "PATCH" | "DELETE",
  body?: UserAddressType | { is_main: boolean }
) => {
  try {
    const url = new URL(`${API_URL}/user-location/${id}`);

    const response = await fetch(url.toString(), {
      method: method,
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

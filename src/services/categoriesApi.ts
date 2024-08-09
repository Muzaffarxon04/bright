import { API_URL } from "@/consts/API_URL";
import { Locale } from "../../i18n.config";

export const getAllCategories = async (locale: Locale) => {
  try {
    const url = new URL(`${API_URL}/category`);

    const response = await fetch(url.toString(), {
      headers: {
        lang: locale,
      },
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Unable to fetch categories.");

    return response.json();
  } catch (error) {
    // console.error(error);
    // throw error; // Re-throw the error after logging it
  }
};

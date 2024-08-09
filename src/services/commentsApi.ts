import { API_URL, token } from "@/consts/API_URL";
import { getErrorMessage } from "@/lib/utils/getErrorMessage";
import { Locale } from "../../i18n.config";

export const addComment = async (body: FormData, locale: Locale) => {
  try {
    const url = new URL(`${API_URL}/feedback`);
    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        lang: locale,
        Authorization: `Bearer ${token}`,
      },
      body,
    });

    if (!response.ok) {
      return getErrorMessage(await response.json(), locale);
    }
    return response.json();
  } catch (error) {}
};

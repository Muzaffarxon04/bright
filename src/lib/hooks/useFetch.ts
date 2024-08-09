import { API_URL, token } from "@/consts/API_URL";
import { useEffect } from "react";
import { Locale } from "../../../i18n.config";

export const useFetch = <T>(
  endPoint: string,
  locale: Locale,
  setState: any,
  dep?: T,
  id?: number
) => {
  let data: any = null;
  const getApi = async () => {
    try {
      const url = new URL(`${API_URL}/${endPoint}${id ? `/${id}` : ""}`);

      const response = await fetch(url.toString(), {
        headers: {
          lang: locale,
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      if (!response.ok) throw new Error("Unable to fetch");

      return response.json();
    } catch (error) {}
  };
  useEffect(() => {
    data = getApi();
  }, [dep]);
  return data;
};

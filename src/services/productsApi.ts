import { API_URL } from "@/consts/API_URL";
import { ProductCategory } from "@/lib/types/api-types";
import { Locale } from "../../i18n.config";

export const getAllProducts = async (
  locale: Locale,
  search?: string,
  categoryId?: string,
  type?: string,
  isPopular?: boolean,
  isReccomended?: boolean
) => {
  try {
     // Construct the URL with search query
    const url = new URL(`${API_URL}/product`);
    const params = new URLSearchParams();

    if (search) {
      params.append("search", search);
    }

    if (categoryId) {
      params.append("category_id", categoryId.toString());
    }
    // if (isReccomended !== undefined) {
    //   params.append("isReccomended", isReccomended.toString());
    // }
    // if (isPopular !== undefined) {
    //   params.append("is_popular", isPopular.toString());
    // }
    if (type) {
      params.append("type", type.toString());
    }

    url.search = params.toString();


    const response = await fetch(url.toString(), {
      cache: "no-store",
      headers: {
        lang: locale,
      },
    });

    if (!response.ok) throw new Error("Unable to fetch products.");

    return response.json();
  } catch (error) {
    console.log(error);
    // console.error(error);
    // throw error; // Re-throw the error after logging it
  }
};

export const getProductById = async (id: number, locale: Locale) => {
  try {
    // Construct the URL with search query
    const url = new URL(`${API_URL}/product/${id}`);

    const response = await fetch(url.toString(), {
      headers: {
        lang: locale,
      },
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Unable to fetch product by id.");

    return response.json();
  } catch (error) {}
};

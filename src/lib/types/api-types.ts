export type ResponseType = {
  status_code: number;
  message: string;
  error: string;
};

export type ProductType = {
  id: number;
  name: string;
  qty: number;
  price: string;
  images: string[];
  amount: number;
  category: {
    name: string;
  };
  discount: boolean;
  description: string;
  discount_price: string;
  discount_percent: string;
  feedbacks: CommentType[];
};

export enum ProductCategory {
  all,
  in_stock,
  author,
}

export type CategoryType = {
  id: number;
  name: string;
  products: ProductType[];
};

export type FaqItemType = {
  id: number;
  question: string;
  answer: string;
};

export type PaymentCardType = {
  id?: number;
  card_number: string;
  expire_month: string;
  expire_year: string;
  cvv?: string;
  is_visa: boolean;
};

export type UserAddressType = {
  id?: number;
  name_of_address: string;
  country: string;
  city: string;
  street: string;
  zip_code?: string;
  phone_number: string;
  is_main?: boolean;
};

export type OrderType = {
  total_price: number;
  given_discount: number;
  total_to_pay: number;
  user_location: {
    id: number;
  };
  user_credit_card: {
    id: number;
  };
  product: { id: number; amount: number }[];
};

enum Statuses {
  pending,
  approved,
  delivering,
  submitted,
}

type ProductTypeOrder = {
  to_pay: string;
  product_name: string;
  price: string;
  id: number;
  given_discount: string;
  amount: number;
  product: {
    id: number;
  };
};

export type OrderTypeGet = Omit<OrderType, "product"> & {
  id: number;
  order_items: ProductTypeOrder[];
  check_number: string;
  status: Statuses;
  created_at: string;
};

export type CommentType = {
  id?: number;
  text: string;
  images?: File;
  rate?: string;
  created_at?: string;
};

export type NewsType = {
  id: number;
  title: string;
  files: {
    id: number;
    path: string;
    mime_type: string;
  }[];
  description: string;
  created_at: string;
};

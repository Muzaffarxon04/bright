import ProfileOrders from "@/components/profile/profile-orders";
import { getOrders } from "@/services/ordersApi";
import React from "react";
import { Locale } from "../../../../../i18n.config";
import { OrderTypeGet } from "@/lib/types/api-types";

const Orders = async ({
  params: { locale },
}: {
  params: { locale: Locale };
}) => {
  const data: { data: OrderTypeGet[] } = await getOrders(locale);

  return (
    <div className="w-full max-w-[970px] md:pl-[45px] md:pr-[20px] mt-[32px] md:mt-[41px] px-[20px]">
      <ProfileOrders locale={locale} data={data} />
    </div>
  );
};

export default Orders;

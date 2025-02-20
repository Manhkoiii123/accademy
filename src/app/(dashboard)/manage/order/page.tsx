import OrderManage from "@/app/(dashboard)/manage/order/OrderManage";
import { LIMIT } from "@/constants";
import { fetchOrder } from "@/lib/actions/order.actions";
import { EOrderStatus } from "@/types/enums";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: {
    page: number;
    search: string;
    status: EOrderStatus;
  };
}) => {
  const data = await fetchOrder({
    page: searchParams.page || 1,
    limit: LIMIT,
    search: searchParams.search || "",
    status: searchParams.status,
  });
  return (
    <OrderManage
      totalCount={data?.totalCount || 0}
      orders={JSON.parse(JSON.stringify(data?.orders ?? []))}
    />
  );
};

export default page;

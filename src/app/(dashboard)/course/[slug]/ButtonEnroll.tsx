"use client";
import { Button } from "@/components/ui/button";
import { IUser } from "@/database/user.modal";
import { createOrder } from "@/lib/actions/order.actions";
import { createOrderCode } from "@/utils";
import React from "react";
import { toast } from "react-toastify";

const ButtonEnroll = ({
  user,
  courseId,
  amount,
}: {
  user: IUser | undefined | null;
  courseId: string;
  amount: number;
}) => {
  const handleBuyCourse = async () => {
    if (!user?.name) {
      toast.error("Vui lòng đăng nhập để mua khóa học");
      return;
    }
    const orderCode = createOrderCode();
    const newOrder = await createOrder({
      code: orderCode,
      user: user._id,
      course: courseId,
      amount,
      total: amount,
    });
    console.log("🚀 ~ handleBuyCourse ~ newOrder:", newOrder);
  };
  return (
    <Button className="w-full" variant={"primary"} onClick={handleBuyCourse}>
      Mua khóa học
    </Button>
  );
};

export default ButtonEnroll;

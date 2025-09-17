"use server";

import Coupon, { ICoupon } from "@/database/coupon.modal";
import { connectToDatabase } from "../mongoose";
import { revalidatePath } from "next/cache";
import { TCreateCouponParams, TUpdateCouponParams } from "../../types";

export async function createCoupon(params: TCreateCouponParams) {
  try {
    connectToDatabase();
    const existingCoupon = await Coupon.findOne({ code: params.code });
    if (existingCoupon?.code) {
      return { error: "Mã giảm giá đã tồn tại!" };
    }
    const couponRegex = /^[A-Z0-9]{3,10}$/;
    if (!couponRegex.test(params.code)) {
      return { error: "Mã giảm giá không hợp lệ" };
    }
    const newCoupon = await Coupon.create(params);
    revalidatePath("/manage/coupon");
    return JSON.parse(JSON.stringify(newCoupon));
  } catch (error) {
    console.log(error);
  }
}
export async function updateCoupon(params: TUpdateCouponParams) {
  try {
    connectToDatabase();
    const updatedCoupon = await Coupon.findByIdAndUpdate(
      params._id,
      params.updateData
    );

    revalidatePath("/manage/coupon");

    return JSON.parse(JSON.stringify(updatedCoupon));
  } catch (error) {
    console.log(error);
  }
}

export async function getCouponByCode(params: {
  code: string;
}): Promise<any | undefined> {
  try {
    connectToDatabase();
    const findCoupon = await Coupon.findOne({
      code: params.code,
    }).populate({
      path: "courses",
      select: "_id title",
    });
    const coupon = JSON.parse(JSON.stringify(findCoupon));

    return coupon;
  } catch (error) {
    console.log(error);
  }
}
export async function getCoupons(params: any): Promise<ICoupon[] | undefined> {
  try {
    connectToDatabase();
    const coupons = await Coupon.find(params);
    return JSON.parse(JSON.stringify(coupons));
  } catch (error) {
    console.log(error);
  }
}

export async function deleteCoupon(code: string) {
  try {
    connectToDatabase();
    await Coupon.findOneAndDelete({ code });
    revalidatePath("/manage/coupon");
  } catch (error) {
    console.log(error);
  }
}

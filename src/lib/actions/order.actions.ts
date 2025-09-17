"use server";
import { LIMIT } from "@/constants";
import Course from "@/database/course.modal";
import Order, { IOrder } from "@/database/order.modal";
import User from "@/database/user.modal";
import { connectToDatabase } from "@/lib/mongoose";
import { TCreateOrderParams, TGetAllCourseParams } from "@/types";
import { EOrderStatus } from "@/types/enums";
import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";
import Coupon from "../../database/coupon.modal";
export async function createOrder(params: TCreateOrderParams) {
  try {
    connectToDatabase();
    const newOrder = await Order.create(params);
    if (params.coupon) {
      await Coupon.findByIdAndUpdate(params.coupon, {
        $inc: { used: 1 },
      });
    }
    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    console.log(error);
  }
}
export async function fetchOrder(
  params?: TGetAllCourseParams
): Promise<{ orders: IOrder[]; totalCount: number } | undefined> {
  try {
    connectToDatabase();
    const limit = params?.limit || LIMIT;
    const page = params?.page || 1;
    const search = params?.search;
    const status = params?.status;
    const skip = (page - 1) * limit;

    const matchQuery: any = {};

    if (status) {
      matchQuery.status = status;
    }

    const searchQuery: any = [];

    if (search) {
      searchQuery.push({
        "courseData.title": { $regex: search, $options: "i" },
      });
      searchQuery.push({ "userData.name": { $regex: search, $options: "i" } });
      searchQuery.push({ code: { $regex: search, $options: "i" } });
    }

    if (searchQuery.length > 0) {
      matchQuery.$or = searchQuery;
    }

    const orders = await Order.aggregate([
      {
        $lookup: {
          from: "courses",
          localField: "course",
          foreignField: "_id",
          as: "courseData",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userData",
        },
      },
      {
        $lookup: {
          from: "coupons",
          localField: "coupon",
          foreignField: "_id",
          as: "couponData",
        },
      },
      { $unwind: "$courseData" },
      {
        $unwind: {
          path: "$couponData",
          preserveNullAndEmptyArrays: true,
        },
      },
      { $unwind: "$userData" },
      { $match: matchQuery },
      { $sort: { created_at: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          _id: 1,
          code: 1,
          status: 1,
          created_at: 1,
          amount: 1,
          discount: 1,
          total: 1,
          // coupon: 1,
          "course.title": "$courseData.title",
          "user.name": "$userData.name",
          coupon: "$couponData.code",
        },
      },
    ]);

    const totalCount = await Order.aggregate([
      {
        $lookup: {
          from: "courses",
          localField: "course",
          foreignField: "_id",
          as: "courseData",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userData",
        },
      },
      { $unwind: "$courseData" },
      { $unwind: "$userData" },
      { $match: matchQuery },
      { $count: "totalCount" },
    ]);

    return { orders, totalCount: totalCount[0]?.totalCount || 0 };
  } catch (error) {
    console.log(error);
  }
}
export async function updateOrderStatus({
  orderId,
  status,
}: {
  orderId: string;
  status: EOrderStatus;
}) {
  try {
    connectToDatabase();
    const order = await Order.findById(orderId)
      .populate({
        path: "course",
        model: Course,
        select: "_id",
      })
      .populate({
        path: "user",
        model: User,
        select: "_id",
      });
    if (!order) {
      return;
    }
    const user = await User.findById(order.user._id);
    if (order.status === EOrderStatus.CANCELED) {
      return;
    }
    if (status === EOrderStatus.CANCELED) {
      await Order.findByIdAndUpdate(orderId, { status: EOrderStatus.CANCELED });
    }
    if (
      status === EOrderStatus.COMPLETED &&
      order.status === EOrderStatus.PENDING
    ) {
      await Order.findByIdAndUpdate(orderId, {
        status: EOrderStatus.COMPLETED,
      });
      user.courses.push(order.course._id);
      await user.save();
    }
    if (
      status === EOrderStatus.CANCELED &&
      order.status === EOrderStatus.COMPLETED
    ) {
      await Order.findByIdAndUpdate(orderId, {
        status: EOrderStatus.PENDING,
      });
      user.courses.pull(order.course._id);
      await user.save();
    }
    revalidatePath("/manage/order");
    revalidatePath("/study");
    return { success: true };
  } catch (error) {
    console.log(error);
  }
}
export async function getOrderDetails({
  code,
}: {
  code: string;
}): Promise<any | undefined> {
  try {
    connectToDatabase();
    const order = await Order.findOne({
      code,
    }).populate({
      path: "course",
      select: "title",
    });

    return JSON.parse(JSON.stringify(order));
  } catch (error) {
    console.log(error);
  }
}

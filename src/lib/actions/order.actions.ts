"use server";
import Order from "@/database/order.modal";
import { connectToDatabase } from "@/lib/mongoose";
import { TCreateOrderParams } from "@/types";

export async function createOrder(params: TCreateOrderParams) {
  try {
    connectToDatabase();
    const newOrder = await Order.create(params);
    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    console.log(error);
  }
}

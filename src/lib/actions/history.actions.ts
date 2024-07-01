"use server";

import History, { IHistory } from "@/database/history.modal";
import User from "@/database/user.modal";
import { connectToDatabase } from "@/lib/mongoose";
import { TCreateHistoryParams } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createHistory(params: TCreateHistoryParams) {
  try {
    connectToDatabase();
    const { userId } = auth();
    const findUser = await User.findOne({ clerkId: userId });
    if (!findUser) return;
    if (params.checked) {
      await History.create({
        course: params.course,
        lesson: params.lesson,
        user: findUser._id,
      });
    } else {
      await History.findOneAndDelete({
        course: params.course,
        lesson: params.lesson,
        user: findUser._id,
      });
    }
    revalidatePath(params.path || "");
  } catch (error) {
    console.log("🚀 ~ createHistory ~ error:", error);
  }
}
export async function getHistory(params: {
  course: string;
}): Promise<IHistory[] | undefined> {
  try {
    connectToDatabase();
    const { userId } = auth();
    const findUser = await User.findOne({ clerkId: userId });
    if (!findUser) return;
    const histories = await History.find({
      course: params.course,
      user: findUser._id,
    });
    return histories;
  } catch (error) {
    console.log("🚀 ~ getHistory ~ error:", error);
  }
}

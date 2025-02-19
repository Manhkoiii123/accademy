// những action liên quan đến user trong này
// chạy ở phía server
"use server";

import Course, { ICourse } from "@/database/course.modal";
import User, { IUser } from "@/database/user.modal";
import { connectToDatabase } from "@/lib/mongoose";
import { TCreateUserParams } from "@/types";
import { ECourseStatus } from "@/types/enums";
import { auth } from "@clerk/nextjs/server";

export async function createUser(params: TCreateUserParams) {
  try {
    connectToDatabase();
    const newUser = await User.create(params);
    return newUser;
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
}

export async function getUserInfo({
  userId,
}: {
  userId: string;
}): Promise<IUser | null | undefined> {
  // cái userId là cái clerk Id (do dùng cái auth() => của clerk)
  try {
    connectToDatabase();
    const findUser = await User.findOne({ clerkId: userId });
    if (!findUser) {
      return null;
    }
    return findUser;
  } catch (error) {
    console.log(error);
  }
}
export async function getUserCourse(): Promise<ICourse[] | null | undefined> {
  try {
    connectToDatabase();
    const { userId } = auth();
    const findUser = await User.findOne({ clerkId: userId }).populate({
      path: "courses",
      model: Course,
      match: { status: ECourseStatus.APPROVED },
    });
    if (!findUser) {
      return null;
    }
    return findUser.courses;
  } catch (error) {
    console.log(error);
  }
}

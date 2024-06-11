// những action liên quan đến user trong này
// chạy ở phía server
"use server";

import User, { IUser } from "@/database/user.modal";
import { connectToDatabase } from "@/lib/mongoose";
import { TCreateUserParams } from "@/types";

export default async function createUser(
  params: TCreateUserParams
): Promise<TCreateUserParams | undefined> {
  try {
    connectToDatabase();
    const newUser: TCreateUserParams = await User.create(params);
    return newUser;
  } catch (error) {}
}

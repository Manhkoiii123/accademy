// những action liên quan đến user trong này
// chạy ở phía server
"user server";

import User, { IUser } from "@/database/user.modal";
import { connectToDatabase } from "@/lib/mongoose";

export default async function createUser(params: IUser) {
  try {
    connectToDatabase();
    const newUser = await User.create(params);
    return newUser;
  } catch (error) {}
}

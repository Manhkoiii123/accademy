"use server";
import mongoose from "mongoose";

//singleton => chỉ chạy 1 lần thôi
let isConnect = false;
export const connectToDatabase = async () => {
  if (!process.env.MONGODB_URL) {
    throw new Error("MongoDB url is not set");
  }
  if (isConnect) {
    console.log("mongodb is already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL!, {
      dbName: "ManhDemy",
    });
    isConnect = true;
    console.log("MongoDB connect success");
  } catch (error) {
    console.log("MongoDB connect failed");
  }
};

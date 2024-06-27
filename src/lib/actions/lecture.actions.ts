"use server";
import Course from "@/database/course.modal";
import Lecture from "@/database/lecture.modal";
import { connectToDatabase } from "@/lib/mongoose";
import { TCreateLectureParams, TUpdateLectureParams } from "@/types";
import { revalidatePath } from "next/cache";

export async function createLecture(params: TCreateLectureParams) {
  try {
    connectToDatabase();
    const findCourse = await Course.findById(params.course);
    if (!findCourse) return;
    const newLecture = await Lecture.create(params);
    findCourse.lectures.push(newLecture._id);
    findCourse.save();
    revalidatePath(params.path || "/");
    return {
      success: true,
    };
  } catch (error) {}
}

export async function updateLecture(params: TUpdateLectureParams) {
  try {
    connectToDatabase();
    await Lecture.findByIdAndUpdate(params.lectureId, params.updateData, {
      new: true,
    });
    revalidatePath(params.updateData.path || "/");
    return {
      success: true,
    };
  } catch (error) {
    console.log("🚀 ~ updatLecture ~ error:", error);
  }
}

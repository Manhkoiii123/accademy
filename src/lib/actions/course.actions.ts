"use server";
import Course, { ICourse } from "@/database/course.modal";
import Lecture from "@/database/lecture.modal";
import Lesson from "@/database/lesson.modal";
import { connectToDatabase } from "@/lib/mongoose";
import {
  TCourseUpdateParams,
  TCreateCourseParams,
  TUpdateCourseParams,
} from "@/types";
import { revalidatePath } from "next/cache";
export async function getAllCourse(): Promise<ICourse[] | undefined> {
  try {
    connectToDatabase();
    const courses = await Course.find();
    return courses;
  } catch (error) {
    console.log("🚀 ~ getAllCourse ~ error:", error);
  }
}
export async function getCourseBySlug({
  slug,
}: {
  slug: string;
}): Promise<TCourseUpdateParams | undefined> {
  try {
    connectToDatabase();
    const findCourse = await Course.findOne({ slug }).populate({
      path: "lectures",
      model: Lecture,
      select: "_id title",
      match: {
        _destroy: false,
      },
      populate: {
        path: "lessons",
        model: Lesson,
        match: {
          _destroy: false,
        },
      },
    });
    return JSON.parse(JSON.stringify(findCourse));
  } catch (error) {
    console.log("🚀 ~ getCourseBySlug ~ error:", error);
  }
}

export async function createCourse(params: TCreateCourseParams) {
  try {
    connectToDatabase();
    const existCourse = await Course.findOne({ slug: params.slug });
    if (existCourse) {
      return {
        success: false,
        message: "Đường dẫn tới khóa học đã tồn tại",
      };
    }
    const course = await Course.create(params);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(course)),
    };
  } catch (error) {
    console.log("🚀 ~ createCourse ~ error:", error);
  }
}
export async function updateCourse(params: TUpdateCourseParams) {
  try {
    connectToDatabase();
    const findCourse = await Course.findOne({ slug: params.slug });
    if (!findCourse) return;
    await Course.findOneAndUpdate({ slug: params.slug }, params.updateData, {
      new: true, // lưu cái mới nhất vào
    });
    revalidatePath(params.path || "/"); //muốn ở home refetch dữ liệu mới => dùng cái này
    return {
      success: true,
      message: "Update course successfully",
    };
  } catch (error) {
    console.log("🚀 ~ updateCourse ~ error:", error);
  }
}

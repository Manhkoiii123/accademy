"use server";
import { LIMIT } from "@/constants";
import Course, { ICourse } from "@/database/course.modal";
import Lecture from "@/database/lecture.modal";
import Lesson from "@/database/lesson.modal";
import { connectToDatabase } from "@/lib/mongoose";
import {
  TCourseUpdateParams,
  TCreateCourseParams,
  TGetAllCourseParams,
  TUpdateCourseParams,
} from "@/types";
import { ECourseStatus } from "@/types/enums";
import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";
export async function getAllCourse(
  params?: TGetAllCourseParams
): Promise<{ courses: ICourse[]; totalCount: number } | undefined> {
  try {
    connectToDatabase();
    const limit = params?.limit || LIMIT;
    const page = params?.page || 1;
    const search = params?.search;
    const status = params?.status;
    const skip = (page - 1) * limit;
    const query: FilterQuery<typeof Course> = {};

    if (search) {
      query.$or = [
        {
          title: { $regex: search, $options: "i" }, // Không phân biệt hoa thường
        },
      ];
    }
    if (status) {
      query.status = status;
    }

    const courses = await Course.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ created_at: -1 });

    const totalCount = await Course.countDocuments(query);

    return { courses: JSON.parse(JSON.stringify(courses)), totalCount };
  } catch (error) {
    console.log("🚀 ~ getAllCourse ~ error:", error);
  }
}
export async function getAllCoursePublic(): Promise<
  { courses: ICourse[]; totalCount: number } | undefined
> {
  try {
    connectToDatabase();
    const courses = await Course.find({
      status: ECourseStatus.APPROVED,
    });
    const totalCount = await Course.countDocuments();

    return { courses, totalCount };
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
    const findCourse = await Course.findOne({ slug })
      // .select("_id slug lectures ")
      .populate({
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

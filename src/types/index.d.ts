import { ICourse } from "@/database/course.modal";
import { ILesson } from "@/database/lesson.modal";

type TActiveLinkProps = {
  url: string;
  children: React.ReactNode;
};
type TMenuItem = {
  url: string;
  title: string;
  icon?: React.ReactNode;
  onlyIcon?: boolean;
};

type TCreateUserParams = {
  clerkId: string;
  name?: string;
  username: string;
  email: string;
  avatar?: string;
};

export type TCreateCourseParams = {
  title: string;
  slug: string;
  author: string;
};
export type TUpdateCourseParams = {
  slug: string;
  updateData: Partial<ICourse>; // dùng partial biến all các cái trong iCO thành ko bắt buộc
  path?: string;
};
export type TGetAllCourseParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
};
export interface TCourseUpdateParams extends Omit<ICourse, "lectures"> {
  lectures: TUpdateCourseLecture[];
}
export type TUpdateCourseLecture = {
  _id: string;
  title: string;
  lessons: ILesson[];
};
//lectures
export type TCreateLectureParams = {
  course: string;
  title?: string;
  order?: number;
  path?: string;
};
export type TUpdateLectureParams = {
  lectureId: string;
  updateData: {
    title?: string;
    order?: number;
    _destroy?: boolean;
    path?: string;
  };
};

//lesson
export type TCreateLessonParams = {
  lecture: string;
  course: string;
  title?: string;
  order?: number;
  path?: string;
  slug?: string;
};
export type TUpdateLessonParams = {
  lessonId: string;
  updateData: {
    _destroy?: boolean;
    title?: string;
    slug?: string;
    duration?: number;
    video_url?: string;
    content?: string;
  };
  path?: string;
};
export type TCreateHistoryParams = {
  course: string;
  lesson: string;
  checked: boolean | string;
  path: string;
};
export { TActiveLinkProps, TMenuItem, TCreateUserParams };

export type TCreateOrderParams = {
  code: string;
  course: string;
  user: string;
  total?: number;
  amount?: number;
  discount?: number;
  coupon?: string;
};

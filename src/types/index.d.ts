import { ICourse } from "@/database/course.modal";

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
export { TActiveLinkProps, TMenuItem, TCreateUserParams };

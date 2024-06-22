import CourseManage from "@/components/course/CourseManage";
import { getAllCourse } from "@/lib/actions/course.actions";
import React from "react";

const page = async () => {
  const courses = await getAllCourse();

  return (
    <CourseManage
      courses={courses ? JSON.parse(JSON.stringify(courses)) : []}
    />
  );
};

export default page;

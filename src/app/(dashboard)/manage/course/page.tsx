import CourseManage from "@/components/course/CourseManage";
import { getAllCourse } from "@/lib/actions/course.actions";
import { ECourseStatus } from "@/types/enums";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: {
    page: number;
    search: string;
    status: ECourseStatus;
  };
}) => {
  const data = await getAllCourse({
    page: searchParams.page || 1,
    limit: 4,
    search: searchParams.search || "",
    status: searchParams.status || ECourseStatus.APPROVED,
  });

  return (
    <CourseManage
      courses={data?.courses ? JSON.parse(JSON.stringify(data?.courses)) : []}
      totalCount={data?.totalCount || 0}
    />
  );
};

export default page;

import { Coursegrid } from "@/components/common";
import CourseItem from "@/components/course/CourseItem";
import Heading from "@/components/typography/Heading";
import { getAllCourse } from "@/lib/actions/course.actions";
import React from "react";

const page = async () => {
  const courses = await getAllCourse();
  return (
    <div>
      <Heading>Khu vực học tập</Heading>
      <Coursegrid>
        {courses &&
          courses.length > 0 &&
          courses.map((item) => {
            return <CourseItem key={item.slug} data={item} />;
          })}
      </Coursegrid>
    </div>
  );
};

export default page;

import { Coursegrid } from "@/components/common";
import CourseItem from "@/components/course/CourseItem";
import Heading from "@/components/typography/Heading";
import { getAllCoursePublic } from "@/lib/actions/course.actions";
import React from "react";

const page = async () => {
  const data = await getAllCoursePublic();
  return (
    <div>
      <Heading>Khám phá</Heading>
      <Coursegrid>
        {data?.courses &&
          data?.courses.length > 0 &&
          data?.courses.map((item) => {
            return <CourseItem key={item.slug} data={item} />;
          })}
      </Coursegrid>
    </div>
  );
};

export default page;

import { Coursegrid } from "@/components/common";
import CourseItem from "@/components/course/CourseItem";
import Heading from "@/components/typography/Heading";
import React from "react";

const page = () => {
  return (
    <>
      <Heading>Khu vực học tập</Heading>
      <Coursegrid>
        <CourseItem />
        <CourseItem />
        <CourseItem />
      </Coursegrid>
    </>
  );
};

export default page;

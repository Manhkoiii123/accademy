import { Coursegrid } from "@/components/common";
import CourseItem from "@/components/course/CourseItem";
import Heading from "@/components/typography/Heading";
import createUser from "@/lib/actions/user.actions";
import React from "react";

const page = async () => {
  return (
    <div>
      <Heading>Khám phá</Heading>
      <Coursegrid>
        <CourseItem />
        <CourseItem />
        <CourseItem />
      </Coursegrid>
    </div>
  );
};

export default page;

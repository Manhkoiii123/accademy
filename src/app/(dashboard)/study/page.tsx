import StudyCourse from "@/app/(dashboard)/study/components/StudyCourse";
import Heading from "@/components/typography/Heading";
import { getUserCourse } from "@/lib/actions/user.actions";
import React from "react";

const page = async () => {
  const courses = await getUserCourse();
  return (
    <div>
      <Heading>Khu vực học tập</Heading>
      <StudyCourse
        courses={courses ? JSON.parse(JSON.stringify(courses)) : []}
      ></StudyCourse>
    </div>
  );
};

export default page;

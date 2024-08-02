"use client";
import { Coursegrid } from "@/components/common";
import CourseItem from "@/components/course/CourseItem";
import { ICourse } from "@/database/course.modal";
import React from "react";

const StudyCourse = ({
  courses,
}: {
  courses: ICourse[] | null | undefined;
}) => {
  const lastLesson = JSON.parse(localStorage.getItem("lesson") || "[]") || [];

  return (
    <Coursegrid>
      {courses &&
        courses.length > 0 &&
        courses.map((item: any) => {
          const url = lastLesson.find((l: any) => l.course === item.slug);

          return (
            <CourseItem
              url={url?.lesson}
              key={item.slug}
              data={item}
              cta={"Tiếp tục học"}
            />
          );
        })}
    </Coursegrid>
  );
};

export default StudyCourse;

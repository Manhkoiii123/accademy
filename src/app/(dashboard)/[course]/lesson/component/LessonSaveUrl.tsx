"use client";

import { useEffect } from "react";

const LessonSaveUrl = ({ url, course }: { url: string; course: string }) => {
  useEffect(() => {
    // Muốn là nếu đang học khóa js bài 10 lần sau ấn vào nó phỉa là bài 10 =>
    // luuw 1 mảng gồm tên khóa học và bài học đang học
    /**
     * [{course:khoas 1,lesson:bai1}]
     */
    // localStorage.setItem("lessonLast", url);
    const res: any = JSON.parse(localStorage.getItem("lesson") || "[]") || [];

    const item = {
      course: course,
      lesson: url,
    };

    if (res.length > 0 && res.some((l: any) => l.course === course)) {
      const index = res.findIndex((l: any) => l.course === course);
      res[index] = item;
    } else {
      res.push(item);
    }

    localStorage.setItem("lesson", JSON.stringify(res));
  }, [url, course]);

  return null;
};

export default LessonSaveUrl;

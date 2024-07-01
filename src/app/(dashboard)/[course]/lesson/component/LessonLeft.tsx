import ButtonNavigateLesson from "@/app/(dashboard)/[course]/lesson/component/ButtonNavigateLesson";
import React from "react";
import Heading from "@/components/common/Heading";
import { ILesson } from "@/database/lesson.modal";
const LessonLeft = ({
  videoId,
  course,
  prevLesson,
  nextLesson,
  lessonDetail,
}: {
  videoId: string | null | undefined;
  course: string;
  prevLesson?: ILesson;
  nextLesson?: ILesson;
  lessonDetail: ILesson;
}) => {
  return (
    <div>
      <div className="relative mb-5 aspect-video">
        <iframe
          className="w-full h-full object-fill"
          src={`https://www.youtube.com/embed/${videoId || ""}`}
          title="Crazy Scroll Animation Using CSS Only"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
      </div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex gap-3">
          <ButtonNavigateLesson
            course={course}
            prevLesson={prevLesson}
            type="prev"
          />

          <ButtonNavigateLesson
            course={course}
            nextLesson={nextLesson}
            type="next"
          />
        </div>
      </div>
      <Heading classname="my-10 ">{lessonDetail.title}</Heading>
      {lessonDetail.content && (
        <div className="p-5 rounded-lg bgDarkMode border borderDarkMode entry-content">
          <div
            dangerouslySetInnerHTML={{ __html: lessonDetail.content || "" }}
          />
        </div>
      )}
    </div>
  );
};

export default LessonLeft;

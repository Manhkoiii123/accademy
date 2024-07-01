import LessonItem from "@/components/lesson/LessonItem";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IHistory } from "@/database/history.modal";
import { ILecture } from "@/database/lecture.modal";
import { TUpdateCourseLecture } from "@/types";
import React from "react";

const LessonRight = ({
  completePercent,
  lectures,
  course,
  slug,
  histories,
}: {
  completePercent: number;
  lectures: TUpdateCourseLecture[];
  course: string;
  slug: string;
  histories?: IHistory[];
}) => {
  return (
    <div className="sticky top-10 right-0 max-h-[calc(100svh-100px)] overflow-y-auto">
      <div className="h-3 w-full rounded-full border borderDarkMode bgDarkMode mb-2">
        <div
          className=" h-full rounded-full bg-secondary transition-all"
          style={{
            width: `${completePercent}%`,
          }}
        ></div>
      </div>
      <div className="flex flex-col gap-5">
        {lectures.map((lecture, index) => (
          <Accordion
            collapsible
            key={lecture._id}
            type="single"
            className="w-full"
          >
            <AccordionItem value={lecture._id}>
              <AccordionTrigger>
                <div className="flex items-center gap-3 justify-between w-full pr-5">
                  <div className="line-clamp-1">{lecture.title}</div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="!bg-transparent border-none p-0">
                <div className="flex flex-col gap-3">
                  {lecture.lessons.map((l) => (
                    <LessonItem
                      course={course}
                      key={l._id}
                      l={l ? JSON.parse(JSON.stringify(l)) : {}}
                      isActive={l.slug === slug}
                      isChecked={histories?.some(
                        (el) => el.lesson.toString() === l._id.toString()
                      )}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default LessonRight;

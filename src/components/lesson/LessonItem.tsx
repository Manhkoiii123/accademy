import { IconPlay, IconWatch } from "@/components/icons";
import { ILesson } from "@/database/lesson.modal";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const LessonItem = ({
  l,
  course,
  isActive,
}: {
  l: ILesson;
  course?: string;
  isActive?: boolean;
}) => {
  if (!course) {
    return (
      <>
        <div className="hidden md:block">
          <div className="flex items-center gap-3 bgDarkMode border text-sm font-medium borderDarkMode rounded-lg p-3">
            <IconPlay className="size-4 flex-shrink-0" />
            <h4>{l.title}</h4>
            <span className="ml-auto text-xs font-font-semibold">
              {l.duration} phút
            </span>
          </div>
        </div>
        <div className="block md:hidden bgDarkMode border text-sm font-medium borderDarkMode rounded-lg p-3 ">
          <div className="flex items-center gap-3 mb-3">
            <IconPlay className="size-4 flex-shrink-0" />
            <h4 className="line-clamp-1">{l.title}</h4>
          </div>
          <div className="flex items-center gap-3 ">
            <IconWatch className="size-4 flex-shrink-0" />
            <span className=" text-xs font-font-semibold">
              {l.duration} phút
            </span>
          </div>
        </div>
      </>
    );
  }
  return (
    <Link
      href={`/${course}/lesson?slug=${l.slug}`}
      className={cn(
        "bgDarkMode border text-sm font-medium borderDarkMode rounded-lg p-3 ",
        isActive ? "text-primary font-semibold pointer-events-none" : ""
      )}
    >
      <div className="flex items-center gap-3 mb-3">
        <IconPlay className="size-4 flex-shrink-0" />
        <h4 className="line-clamp-1">{l.title}</h4>
      </div>
      <div className="flex items-center gap-3 ">
        <IconWatch className="size-4 flex-shrink-0" />
        <span className=" text-xs font-font-semibold">{l.duration} phút</span>
      </div>
    </Link>
  );
};

export default LessonItem;

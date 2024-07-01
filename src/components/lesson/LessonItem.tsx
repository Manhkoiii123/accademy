"use client";
import { IconPlay, IconWatch } from "@/components/icons";
import { Checkbox } from "@/components/ui/checkbox";
import { ILesson } from "@/database/lesson.modal";
import { createHistory } from "@/lib/actions/history.actions";
import { cn } from "@/lib/utils";
import { CheckedState } from "@radix-ui/react-checkbox";
import Link from "next/link";
import React from "react";

const LessonItem = ({
  l,
  course,
  isActive = false,
  isChecked = false,
}: {
  l: ILesson;
  course?: string;
  isActive?: boolean;
  isChecked?: boolean;
}) => {
  const handleCompleteLesson = async (checked: string | boolean) => {
    try {
      await createHistory({
        course: l.course.toString(),
        lesson: l._id,
        checked: checked,
        path: `/${course}/lesson?slug=${l.slug}`,
      });
    } catch (error) {
      console.log("🚀 ~ handleCompleteLesson ~ error:", error);
    }
  };

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
    <div
      className={cn(
        "bgDarkMode border text-sm font-medium borderDarkMode rounded-lg p-3 ",
        isActive ? "text-primary font-semibold " : ""
      )}
    >
      <div className="flex items-center gap-3 mb-3">
        <Checkbox
          onCheckedChange={(checked) => handleCompleteLesson(checked)}
          defaultChecked={isChecked}
          className="flex-shrink-0  size-4"
        />
        <Link
          href={`/${course}/lesson?slug=${l.slug}`}
          className={`flex items-center gap-3 cursor-pointer ${
            isActive ? "pointer-events-none" : ""
          }`}
        >
          <IconPlay className="size-4 flex-shrink-0" />
          <h4 className="line-clamp-1">{l.title}</h4>
        </Link>
      </div>
      <div className="flex items-center gap-3 ">
        <IconWatch className="size-4 flex-shrink-0" />
        <span className=" text-xs font-font-semibold">{l.duration} phút</span>
      </div>
    </div>
  );
};

export default LessonItem;

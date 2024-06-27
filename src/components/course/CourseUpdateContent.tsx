"use client";
import React, { MouseEvent, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { commonClassNames } from "@/constants";
import { IconDelete, IconEdit } from "@/components/icons";
import { createLecture, updateLecture } from "@/lib/actions/lecture.actions";
import { toast } from "react-toastify";
import { TCourseUpdateParams, TUpdateCourseLecture } from "@/types";
import Swal from "sweetalert2";
import { useImmer } from "use-immer";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const CourseUpdateContent = ({ course }: { course: TCourseUpdateParams }) => {
  const [lectureEdit, setLectureEdit] = useState("");
  console.log("🚀 ~ CourseUpdateContent ~ lectureEdit:", lectureEdit);
  const [lectureIdEdit, setLectureIdEdit] = useState("");
  const lectures = course.lectures;
  const handleAddNewLecture = async () => {
    try {
      const res = await createLecture({
        course: course._id,
        title: "Chương 1: Giới thiệu khóa học",
        order: lectures.length + 1,
        path: `manage/course/update-content?slug=${course.slug}`,
      });
      if (res?.success) {
        toast.success("Thêm chương mới thành công");
      }
    } catch (error) {
      console.log("🚀 ~ handleAddNewLecture ~ error:", error);
    }
  };
  const handleDeleteLecture = async (
    e: MouseEvent<HTMLSpanElement>,
    lectureId: string
  ) => {
    e.stopPropagation();
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await updateLecture({
            lectureId,
            updateData: {
              _destroy: true,
              path: `manage/course/update-content?slug=${course.slug}`,
            },
          });
          if (res?.success) {
            toast.success("Xóa chương thành công");
          }
        }
      });
    } catch (error) {
      console.log("🚀 ~ handleDeleteLecture ~ error:", error);
    }
  };
  const handleUpdateLecture = async (id: string) => {
    const res = await updateLecture({
      lectureId: id,
      updateData: {
        title: lectureEdit,
        path: `manage/course/update-content?slug=${course.slug}`,
      },
    });
    if (res?.success) {
      setLectureEdit("");
      setLectureIdEdit("");
      toast.success("Cập nhật chương thành công");
    }
  };
  return (
    <div>
      <div className="flex flex-col gap-5">
        {lectures.map((lecture, index) => (
          <Accordion
            collapsible={!lectureIdEdit}
            key={lecture._id}
            type="single"
            className="w-full"
          >
            <AccordionItem value={lecture._id}>
              <AccordionTrigger>
                <div className="flex items-center gap-3 justify-between w-full pr-5">
                  {lecture._id === lectureIdEdit ? (
                    <div
                      className="w-full"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Input
                        defaultValue={lecture.title}
                        onChange={(e) => {
                          e.stopPropagation();
                          setLectureEdit(e.target.value);
                        }}
                        placeholder="Tên chương"
                      />
                    </div>
                  ) : (
                    <div>{lecture.title}</div>
                  )}

                  {lecture._id === lectureIdEdit ? (
                    <div className="flex gap-2">
                      <span
                        className={cn(
                          commonClassNames.action,
                          "text-green-500"
                        )}
                        onClick={async (e) => {
                          e.stopPropagation();
                          setLectureEdit(lecture.title);
                          await handleUpdateLecture(lecture._id);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                      </span>
                      <span
                        className={cn(commonClassNames.action, "text-red-500")}
                        onClick={(e) => {
                          e.stopPropagation();
                          setLectureIdEdit("");
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </span>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <span
                        className={commonClassNames.action}
                        onClick={(e) => {
                          e.stopPropagation();
                          setLectureIdEdit(lecture._id);
                        }}
                      >
                        <IconEdit />
                      </span>
                      <span
                        className={commonClassNames.action}
                        onClick={(e) => handleDeleteLecture(e, lecture._id)}
                      >
                        <IconDelete />
                      </span>
                    </div>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent></AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
      <Button onClick={handleAddNewLecture} className="mt-5">
        Thêm chương mới
      </Button>
    </div>
  );
};

export default CourseUpdateContent;

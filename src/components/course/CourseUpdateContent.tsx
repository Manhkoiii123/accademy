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
import {
  IconCancel,
  IconCheck,
  IconDelete,
  IconEdit,
} from "@/components/icons";
import { createLecture, updateLecture } from "@/lib/actions/lecture.actions";
import { toast } from "react-toastify";
import { TCourseUpdateParams, TUpdateCourseLecture } from "@/types";
import Swal from "sweetalert2";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { createLesson, updateLesson } from "@/lib/actions/lession.actions";
import slugify from "slugify";
import LessonItemUpdate from "@/components/lesson/LessonItemUpdate";

const CourseUpdateContent = ({ course }: { course: TCourseUpdateParams }) => {
  const [lectureEdit, setLectureEdit] = useState("");
  const [lectureIdEdit, setLectureIdEdit] = useState("");
  const [lessonIdEdit, setLessonIdEdit] = useState("");
  const [lessonEdit, setLessonEdit] = useState("");
  const lectures = course.lectures;
  const handleAddNewLecture = async () => {
    try {
      const res = await createLecture({
        course: course._id,
        title: "Chương mới khóa học",
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
  const handleAddNewLesson = async (lectureId: string, courseId: string) => {
    try {
      const res = await createLesson({
        lecture: lectureId,
        course: courseId,
        title: "Tiêu đề bài học mới",
        slug: `tieu-de-bai-hoc-moi-${new Date()
          .getTime()
          .toString()
          .slice(-3)}`,
        path: `manage/course/update-content?slug=${course.slug}`,
      });
      if (res?.success) {
        toast.success("Thêm mới thành công");
        return;
      }
      toast.error("Thêm mới thất bại");
    } catch (error) {
      console.log("🚀 ~ handleAddNewLesson ~ error:", error);
    }
  };
  const handleUpdateLesson = async (
    e: MouseEvent<HTMLSpanElement>,
    lessonId: string,
    title: string,
    slug: string
  ) => {
    e.stopPropagation();
    try {
      const res = await updateLesson({
        lessonId,
        path: `/manage/course/update-content?slug=${course.slug}`,
        updateData: {
          title: lessonEdit === "" ? title : lessonEdit,
          slug:
            lessonEdit === ""
              ? slug
              : slugify(lessonEdit, {
                  lower: true,
                  locale: "vi",
                  remove: /[*+~.()'"!:@]/g,
                }),
        },
      });
      if (res?.success) {
        toast.success("Cập nhật bài học thành công!");
        setLessonEdit("");
        setLessonIdEdit("");
      }
    } catch (error) {}
  };
  const handleDeleteLesson = (e: MouseEvent<HTMLSpanElement>, id: string) => {
    e.stopPropagation();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await updateLesson({
          lessonId: id,
          updateData: {
            _destroy: true,
          },
          path: `manage/course/update-content?slug=${course.slug}`,
        });
        if (res?.success) {
          toast.success("Xóa chương thành công");
        }
      }
    });
  };
  return (
    <div>
      <div className="flex flex-col gap-5">
        {lectures.map((lecture, index) => (
          <div key={lecture._id}>
            <Accordion
              collapsible={!lectureEdit}
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
                          <IconCheck />
                        </span>
                        <span
                          className={cn(
                            commonClassNames.action,
                            "text-red-500"
                          )}
                          onClick={(e) => {
                            e.stopPropagation();
                            setLectureIdEdit("");
                          }}
                        >
                          <IconCancel />
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
                <AccordionContent>
                  <div className="flex flex-col gap-5">
                    {lecture.lessons.map((lesson) => (
                      <Accordion
                        type="single"
                        collapsible={!lessonEdit}
                        key={lesson._id}
                      >
                        <AccordionItem value={lesson._id}>
                          <AccordionTrigger>
                            <div className="flex items-center gap-3 justify-between w-full pr-5">
                              {lesson._id === lessonIdEdit ? (
                                <>
                                  <div className="w-full">
                                    <Input
                                      placeholder="Tên bài học"
                                      defaultValue={lesson.title}
                                      onChange={(e) =>
                                        setLessonEdit(e.target.value)
                                      }
                                    />
                                  </div>
                                  <div className="flex gap-2">
                                    <span
                                      className={cn(
                                        commonClassNames.action,
                                        "text-green-500"
                                      )}
                                      onClick={(e) =>
                                        handleUpdateLesson(
                                          e,
                                          lesson._id,
                                          lesson.title,
                                          lesson.slug
                                        )
                                      }
                                    >
                                      <IconCheck />
                                    </span>
                                    <span
                                      className={cn(
                                        commonClassNames.action,
                                        "text-red-500"
                                      )}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setLessonIdEdit("");
                                      }}
                                    >
                                      <IconCancel />
                                    </span>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div>{lesson.title}</div>
                                  <div className="flex gap-2">
                                    <span
                                      className={cn(
                                        commonClassNames.action,
                                        "text-blue-500"
                                      )}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setLessonIdEdit(lesson._id);
                                      }}
                                    >
                                      <IconEdit />
                                    </span>
                                    <span
                                      className={cn(
                                        commonClassNames.action,
                                        "text-red-500"
                                      )}
                                      onClick={(e) =>
                                        handleDeleteLesson(e, lesson._id)
                                      }
                                    >
                                      <IconDelete />
                                    </span>
                                  </div>
                                </>
                              )}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <LessonItemUpdate lesson={lesson} />
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Button
              onClick={() => handleAddNewLesson(lecture._id, course._id)}
              className="mt-5 ml-auto w-fit block"
            >
              Thêm bài học
            </Button>
          </div>
        ))}
      </div>
      <Button onClick={handleAddNewLecture} className="mt-5">
        Thêm chương mới
      </Button>
    </div>
  );
};

export default CourseUpdateContent;

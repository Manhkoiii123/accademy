import ButtonNavigateLesson from "@/app/(dashboard)/[course]/lesson/component/ButtonNavigateLesson";
import LessonSaveUrl from "@/app/(dashboard)/[course]/lesson/component/LessonSaveUrl";
import PageNotFound from "@/app/not-found";
import Heading from "@/components/common/Heading";
import { IconLeftArrow, IconRightArrow } from "@/components/icons";
import LessonItem from "@/components/lesson/LessonItem";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import { getHistory } from "@/lib/actions/history.actions";
import { findAllLessons, getLessonBySlug } from "@/lib/actions/lession.actions";
import { useRouter } from "next/navigation";
import React from "react";

const page = async ({
  params,
  searchParams,
}: {
  params: { course: string };
  searchParams: {
    slug: string;
  };
}) => {
  const course = params.course;
  const slug = searchParams.slug;
  const findcourse = await getCourseBySlug({ slug: course });
  const courseId = findcourse?._id.toString();
  if (!findcourse || !slug) return <PageNotFound />;
  const lessonDetail = await getLessonBySlug({
    slug,
    course: courseId || "",
  });
  const lessonList = await findAllLessons({ course: courseId || "" });

  const currentLessonIndex =
    lessonList?.findIndex(
      // (item) => item._id.toString() === lessonDetail?._id.toString()
      (item) => item.slug === lessonDetail?.slug
    ) || 0;
  const nextLesson = lessonList?.[currentLessonIndex + 1];
  const prevLesson = lessonList?.[currentLessonIndex - 1];
  if (!lessonDetail) return <PageNotFound />;
  let videoId;
  if (lessonDetail?.video_url) {
    const urlParams = new URLSearchParams(
      new URL(lessonDetail?.video_url!).search
    );
    videoId = urlParams.get("v");
  }
  const lectures = findcourse.lectures || [];

  const histories = await getHistory({ course: courseId! });

  const completePercent =
    ((histories?.length || 0) / (lessonList?.length || 1)) * 100;

  return (
    <div className="grid lg:pb-0 pb-20 xl:grid-cols-[minmax(0,2fr),minmax(0,1fr)] gap-10 min-h-screen items-start">
      <LessonSaveUrl url={`/${course}/lesson?slug=${slug}`} course={course} />
      <div>
        <div className="relative mb-5 aspect-video">
          <iframe
            className="w-full h-full object-fill"
            src={`https://www.youtube.com/embed/${videoId}`}
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
    </div>
  );
};

export default page;

import ButtonNavigateLesson from "@/app/(dashboard)/[course]/lesson/component/ButtonNavigateLesson";
import LessonSaveUrl from "@/app/(dashboard)/[course]/lesson/component/LessonSaveUrl";
import PageNotFound from "@/app/not-found";
import Heading from "@/components/common/Heading";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import { findAllLessons } from "@/lib/actions/lession.actions";
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
  const findcourse = await getCourseBySlug({ slug: course });
  const courseId = findcourse?._id.toString();
  const lessonList = await findAllLessons({ course: courseId || "" });
  const slug = searchParams.slug ? searchParams.slug : lessonList?.[0].slug;
  const lessonDetail = lessonList?.find((el) => el.slug === slug);
  if (!lessonDetail) return null;
  const currentLessonIndex =
    lessonList?.findIndex((item) => item.slug === lessonDetail?.slug) || 0;
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
  return (
    <div>
      <LessonSaveUrl url={`/${course}/lesson?slug=${slug}`} course={course} />
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
  );
};

export default page;

import PageNotFound from "@/app/not-found";
import { IconLeftArrow, IconRightArrow } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import { getLessonBySlug } from "@/lib/actions/lession.actions";
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
  if (!findcourse || !slug) return <PageNotFound />;
  const lessonDetail = await getLessonBySlug({
    slug,
    course: findcourse?._id.toString(),
  });
  if (!lessonDetail) return <PageNotFound />;
  let videoId;
  if (lessonDetail?.video_url) {
    const urlParams = new URLSearchParams(
      new URL(lessonDetail?.video_url!).search
    );
    videoId = urlParams.get("v");
  }
  return (
    <div className="grid lg:pb-0 pb-20 lg:grid-cols-[2fr,1fr] gap-10 min-h-screen">
      <div>
        <div className="relative mb-5 aspect-video">
          <iframe
            className="w-full h-full object-fill"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="Crazy Scroll Animation Using CSS Only"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <Button className="size-10 p-3">
              <IconLeftArrow />
            </Button>
            <Button className="size-10 p-3">
              <IconRightArrow />
            </Button>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default page;

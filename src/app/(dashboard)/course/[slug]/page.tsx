import PageNotFound from "@/app/not-found";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import { ECourseStatus } from "@/types/enums";
import Image from "next/image";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LessonItem from "@/components/lesson/LessonItem";
import { auth } from "@clerk/nextjs/server";
import { getUserInfo } from "@/lib/actions/user.actions";
import CourseWidget from "@/app/(dashboard)/course/[slug]/CourseWidget";
import { courseLevelTitle } from "@/constants";

const page = async ({ params }: { params: { slug: string } }) => {
  const data = await getCourseBySlug({ slug: params.slug });
  // const videoId = data?.intro_url.split("=")[1];
  let videoId;
  if (data?.intro_url) {
    const urlParams = new URLSearchParams(new URL(data?.intro_url!).search);
    videoId = urlParams.get("v");
  }
  const { userId } = auth();
  const findUser = await getUserInfo({ userId: userId! });
  const userCourses = findUser?.courses.map((c) => c.toString());
  if (!data) return null;
  if (data.status !== ECourseStatus.APPROVED) return <PageNotFound />;
  return (
    <div className="grid lg:pb-0 pb-20 lg:grid-cols-[2fr,1fr] gap-10 min-h-screen">
      <div className="">
        <div className="relative aspect-video mb-5">
          {data.intro_url && videoId ? (
            <>
              <iframe
                width="702"
                height="395"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="Cris Phan quyết tâm ăn sướng, ngủ sướng trong 2 Ngày 1 Đêm Reaction tập 51"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className="w-full h-full object-fill"
              ></iframe>
            </>
          ) : (
            <Image
              alt="image course"
              src={data.image}
              fill
              className="w-full h-full object-cover rounded-lg"
              sizes="@media (min-width:640px) 300px, 100vw"
              priority // độ ưu tiên load trước
            />
          )}
        </div>
        <h1 className="font-bold text-3xl mb-5">{data?.title}</h1>

        <BoxSection title="Mô tả">
          <div className="leading-normal">{data.desc}</div>
        </BoxSection>
        <BoxSection title="Thông tin khóa học">
          <div className="grid  lg:grid-cols-4 gap-5 mt-5">
            <BoxInfo title="Bài học">100</BoxInfo>
            <BoxInfo title="Lượt xem">{data.views.toLocaleString()}</BoxInfo>
            <BoxInfo title="Trình độ">{courseLevelTitle[data.level]}</BoxInfo>
            <BoxInfo title="Thời lượng">100h45p</BoxInfo>
          </div>
        </BoxSection>
        {data.lectures.length > 0 && (
          <BoxSection title="Nội dung khóa học">
            <div className="flex flex-col gap-5">
              {data.lectures.map((lecture, index) => (
                <Accordion
                  collapsible
                  key={lecture._id}
                  type="single"
                  className="w-full"
                >
                  <AccordionItem value={lecture._id}>
                    <AccordionTrigger>
                      <div className="flex items-center gap-3 justify-between w-full pr-5">
                        <div>{lecture.title}</div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="!bg-transparent border-none p-0">
                      <div className="flex flex-col gap-3">
                        {lecture.lessons.map((l) => (
                          <LessonItem key={l._id} l={l} />
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>
          </BoxSection>
        )}
        <BoxSection title="Yêu cầu">
          {data.info.requirements.map((r, index) => {
            return (
              <div key={index} className="mb-3 flex items-center gap-2">
                <span className="flex-shrink-0 size-5 bg-primary text-white p-1 rounded flex items-center justify-center">
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
                <span>{r}</span>
              </div>
            );
          })}
        </BoxSection>
        <BoxSection title="Lợi ích">
          {data.info.benefits.map((r, index) => {
            return (
              <div key={index} className="mb-3 flex items-start gap-2">
                <span className="flex-shrink-0 size-5 bg-primary text-white p-1 rounded flex items-center justify-center ">
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
                <span>{r}</span>
              </div>
            );
          })}
        </BoxSection>
        <BoxSection title="Q & A">
          {data.info.qa.map((qa, index) => (
            <Accordion key={index} type="single" collapsible className="mb-3">
              <AccordionItem value={qa.question}>
                <AccordionTrigger>{qa.question}</AccordionTrigger>
                <AccordionContent>{qa.answer}</AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </BoxSection>
      </div>
      <CourseWidget
        isEnrolled={userCourses?.includes(data._id.toString())}
        data={data ? JSON.parse(JSON.stringify(data)) : null}
        findUser={findUser ? JSON.parse(JSON.stringify(findUser)) : null}
      />
    </div>
  );
};
function BoxSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <h2 className="font-bold text-cl mb-5">{title}</h2>
      <div className="mb-10">{children}</div>
    </>
  );
}
function BoxInfo({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-lg p-5 dark:bg-grayDarker">
      <h4 className="text-sm text-slate-400 font-normal mb-2">{title}</h4>
      <h3 className="font-bold dark:text-white">{children}</h3>
    </div>
  );
}
export default page;

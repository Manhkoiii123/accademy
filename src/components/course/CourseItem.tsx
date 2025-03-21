import { IconClock, IconEye, IconStar } from "@/components/icons";
import { ICourse } from "@/database/course.modal";
import { ECourseStatus } from "@/types/enums";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CourseItem = ({
  data,
  cta,
  url,
}: {
  data: ICourse;
  cta?: string;
  url?: string;
}) => {
  const courseInfo = [
    {
      title: data.views,
      icon: (className?: string) => <IconEye className={className} />,
    },
    {
      title: data.rating[0],
      icon: (className?: string) => <IconStar className={className} />,
    },
    {
      title: "30h25p",
      icon: (className?: string) => <IconClock className={className} />,
    },
  ];
  return (
    <div className="bg-white border dark:bg-grayDarker dark:border-opacity-10 border-gray-200 p-4 rounded-2xl flex flex-col justify-between">
      <div>
        <Link
          href={
            url
              ? url
              : cta === "Tiếp tục học"
              ? `/${data.slug}/lesson`
              : `/course/${data.slug}`
          }
          className="block h-[180px] relative"
        >
          <Image
            alt="image course"
            src={data.image}
            width={300}
            height={200}
            className="w-full h-full object-cover rounded-lg"
            sizes="@media (min-width:640px) 300px, 100vw"
            priority // độ ưu tiên load trước
          />
          {data.status === ECourseStatus.PENDING && (
            <span className="inline-block px-3 py-1 absolute top-3 right-3 z-10 rounded-xl text-white bg-green-500 text-xs font-medium">
              Coming soon
            </span>
          )}
        </Link>
        <h3 className="font-bold text-lg mb-5 pt-4 line-clamp-2">
          {data.title}
        </h3>
      </div>

      <div>
        <div className="flex items-center gap-3  mb-5 text-xs text-gray-500">
          {courseInfo.map((item, index) => {
            return (
              <div key={index} className="flex items-center gap-2">
                {item.icon("size-4")}
                <span>{item.title}</span>
              </div>
            );
          })}

          <span className="font-bold text-base text-primary ml-auto">
            {data.price.toLocaleString()}đ
          </span>
        </div>
        {data.status === ECourseStatus.PENDING ? (
          <div className="cursor-default flex w-full mt-10 items-center justify-center rounded-lg text-white font-semibold bg-primary h-12 button-primary">
            {cta || "Chờ nhé bạn"}
          </div>
        ) : (
          <Link
            href={
              url
                ? url
                : cta === "Tiếp tục học"
                ? `/${data.slug}/lesson`
                : `/course/${data.slug}`
            }
            className="flex w-full mt-10 items-center justify-center rounded-lg text-white font-semibold bg-primary h-12 button-primary"
          >
            {cta || "Xem chi tiết"}
          </Link>
        )}
      </div>
    </div>
  );
};

export default CourseItem;

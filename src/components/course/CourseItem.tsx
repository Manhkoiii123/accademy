import { IconClock, IconEye, IconStar } from "@/components/icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CourseItem = () => {
  const courseInfo = [
    {
      title: "3000",
      icon: (className?: string) => <IconEye className={className} />,
    },
    {
      title: "5.0",
      icon: (className?: string) => <IconStar className={className} />,
    },
    {
      title: "30h25p",
      icon: (className?: string) => <IconClock className={className} />,
    },
  ];
  return (
    <div className="bg-white border dark:bg-grayDarker dark:border-opacity-10 border-gray-200 p-4 rounded-2xl ">
      <Link href={"#"} className="block h-[180px] relative">
        <Image
          alt="image course"
          src={
            "https://plus.unsplash.com/premium_photo-1682787494977-d013bb5a8773?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          width={300}
          height={200}
          className="w-full h-full object-cover rounded-lg"
          sizes="@media (min-width:640px) 300px, 100vw"
          priority // độ ưu tiên load trước
        />
        <span className="inline-block px-3 py-1 absolute top-3 right-3 z-10 rounded-xl text-white bg-green-500 text-xs font-medium">
          New
        </span>
      </Link>
      <div className="pt-4">
        <h3 className="font-bold text-lg mb-5">
          Khóa học NextJs Pro - Xây dựng E-Learning system hoàn chỉnh
        </h3>
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
            799.000đ
          </span>
        </div>

        <Link
          href={"#"}
          className="flex w-full mt-10 items-center justify-center rounded-lg text-white font-semibold bg-primary h-12"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
};

export default CourseItem;

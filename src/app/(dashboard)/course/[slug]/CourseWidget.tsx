"use client";
import ButtonEnroll from "@/app/(dashboard)/course/[slug]/ButtonEnroll";
import { IconClock, IconPlay, IconStudy, IconUsers } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { IUser } from "@/database/user.modal";
import { TCourseUpdateParams } from "@/types";
import Link from "next/link";
import React, { useState } from "react";
import CouponForm from "./CouponForm";

const CourseWidget = ({
  data,
  findUser,
  isEnrolled = false,
}: {
  data: TCourseUpdateParams;
  findUser: IUser | null | undefined;
  isEnrolled?: boolean;
}) => {
  const [price, setPrice] = useState<number>(data.price);
  const [coupon, setCoupon] = useState("");
  return (
    <div className="">
      <div className="bg-white rounded-lg p-5 dark:bg-grayDarker">
        <div className="flex items-center gap-2 mb-3">
          <strong className="text-primary text-xl font-bold">
            {price.toLocaleString()}đ
          </strong>
          <span className="text-slate-400 line-through text-sm">
            {data.sale_price.toLocaleString()}đ
          </span>
          <span className="ml-auto inline-block px-3 py-1 rounded-lg bg-primary bg-opacity-10 text-primary font-semibold text-sm">
            {Math.ceil((1 - data.price / data.sale_price) * 100)}%
          </span>
        </div>
        <h3 className="font-bold mb-3 text-sm">Khóa học bao gồm có</h3>
        <ul className="mb-5 flex flex-col gap-2 text-sm text-slate-500">
          <li className="flex items-center gap-2">
            <IconClock className="size-4" />
            <span>30h học</span>
          </li>
          <li className="flex items-center gap-2">
            <IconPlay className="size-4" />
            <span>Video Full HD</span>
          </li>
          <li className="flex items-center gap-2">
            <IconUsers className="size-4" />
            <span>Có nhóm hỗ trợ học tập</span>
          </li>
          <li className="flex items-center gap-2">
            <IconStudy className="size-4" />
            <span>Có tài liệu kèm theo</span>
          </li>
        </ul>
        {isEnrolled ? (
          <Link href={`/${data.slug}/lesson`}>
            <Button className="w-full" variant={"primary"}>
              Truy cập khóa học
            </Button>
          </Link>
        ) : (
          <ButtonEnroll
            courseId={data ? JSON.parse(JSON.stringify(data._id)) : null}
            amount={price}
            user={findUser ? JSON.parse(JSON.stringify(findUser)) : null}
            coupon={coupon}
          />
        )}
        <CouponForm
          setCouponId={setCoupon}
          setPrice={setPrice}
          courseId={data ? JSON.parse(JSON.stringify(data._id)) : null}
          originalPrice={data.price}
        ></CouponForm>
      </div>
    </div>
  );
};

export default CourseWidget;

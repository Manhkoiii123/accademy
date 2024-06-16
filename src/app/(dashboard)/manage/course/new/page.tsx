import Heading from "@/components/common/Heading";
import CourseAddNew from "@/components/course/CourseAddNew";
import { getUserInfo } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const page = async () => {
  const { userId } = auth();
  if (!userId) return null;
  const mongoUser = await getUserInfo({ userId });
  if (!mongoUser) return null;
  return (
    <div>
      <Heading>Tạo khóa học mới</Heading>
      <CourseAddNew user={JSON.parse(JSON.stringify(mongoUser))} />
    </div>
  );
};

export default page;

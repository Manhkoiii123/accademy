import LoadingOutline from "@/app/(dashboard)/[course]/lesson/@outline/Loadingoutline";
import LoadingPlayer from "@/app/(dashboard)/[course]/lesson/@player/LoadingPlayer";
import PageNotFound from "@/app/not-found";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import { findAllLessons } from "@/lib/actions/lession.actions";
import { getUserInfo } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import React, { Suspense } from "react";

const Layout = async ({
  player,
  outline,
}: {
  player: React.ReactNode;
  outline: React.ReactNode;
}) => {
  const { userId } = auth();
  if (!userId) return <PageNotFound />;
  const findUser = await getUserInfo({ userId });
  if (!findUser) return <PageNotFound />;
  return (
    <div className="grid lg:pb-0 pb-20 xl:grid-cols-[minmax(0,2fr),minmax(0,1fr)] gap-10 min-h-screen items-start">
      <Suspense fallback={<LoadingPlayer />}>{player}</Suspense>
      <Suspense fallback={<LoadingOutline />}>{outline}</Suspense>
    </div>
  );
};

export default Layout;

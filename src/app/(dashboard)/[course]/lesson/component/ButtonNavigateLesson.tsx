"use client";
import { IconLeftArrow, IconRightArrow } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ILesson } from "@/database/lesson.modal";
import { useRouter } from "next/navigation";
import React from "react";

const ButtonNavigateLesson = ({
  type,
  nextLesson,
  prevLesson,
  course,
}: {
  type: string;
  nextLesson?: ILesson;
  prevLesson?: ILesson;
  course: string;
}) => {
  const router = useRouter();
  const handleNavigateLesson = () => {
    if (type === "next") {
      router.push(`/${course}/lesson?slug=${nextLesson?.slug}`);
    } else {
      router.push(`/${course}/lesson?slug=${prevLesson?.slug}`);
    }
  };
  const isDisable = () => {
    if (type === "next") {
      return nextLesson === undefined;
    }
    if (type === "prev") {
      return prevLesson === undefined;
    }
  };
  return (
    <Button
      disabled={isDisable()}
      className="size-10 p-3"
      onClick={handleNavigateLesson}
    >
      {type === "prev" ? <IconLeftArrow /> : <IconRightArrow />}
    </Button>
  );
};

export default ButtonNavigateLesson;

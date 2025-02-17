"use client";

import { ILesson } from "@/database/lesson.modal";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({
  videoId,
  nextLesson,
  course,
}: {
  videoId: string;
  nextLesson?: ILesson;
  course: string;
}) => {
  const router = useRouter();
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const videoEndedRef = useRef(false);
  useEffect(() => {
    setIsVideoEnded(false);
    videoEndedRef.current = false;
  }, [videoId]);
  useEffect(() => {
    if (isVideoEnded && nextLesson) {
      const timer = setTimeout(() => {
        router.push(`/${course}/lesson?slug=${nextLesson?.slug}`);
        setIsVideoEnded(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isVideoEnded, nextLesson, course, router]);

  const handleVideoEnded = () => {
    if (!videoEndedRef.current) {
      videoEndedRef.current = true;
      setIsVideoEnded(true);
    }
  };

  return (
    <>
      <div
        className={cn(
          "absolute right-0 top-0 z-10 h-1.5 bg-gradient-to-r from-primary to-secondary",
          isVideoEnded ? "animate-bar" : ""
        )}
      />
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${videoId}`}
        width="100%"
        height="100%"
        playing={true}
        onEnded={handleVideoEnded}
        controls={true}
      />
    </>
  );
};

export default VideoPlayer;

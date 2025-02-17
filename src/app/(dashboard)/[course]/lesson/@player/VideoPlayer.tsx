"use client";

import { ILesson } from "@/database/lesson.modal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Swal from "sweetalert2";

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

  useEffect(() => {
    if (isVideoEnded && nextLesson) {
      Swal.fire({
        title: "Video đã kết thúc!",
        text: "Bạn có muốn chuyển sang bài tiếp theo không?",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Hủy",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push(`/${course}/lesson?slug=${nextLesson?.slug}`);
          setIsVideoEnded(false);
        }
      });
    }
  }, [isVideoEnded, nextLesson, router, course]);

  return (
    <ReactPlayer
      url={`https://www.youtube.com/watch?v=${videoId}`}
      width="100%"
      height="100%"
      playing={true}
      onEnded={() => setIsVideoEnded(true)}
      controls={true}
    />
  );
};

export default VideoPlayer;

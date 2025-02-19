"use client";

import useGlobalStore from "@/store";

const LessonWrapper = ({ children }: { children: React.ReactNode }) => {
  const { expandedPlayer, setExpandedPlayer } = useGlobalStore();
  return (
    <div
      style={{
        display: expandedPlayer ? "block" : "grid",
      }}
      className="grid lg:pb-0 pb-20 xl:grid-cols-[minmax(0,2fr),minmax(0,1fr)] gap-10 min-h-screen items-start"
    >
      {children}
    </div>
  );
};

export default LessonWrapper;

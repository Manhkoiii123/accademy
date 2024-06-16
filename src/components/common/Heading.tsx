import { cn } from "@/lib/utils";
import React from "react";

const Heading = ({
  classname = "",
  children,
}: {
  classname?: string;
  children: React.ReactNode;
}) => {
  return (
    <h1 className={cn("font-bold text-2xl lg:text-3xl", classname)}>
      {children}
    </h1>
  );
};

export default Heading;

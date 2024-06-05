"use client";
import { TActiveLinkProps } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ActiveLink = ({ url, children }: TActiveLinkProps) => {
  const pathName = usePathname();
  const isActive = pathName === url;
  return (
    <Link
      href={{
        pathname: url,
        query: {},
      }}
      //   svgan là cái aimation mà nó vẽ lần lượt hiện ra cái icon
      className={`p-3 rounded-md flex items-center gap-3  ${
        isActive
          ? "text-white bg-primary svg-animation"
          : "hover:bg-primary hover:text-primary hover:bg-opacity-10 transition-all"
      }`}
    >
      {children}
    </Link>
  );
};

export default ActiveLink;

"use client";
import { ActiveLink } from "@/components/common";
import { ModeToggle } from "@/components/common/ModeToggle";
import { IconUsers } from "@/components/icons";
import { menuItem } from "@/constants";
import { TMenuItem } from "@/types";
import { UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const Sidebar = () => {
  const { userId } = useAuth();
  return (
    <div className="hidden p-5 border-r border-r-gray-200 bg-white dark:bg-grayDarker dark:border-opacity-10  lg:flex flex-col">
      <Link href="#" className="font-bold text-3xl inline-block mb-10">
        <span className="text-primary">M</span>
        anhDemy
      </Link>
      <ul className="flex flex-col gap-2 ">
        {menuItem.map((item, index) => (
          <MenuItem
            key={index}
            url={item.url}
            title={item.title}
            icon={item.icon}
          />
        ))}
      </ul>
      <div className=" mt-auto flex items-center justify-end gap-5">
        <ModeToggle />
        {!userId ? (
          <Link
            href={"/sign-in"}
            className="size-10 rounded-lg bg-primary text-white flex items-center justify-center p-1 "
          >
            <IconUsers />
          </Link>
        ) : (
          <UserButton />
        )}
      </div>
    </div>
  );
};
function MenuItem({ url = "/", title = "", icon }: TMenuItem) {
  return (
    <li>
      <ActiveLink url={url}>
        {icon}
        {title}
      </ActiveLink>
    </li>
  );
}
export default Sidebar;

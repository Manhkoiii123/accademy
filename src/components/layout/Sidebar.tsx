import { ActiveLink } from "@/components/common";
import { ModeToggle } from "@/components/common/ModeToggle";
import { menuItem } from "@/constants";
import { TMenuItem } from "@/types";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <div className="p-5 border-r border-r-gray-200 bg-white dark:bg-grayDarker dark:border-opacity-10  flex flex-col">
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
        <UserButton />
        <ModeToggle />
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

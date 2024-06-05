import ActiveLink from "@/components/common/ActiveLink";
import { menuItem } from "@/constants";
import { TMenuItem } from "@/types";
import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <div className="p-5 border-r border-r-gray-200">
      <Link href="#" className="font-bold text-3xl inline-block mb-5">
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

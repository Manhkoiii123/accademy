import IconExplore from "@/components/icons/IconExplore";
import IconPlay from "@/components/icons/IconPlay";
import { menuItem } from "@/constants";
import React from "react";

const Sidebar = () => {
  return (
    <div className="p-5 border-r border-r-gray-200">
      <a href="#" className="font-bold text-3xl inline-block mb-5">
        ManhDemy
      </a>
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
function MenuItem({
  url = "/",
  title = "",
  icon,
}: {
  url: string;
  title: string;
  icon?: React.ReactNode;
}) {
  return (
    <li>
      <a
        href={url}
        className="p-3 rounded-md flex items-center gap-3 hover:bg-primary hover:text-primary hover:bg-opacity-10 transition-all"
      >
        {icon}
        {title}
      </a>
    </li>
  );
}
export default Sidebar;

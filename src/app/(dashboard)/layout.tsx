import Sidebar, { MenuItem } from "@/components/layout/Sidebar";
import { menuItem } from "@/constants";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="wrapper block pb-20 lg:pb-0 lg:grid lg:grid-cols-[300px,minmax(0,1fr)] h-screen">
      <Sidebar />
      <ul className="flex p-3 bgDarkMode border-t borderDarkMode justify-center gap-5 lg:hidden fixed bottom-0 left-0 w-full h-16">
        {menuItem.map((item, index) => (
          <MenuItem
            key={index}
            url={item.url}
            title={item.title}
            icon={item.icon}
            onlyIcon
          />
        ))}
      </ul>
      <div className="hidden lg:block"></div>
      <main className="p-10">{children}</main>
    </div>
  );
};

export default layout;

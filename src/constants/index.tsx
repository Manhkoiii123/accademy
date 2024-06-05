import { IconExplore, IconPlay } from "@/components/icons";
import { TMenuItem } from "@/types";

export const menuItem: TMenuItem[] = [
  {
    url: "/",
    title: "Khu vực học tập",
    icon: <IconPlay className="size-6" />,
  },
  {
    url: "/explore",
    title: "Khám phá",
    icon: <IconExplore className="size-6" />,
  },
];

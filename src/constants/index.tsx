import IconExplore from "@/components/icons/IconExplore";
import IconPlay from "@/components/icons/IconPlay";

export const menuItem: {
  url: string;
  title: string;
  icon?: React.ReactNode;
}[] = [
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

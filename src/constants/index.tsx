import {
  IconComment,
  IconExplore,
  IconOrder,
  IconPlay,
  IconStudy,
  IconUsers,
} from "@/components/icons";
import { TMenuItem } from "@/types";
import { ECourseLevel, ECourseStatus, EOrderStatus } from "@/types/enums";
export const LIMIT = 4;
export const menuItem: TMenuItem[] = [
  {
    url: "/",
    title: "Khám phá",
    icon: <IconPlay className="size-5" />,
  },
  {
    url: "/study",
    title: "Khu vực học tập",
    icon: <IconStudy className="size-5" />,
  },
  {
    url: "/manage/course",
    title: "Quản lý khóa học",
    icon: <IconExplore className="size-5" />,
  },
  {
    url: "/manage/member",
    title: "Quản lý thành viên",
    icon: <IconUsers className="size-5" />,
  },
  {
    url: "/manage/order",
    title: "Quản lý đơn hàng",
    icon: <IconOrder className="size-5" />,
  },
  {
    url: "/manage/comment",
    title: "Quản lý bình luận",
    icon: <IconComment className="size-5" />,
  },
];
export const courseStatus: {
  title: string;
  value: ECourseStatus;
  className?: string;
}[] = [
  {
    title: "Đã duyệt",
    value: ECourseStatus.APPROVED,
    className: "text-green-500 bg-green-500",
  },
  {
    title: "Chờ duyệt",
    value: ECourseStatus.PENDING,
    className: "text-orange-500 bg-orange-500",
  },
  {
    title: "Từ chối",
    value: ECourseStatus.REJECTED,
    className: "text-red-500 bg-red-500",
  },
];
export const courseLevel: {
  title: string;
  value: ECourseLevel;
}[] = [
  {
    title: "Dễ",
    value: ECourseLevel.BEGINNER,
  },
  {
    title: "Trung bình",
    value: ECourseLevel.ADVANCED,
  },
  {
    title: "Khó",
    value: ECourseLevel.INTERMEDIATE,
  },
];
export const courseLevelTitle: Record<ECourseLevel, string> = {
  [ECourseLevel.BEGINNER]: "Dễ",
  [ECourseLevel.ADVANCED]: "Trung bình",
  [ECourseLevel.INTERMEDIATE]: "Khó",
};
export const commonClassNames = {
  status:
    "bg-opacity-10  border border-current rounded-md font-medium px-3 py-1 text-sm whitespace-nowrap",
  action:
    "size-8 rounded-lg bgDarkMode border hover:text-grayDarkest  flex items-center justify-center p-2 bg-gray-100 text-gray-500 hover:bg-white dark:bg-transparent borderDarkMode dark:hover:bg-grayDarkest dark:hover:text-white",
  paginationButton:
    "hover:border-primary hover:text-primary transition-all size-10 rounded-md borderDarkMode bgDarkMode border flex items-center justify-center ",
};
export const editorOptions = (field: any, theme: any) => ({
  initialValue: "",
  onBlur: field.onBlur,
  onEditorChange: (content: any) => field.onChange(content),
  init: {
    codesample_global_prismjs: true,
    skin: theme === "dark" ? "oxide-dark" : "oxide",
    height: 300,
    menubar: false,
    plugins: [
      "advlist",
      "autolink",
      "lists",
      "link",
      "image",
      "charmap",
      "preview",
      "anchor",
      "searchreplace",
      "visualblocks",
      "codesample",
      "fullscreen",
      "insertdatetime",
      "media",
      "table",
      "heading",
    ],
    toolbar:
      "undo redo | " +
      "codesample | bold italic forecolor | alignleft aligncenter |" +
      "alignright alignjustify | bullist numlist |" +
      "image |" +
      "h1 h2 h3 h4 h5 h6 | preview | fullscreen |" +
      "link",
    content_style: `@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap');body { font-family: Manrope,Helvetica,Arial,sans-serif; font-size:14px; line-height: 2; padding-bottom: 32px; } img { max-width: 100%; height: auto; display: block; margin: 0 auto; };`,
  },
});

export const orderStatus: {
  title: string;
  value: EOrderStatus;
  className?: string;
}[] = [
  {
    title: "Đã duyệt",
    value: EOrderStatus.COMPLETED,
    className: "text-green-500 bg-green-500",
  },
  {
    title: "Chờ duyệt",
    value: EOrderStatus.PENDING,
    className: "text-orange-500 bg-orange-500",
  },
  {
    title: "Đã hủy",
    value: EOrderStatus.CANCELED,
    className: "text-red-500 bg-red-500",
  },
];

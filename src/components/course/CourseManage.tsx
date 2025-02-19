"use client";
import React, { useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Heading from "@/components/common/Heading";
import Image from "next/image";
import { commonClassNames, courseStatus } from "@/constants";
import { cn } from "@/lib/utils";
import {
  IconDelete,
  IconEdit,
  IconEye,
  IconLeftArrow,
  IconRightArrow,
  IconStudy,
} from "@/components/icons";
import Link from "next/link";
import Swal from "sweetalert2";
import { ICourse } from "@/database/course.modal";
import { updateCourse } from "@/lib/actions/course.actions";
import { ECourseStatus } from "@/types/enums";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { debounce } from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const CourseManage = ({
  courses,
  totalCount,
}: {
  courses: ICourse[];
  totalCount: number;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const handleDeleteCourse = (slug: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateCourse({
          slug,
          updateData: {
            status: ECourseStatus.PENDING,
            _destroy: true,
          },
          path: "/manage/course",
        });
        toast.success("Xóa khóa học thành công");
      }
    });
  };
  const handleChangeStatus = (slug: string, status: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updateCourse({
            slug,
            updateData: {
              status: ECourseStatus.PENDING
                ? ECourseStatus.APPROVED
                : ECourseStatus.PENDING,
              _destroy: false,
            },
            path: "/manage/course",
          });
          toast.success("Cập nhật trạng thái khóa học thành công");
        }
      });
    } catch (error) {
      console.log("🚀 ~ handleChangeStatus ~ error:", error);
    }
  };
  const handleSearchCourse = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const search = e.target.value;
      const currentQuery = new URLSearchParams(window.location.search);
      currentQuery.set("search", search);
      if (currentQuery.has("page")) {
        currentQuery.delete("page");
        currentQuery.set("page", "1");
      }
      router.push(`${pathname}?${currentQuery.toString()}`);
    },
    500
  );

  const handleSelectStatus = (status: ECourseStatus) => {
    const currentQuery = new URLSearchParams(window.location.search);
    currentQuery.set("status", status);
    if (currentQuery.has("page")) {
      currentQuery.delete("page");
      currentQuery.set("page", "1");
    }
    router.push(`${pathname}?${currentQuery.toString()}`);
  };

  const page = searchParams.get("page") || 1;
  const handleChangePage = (type: "prev" | "next") => {
    if (type === "prev" && +page === 1) return;
    if (type === "next" && +page === +Math.ceil(totalCount / 4)) return;
    router.push(
      `${pathname}?${createQueryString(
        "page",
        type === "prev" ? String(+page - 1) : String(+page + 1)
      )}`
    );
  };
  return (
    <>
      <Link
        href={"/manage/course/new"}
        className="size-10 rounded-full bg-primary flex items-center justify-center text-white fixed right-5 bottom-5 animate-bounce"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </Link>
      <div className="flex flex-col lg:flex-row gap-5 lg:items-center justify-between mb-10">
        <Heading>Quản lí khóa học</Heading>
        <div className="lg:w-[500px] w-full flex flex-col lg:flex-row gap-2">
          <Input
            type="text"
            placeholder="Tìm kiếm"
            onChange={(e) => handleSearchCourse(e)}
          />
          <Select
            onValueChange={(value) =>
              handleSelectStatus(value as ECourseStatus)
            }
          >
            <SelectTrigger className="lg:w-[200px]">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {courseStatus.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table className="table-responsive">
        <TableHeader>
          <TableRow>
            <TableHead>Thông tin</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.length > 0 &&
            courses.map((c) => {
              return (
                <TableRow key={c.id}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Image
                        alt=""
                        src={c.image}
                        width={80}
                        height={80}
                        className="flex-shrink-0 size-16 rounded-lg object-cover"
                      />
                      <div className="flex flex-col gap-1">
                        <h3 className="font-bold text-sm lg:text-base whitespace-nowrap">
                          {c.title}
                        </h3>
                        <h4 className="text-sm text-slate-500">
                          {new Date(c.created_at).toLocaleDateString("vi-VI")}
                        </h4>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-bold text-sm lg:text-base">
                      {c.price.toLocaleString()}đ
                    </span>
                  </TableCell>
                  <TableCell>
                    <button
                      type="button"
                      onClick={() => handleChangeStatus(c.slug, c.status)}
                      className={cn(
                        commonClassNames.status,
                        courseStatus.find((item) => item.value === c.status)
                          ?.className
                      )}
                    >
                      {
                        courseStatus.find((item) => item.value === c.status)
                          ?.title
                      }
                    </button>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-3">
                      <Link
                        href={`/course/${c.slug}`}
                        target="_blank"
                        className={commonClassNames.action}
                      >
                        <IconEye />
                      </Link>
                      <Link
                        href={`/manage/course/update?slug=${c.slug}`}
                        className={commonClassNames.action}
                      >
                        <IconEdit />
                      </Link>
                      <button
                        onClick={() => handleDeleteCourse(c.slug)}
                        className={commonClassNames.action}
                      >
                        <IconDelete />
                      </button>
                      <Link
                        href={`/manage/course/update-content?slug=${c.slug}`}
                        className={commonClassNames.action}
                      >
                        <IconStudy />
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <div className="flex justify-end gap-3 mt-5">
        <button
          type="button"
          disabled={+page === 1}
          className={commonClassNames.paginationButton}
          onClick={() => handleChangePage("prev")}
        >
          <IconLeftArrow />
        </button>
        <button
          type="button"
          disabled={+page === +Math.ceil(totalCount / 4)}
          className={commonClassNames.paginationButton}
          onClick={() => handleChangePage("next")}
        >
          <IconRightArrow />
        </button>
      </div>
    </>
  );
};

export default CourseManage;

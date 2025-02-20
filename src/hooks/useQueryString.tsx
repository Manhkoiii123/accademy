"use client";
import { LIMIT } from "@/constants";
import { debounce } from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function useQueryString({ totalCount }: { totalCount: number }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    const currentQuery = new URLSearchParams(window.location.search);
    currentQuery.set("search", search);
    if (currentQuery.has("page")) {
      currentQuery.delete("page");
      currentQuery.set("page", "1");
    }
    router.push(`${pathname}?${currentQuery.toString()}`);
  }, 500);
  const handleChangePage = (type: "prev" | "next") => {
    const page = searchParams.get("page") || 1;
    if (type === "prev" && +page === 1) return;
    if (type === "next" && +page === +Math.ceil(totalCount / LIMIT)) return;
    router.push(
      `${pathname}?${createQueryString(
        "page",
        type === "prev" ? String(+page - 1) : String(+page + 1)
      )}`
    );
  };
  const handleSelectStatus = (status: string) => {
    const currentQuery = new URLSearchParams(window.location.search);
    currentQuery.set("status", status);
    if (currentQuery.has("page")) {
      currentQuery.delete("page");
      currentQuery.set("page", "1");
    }
    router.push(`${pathname}?${currentQuery.toString()}`);
  };
  return {
    createQueryString,
    router,
    pathname,
    handleSearch,
    handleChangePage,
    handleSelectStatus,
  };
}

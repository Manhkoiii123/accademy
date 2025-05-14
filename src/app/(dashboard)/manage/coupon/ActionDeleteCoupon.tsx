"use client";
import TableActionItem from "@/components/common/TableActionItem";
import { deleteCoupon } from "@/lib/actions/coupon.actions";
import React from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ActionDeleteCoupon = ({ slug }: { slug: string }) => {
  const handleDeleteCoupon = (slug: string) => {
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
        await deleteCoupon(slug);
        toast.success("Xóa mã giảm giá thành công");
      }
    });
  };
  return (
    <TableActionItem type="delete" onClick={() => handleDeleteCoupon(slug)} />
  );
};

export default ActionDeleteCoupon;

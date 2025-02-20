"use client";
import { StatusBadge } from "@/components/common";
import Heading from "@/components/common/Heading";
import {
  IconCancel,
  IconCheck,
  IconLeftArrow,
  IconRightArrow,
} from "@/components/icons";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { commonClassNames, LIMIT, orderStatus } from "@/constants";
import { IOrder } from "@/database/order.modal";
import useQueryString from "@/hooks/useQueryString";
import { cn } from "@/lib/utils";
import { EOrderStatus } from "@/types/enums";
import { debounce } from "lodash";
import { useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
interface IOrderManageProps {
  code: string;
  total: number;
  amount: number;
  discount: number;
  status: EOrderStatus;
  course: {
    title: string;
  };
  user: {
    name: string;
  };
}
const OrderManage = ({
  orders = [],
  totalCount,
}: {
  orders: IOrderManageProps[];
  totalCount: number;
}) => {
  const searchParams = useSearchParams();
  const {
    handleSearch: handleSearchOrder,
    handleChangePage,
    handleSelectStatus,
  } = useQueryString({
    totalCount,
  });
  const handleCancelOrder = () => {
    Swal.fire({
      title: "Bạn có chắc muốn hủy đơn hàng không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Thoát",
    }).then(async (result) => {
      if (result.isConfirmed) {
      }
    });
  };
  const handleCompleteOrder = () => {};
  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between mb-10">
        <Heading classname="">Quản lý đơn hàng</Heading>
        <div className="flex gap-3">
          <div className="w-full lg:w-[300px]">
            <Input
              placeholder="Tìm kiếm đơn hàng..."
              onChange={(e) => handleSearchOrder(e)}
            />
          </div>
          <Select
            onValueChange={(value) => handleSelectStatus(value as EOrderStatus)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {orderStatus.map((status) => (
                  <SelectItem value={status.value} key={status.value}>
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
            <TableHead>Mã đơn hàng</TableHead>
            <TableHead>Khóa học</TableHead>
            <TableHead>Thành viên</TableHead>
            <TableHead>Số tiền</TableHead>
            <TableHead>Mã giảm giá</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length > 0 &&
            orders.map((order) => {
              const orderStatusItem = orderStatus.find(
                (item) => item.value === order.status
              );
              return (
                <TableRow key={order.code}>
                  <TableCell>
                    <strong>{order.code}</strong>
                  </TableCell>
                  <TableCell>{order.course.title}</TableCell>
                  <TableCell>{order.user.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-2">
                      <span>{order.amount.toLocaleString("us-US")}</span>
                      {order.discount > 0 && (
                        <span>{order.discount.toLocaleString("us-US")}</span>
                      )}
                      <strong
                        className={cn(
                          orderStatusItem?.className,
                          "bg-transparent"
                        )}
                      >
                        {order.total.toLocaleString("us-US")}
                      </strong>
                    </div>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <StatusBadge item={orderStatusItem}></StatusBadge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        className={commonClassNames.action}
                        onClick={handleCompleteOrder}
                      >
                        <IconCheck />
                      </button>
                      <button
                        type="button"
                        className={commonClassNames.action}
                        onClick={handleCancelOrder}
                      >
                        <IconCancel />
                      </button>
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
          disabled={+(searchParams.get("page") || 1) === 1}
          className={commonClassNames.paginationButton}
          onClick={() => handleChangePage("prev")}
        >
          <IconLeftArrow />
        </button>
        <button
          type="button"
          disabled={
            +(searchParams.get("page") || 1) === +Math.ceil(totalCount / LIMIT)
          }
          className={commonClassNames.paginationButton}
          onClick={() => handleChangePage("next")}
        >
          <IconRightArrow />
        </button>
      </div>
    </div>
  );
};

export default OrderManage;

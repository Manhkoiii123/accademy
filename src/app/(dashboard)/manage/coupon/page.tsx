import ActionDeleteCoupon from "@/app/(dashboard)/manage/coupon/ActionDeleteCoupon";
import { StatusBadge, TableAction } from "@/components/common";
import BouncedLink from "@/components/common/BouncedLink";
import Heading from "@/components/common/Heading";
import PaginationButton from "@/components/common/PaginationButton";
import TableActionItem from "@/components/common/TableActionItem";
import {
  IconDelete,
  IconEdit,
  IconEye,
  IconLeftArrow,
  IconRightArrow,
} from "@/components/icons";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { commonClassNames, couponTypes } from "@/constants";
import { deleteCoupon, getCoupons } from "@/lib/actions/coupon.actions";
import { ECouponType } from "@/types/enums";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const page = async () => {
  const coupons = await getCoupons({});

  return (
    <div>
      <BouncedLink url="/manage/coupon/new"></BouncedLink>
      <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between mb-10">
        <Heading classname="">Quản lý mã giảm giá</Heading>
        <div className="flex gap-3">
          <div className="w-full lg:w-[300px]">
            <Input placeholder="Tìm kiếm coupon..." />
          </div>
        </div>
      </div>
      <Table className="table-responsive">
        <TableHeader>
          <TableRow>
            <TableHead>Mã</TableHead>
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Giảm giá</TableHead>
            <TableHead>Sử dụng</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!!coupons &&
            coupons.length > 0 &&
            coupons.map((coupon) => (
              <TableRow key={coupon.code}>
                <TableCell>
                  <strong>{coupon.code}</strong>
                </TableCell>
                <TableCell>
                  <strong>{coupon.title}</strong>
                </TableCell>
                <TableCell>
                  {coupon.type === ECouponType.AMOUNT ? (
                    <>{coupon.value.toLocaleString("us-US")}</>
                  ) : (
                    <>{coupon.value}%</>
                  )}
                </TableCell>
                <TableCell>
                  {coupon.used} / {coupon.limit}
                </TableCell>
                <TableCell>
                  {coupon.active ? (
                    <StatusBadge
                      item={{
                        title: "Đang kích hoạt",
                        className: "text-green-600",
                      }}
                    />
                  ) : (
                    // <BadgeStatus title="Đang kích hoạt" variant="success" />
                    <StatusBadge
                      item={{
                        title: "Chưa kích hoạt",
                        className: "text-orange-600",
                      }}
                    />
                    // <BadgeStatus title="Chưa kích hoạt" variant="warning" />
                  )}
                </TableCell>
                <TableCell>
                  <TableAction>
                    <TableActionItem
                      type="edit"
                      url={`/manage/coupon/update?code=${coupon.code}`}
                    />
                    <ActionDeleteCoupon slug={coupon.code} />
                  </TableAction>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <PaginationButton></PaginationButton>
    </div>
  );
};

export default page;

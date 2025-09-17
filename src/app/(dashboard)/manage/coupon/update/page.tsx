import UpdateCouponForm from "@/app/(dashboard)/manage/coupon/update/UpdateCouponForm";
import Heading from "@/components/common/Heading";
import { getCouponByCode } from "@/lib/actions/coupon.actions";
import { redirect } from "next/navigation";

const page = async ({ searchParams }: { searchParams: { code: string } }) => {
  const coupon = await getCouponByCode({ code: searchParams.code });
  if (!coupon) {
    return redirect("/manage/coupon");
  }
  return (
    <div>
      <Heading classname="mb-10">Cập nhật mã giảm giá</Heading>
      <UpdateCouponForm data={coupon} />
    </div>
  );
};

export default page;

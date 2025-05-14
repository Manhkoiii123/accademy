import UpdateCouponForm from "@/app/(dashboard)/manage/coupon/update/UpdateCouponForm";
import Heading from "@/components/common/Heading";

const page = () => {
  return (
    <div>
      <Heading classname="mb-10">Cập nhật mã giảm giá</Heading>
      <UpdateCouponForm />
    </div>
  );
};

export default page;

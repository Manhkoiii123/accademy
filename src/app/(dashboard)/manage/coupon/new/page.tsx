import NewCouponForm from "@/app/(dashboard)/manage/coupon/new/NewCouponForm";
import Heading from "@/components/common/Heading";

const page = () => {
  return (
    <div>
      <Heading classname="mb-10">Tạo mới mã giảm giá</Heading>
      <NewCouponForm />
    </div>
  );
};

export default page;

"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { NumericFormat } from "react-number-format";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { CalendarIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { ECouponType } from "@/types/enums";
import { couponTypes } from "@/constants";
import { format } from "date-fns";
import { createCoupon } from "@/lib/actions/coupon.actions";
import { toast } from "react-toastify";
import { redirect, useRouter } from "next/navigation";
import { debounce } from "lodash";
import { getAllCourse } from "@/lib/actions/course.actions";
import { Checkbox } from "@/components/ui/checkbox";
import { IconClose } from "@/components/icons";
import { InputFormatCurrency } from "@/components/ui/input-format";
const formSchema = z.object({
  title: z.string({
    message: "Tiêu đề không được để trống",
  }),
  code: z
    .string({
      message: "Mã khuyến mãi không được để trống",
    })
    .min(3, "Mã khuyến mãi phải có ít nhất 3 ký tự")
    .max(10, "Mã khuyến mãi có nhiều nhất 10 ký tự"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  active: z.boolean().optional(),
  value: z.string().optional(),
  type: z.string().optional(),
  courses: z.array(z.string()).optional(),
  limit: z.number().optional(),
});
const UpdateCouponForm = () => {
  const [findCourse, setFindCourse] = useState<any[] | undefined>([]);
  const [selectListCourse, setSelectListCourse] = useState<any[]>([]);
  const router = useRouter();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: ECouponType.PERCENT,
    },
  });
  const handleSearchCourse = debounce(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const courseList = await getAllCourse({ search: value });
      if (courseList) {
        setFindCourse(courseList.courses);
      }
      if (value === "") {
        setFindCourse([]);
      }
    },
    250
  );

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const couponType = values.type;
      const couponValue = Number(values.value?.replace(/,/g, ""));

      if (
        couponType === ECouponType.PERCENT &&
        couponValue &&
        (couponValue > 100 || couponValue < 0)
      ) {
        form.setError("value", {
          message: "Giá trị không hợp lệ",
        });

        return;
      }
      const newCoupon = await createCoupon({
        ...values,
        value: couponValue,
        start_date: startDate,
        end_date: endDate,
        courses: selectListCourse.map((course) => course._id.toString()),
      });

      if (newCoupon.error) {
        toast.error(newCoupon.error);

        return;
      }
      if (newCoupon.code) {
        toast.success("Tạo mã giảm giá thành công");
        router.push("/manage/coupon");
      }
    } catch (error) {}
  }
  const couponTypeWatch = form.watch("type");

  const handleSelectCourse = (course: any, checked: boolean | string) => {
    if (checked) {
      setSelectListCourse([...selectListCourse, course]);
    } else {
      setSelectListCourse(
        selectListCourse.filter((item) => item._id !== course._id)
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
        <div className="grid grid-cols-2 gap-8 mt-10 mb-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tiêu đề</FormLabel>
                <FormControl>
                  <Input placeholder="Tiêu đề" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Mã giảm giá"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange({
                        target: { value: value.toUpperCase() },
                      });
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ngày bắt đầu</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant={"outline"} className="w-full">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? (
                          format(startDate, "dd/MM/yyyy")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ngày kết thúc</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant={"outline"} className="w-full">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? (
                          format(endDate, "dd/MM/yyyy")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loại coupon</FormLabel>
                <FormControl className="h-12">
                  <RadioGroup
                    defaultValue={ECouponType.PERCENT}
                    className="flex gap-5"
                    onValueChange={field.onChange}
                  >
                    {couponTypes.map((type) => (
                      <div
                        className="flex items-center space-x-2"
                        key={type.value}
                      >
                        <RadioGroupItem value={type.value} id={type.value} />
                        <Label htmlFor={type.value}>{type.title}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá trị</FormLabel>
                <FormControl>
                  <>
                    {couponTypeWatch === ECouponType.PERCENT ? (
                      <Input
                        placeholder="100"
                        {...field}
                        onChange={(event) => field.onChange(event.target.value)}
                      />
                    ) : (
                      <InputFormatCurrency
                        {...field}
                        onChange={(event) => field.onChange(event.target.value)}
                      />
                    )}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trạng thái</FormLabel>
                <FormControl className="h-12">
                  <div>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="limit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số lượng tối đa</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="100"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="courses"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Khóa học</FormLabel>
                <FormControl>
                  {/* <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn khóa học" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup></SelectGroup>
                    </SelectContent>
                  </Select> */}
                  <>
                    <Input
                      placeholder="Tìm kiếm khóa học"
                      onChange={(e) => handleSearchCourse(e)}
                    />
                    {findCourse && findCourse?.length > 0 && (
                      <div className="flex flex-col gap-2 !mt-5">
                        {findCourse?.map((course) => (
                          <Label
                            key={course.title}
                            className="flex gap-2 items-center font-medium text-sm cursor-pointer"
                            htmlFor={course.title}
                          >
                            <Checkbox
                              id={course.title}
                              checked={selectListCourse.some(
                                (item) => item._id === course._id
                              )}
                              onCheckedChange={(checked) =>
                                handleSelectCourse(course, checked)
                              }
                            />
                            <span>{course.title}</span>
                          </Label>
                        ))}
                      </div>
                    )}
                    <div className="flex items-start flex-wrap gap-2 !mt-5">
                      {selectListCourse?.map((course) => (
                        <div
                          key={course.title}
                          className="inline-flex gap-2 items-center font-semibold text-sm px-3 py-1 rounded-lg border borderDarkMode bgDarkMode"
                        >
                          <span>{course.title}</span>
                          <button
                            type="button"
                            onClick={() => handleSelectCourse(course, false)}
                          >
                            <IconClose className="size-5 text-gray-400 hover:text-gray-600" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button variant="primary" className="w-[150px] ml-auto flex">
          Cập nhật
        </Button>
      </form>
    </Form>
  );
};

export default UpdateCouponForm;

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import slugify from "slugify";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { createCourse } from "@/lib/actions/course.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { IUser } from "@/database/user.modal";

const formSchema = z.object({
  title: z.string().min(10, "Tên khóa học phải có ít nhất 10 kí tự"),
  slug: z.string().optional(),
});

export default function CourseAddNew({ user }: { user: IUser }) {
  const router = useRouter();
  const [isSubmit, setIsSubmit] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmit(true);
    try {
      const data = {
        title: values.title,
        slug:
          values.slug ||
          slugify(values.title, {
            lower: true,
            locale: "vi",
          }),
        author: user._id, //trong modal yêu cầu là id
      };
      const res = await createCourse(data); // viết kiểu này thì người dùng lúc f12 sẽ ko thấy được api
      if (!res?.success) {
        toast.error(res?.message);
        return;
      }
      if (res?.success) {
        toast.success("Tạo khóa học thành công");
      }
      if (res?.data) {
        // redirect to update
        router.push(`/manage/course/update?slug=${res.data.slug}`);
      }
    } catch (error) {
    } finally {
      setIsSubmit(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
        <div className="grid grid-cols-2 mt-10 gap-8 mb-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên khóa học*</FormLabel>
                <FormControl>
                  <Input placeholder="Tên khóa học" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Đường dẫn khóa học</FormLabel>
                <FormControl>
                  <Input placeholder="Ví dụ : /khoa-hoc-lap-trinh" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          isLoading={isSubmit}
          variant={"primary"}
          className="w-40"
          disabled={isSubmit}
          type="submit"
        >
          Tạo khóa học
        </Button>
      </form>
    </Form>
  );
}

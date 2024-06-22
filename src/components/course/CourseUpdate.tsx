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
import { createCourse, updateCourse } from "@/lib/actions/course.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { ECourseLevel, ECourseStatus } from "@/types/enums";
import { ICourse } from "@/database/course.modal";
import { useImmer } from "use-immer";
import { IconAdd } from "@/components/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { courseLevel, courseStatus } from "@/constants";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";

const formSchema = z.object({
  title: z.string().min(10, "Tên khóa học phải có ít nhất 10 kí tự"),
  slug: z.string().optional(),
  price: z.number().optional(),
  sale_price: z.number().optional(),
  intro_url: z.string().optional(),
  desc: z.string().optional(),
  image: z.string().optional(),
  status: z
    .enum([
      ECourseStatus.APPROVED,
      ECourseStatus.PENDING,
      ECourseStatus.REJECTED,
    ])
    .optional(),
  level: z
    .enum([
      ECourseLevel.BEGINNER,
      ECourseLevel.INTERMEDIATE,
      ECourseLevel.ADVANCED,
    ])
    .optional(),

  info: z.object({
    requirements: z.array(z.string()).optional(),
    benefits: z.array(z.string()).optional(),
    qa: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      )
      .optional(),
  }),
  views: z.number().int().optional(),
});
const CourseUpdate = ({ slug, data }: { slug: string; data: ICourse }) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [courseInfo, setCourseInfo] = useImmer({
    requirements: data.info?.requirements || [],
    benefits: data.info?.benefits || [],
    qa: data.info?.qa || [],
  });

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data.title,
      slug: data.slug,
      price: data.price,
      sale_price: data.sale_price,
      intro_url: data.intro_url,
      desc: data.desc,
      image: data.image,
      status: data.status,
      level: data.level,
      views: data.views,
      info: {
        requirements: courseInfo.requirements,
        benefits: courseInfo.benefits,
        qa: courseInfo.qa,
      },
    },
  });
  const imageWatch = form.watch("image");
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmit(true);
    try {
      const res = await updateCourse({
        slug: slug,
        updateData: {
          title: values.title,
          slug: values.slug,
          price: values.price,
          sale_price: values.sale_price,
          intro_url: values.intro_url,
          desc: values.desc,
          image: values.image,
          status: values.status,
          level: values.level,
          views: values.views,
          info: {
            requirements: courseInfo.requirements,
            benefits: courseInfo.benefits,
            qa: courseInfo.qa,
          },
        },
      });
      if (values.slug) {
        router.push(`/manage/course/update?slug=${values.slug}`);
      }
      if (res?.success) {
        toast.success(res.message);
      }
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
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
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá khuyến mãi</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="599.000"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sale_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá gốc</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="999.000"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả khóa học</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Mô tả khóa học"
                    {...field}
                    className="h-[200px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ảnh khóa học</FormLabel>
                <FormControl>
                  <>
                    <div className="h-[200px] relative border-gray-200 border flex items-center justify-center rounded-md">
                      {!imageWatch ? (
                        <UploadButton
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            form.setValue("image", res[0].url);
                            // console.log("🚀 ~ CourseUpdate ~ res:", res);
                          }}
                          onUploadError={(error: Error) => {
                            console.error(`ERROR! ${error.message}`);
                          }}
                        />
                      ) : (
                        <>
                          <Image
                            src={imageWatch}
                            fill
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </>
                      )}
                    </div>
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="intro_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Youtube URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://youtube.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="views"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lượt xem</FormLabel>
                <FormControl>
                  <Input
                    placeholder="1000"
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trạng thái</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      {courseStatus.map((item) => {
                        return (
                          <SelectItem key={item.value} value={item.value}>
                            {item.title}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trình độ</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Trình độ" />
                    </SelectTrigger>
                    <SelectContent>
                      {courseLevel.map((item) => {
                        return (
                          <SelectItem key={item.value} value={item.value}>
                            {item.title}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="info.requirements"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-between gap-5">
                  <span>Yêu cầu</span>
                  <button
                    type="button"
                    className="text-primary"
                    onClick={() => {
                      setCourseInfo((draft) => {
                        draft.requirements.push("");
                      });
                    }}
                  >
                    <IconAdd />
                  </button>
                </FormLabel>
                <FormControl>
                  <>
                    {courseInfo.requirements.map((r, index) => {
                      return (
                        <Input
                          key={index}
                          placeholder={`Yêu cầu số ${index + 1}`}
                          value={r}
                          onChange={(e) =>
                            setCourseInfo((draft) => {
                              draft.requirements[index] = e.target.value;
                            })
                          }
                        />
                      );
                    })}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="info.benefits"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-between gap-5">
                  <span>Lợi ích</span>
                  <button
                    type="button"
                    className="text-primary"
                    onClick={() => {
                      setCourseInfo((draft) => {
                        draft.benefits.push("");
                      });
                    }}
                  >
                    <IconAdd />
                  </button>
                </FormLabel>
                <FormControl>
                  <>
                    {courseInfo.benefits.map((r, index) => {
                      return (
                        <Input
                          key={index}
                          value={r}
                          placeholder={`Lợi ích số ${index + 1}`}
                          onChange={(e) =>
                            setCourseInfo((draft) => {
                              draft.benefits[index] = e.target.value;
                            })
                          }
                        />
                      );
                    })}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="info.qa"
            render={({ field }) => (
              <FormItem className="col-start-1 col-end-3">
                <FormLabel className="flex items-center justify-between gap-5">
                  <span>Câu hỏi thường gặp</span>
                  <button
                    type="button"
                    className="text-primary"
                    onClick={() => {
                      setCourseInfo((draft) => {
                        draft.qa.push({ question: "", answer: "" });
                      });
                    }}
                  >
                    <IconAdd />
                  </button>
                </FormLabel>
                <FormControl>
                  <>
                    {courseInfo.qa.map((r, index) => {
                      return (
                        <div className="grid grid-cols-2 gap-5" key={index}>
                          <Input
                            key={index}
                            value={r.question}
                            placeholder={`Câu hỏi số ${index + 1}`}
                            onChange={(e) =>
                              setCourseInfo((draft) => {
                                draft.qa[index].question = e.target.value;
                              })
                            }
                          />
                          <Input
                            key={index}
                            value={r.answer}
                            placeholder={`Câu trả lời số ${index + 1}`}
                            onChange={(e) =>
                              setCourseInfo((draft) => {
                                draft.qa[index].answer = e.target.value;
                              })
                            }
                          />
                        </div>
                      );
                    })}
                  </>
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
          Cập nhật khóa học
        </Button>
      </form>
    </Form>
  );
};

export default CourseUpdate;

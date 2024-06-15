import { ELessonType } from "@/types/enums";
import { Schema, model, models } from "mongoose";

export interface ILesson extends Document {
  _id: string;
  title: string;
  slug: string;
  lecture: Schema.Types.ObjectId;
  course: Schema.Types.ObjectId;
  type: ELessonType; //2 dạng chữ hoặc video
  _destroy: boolean;
  created_at: Date;
  order: number; //thứ tự
  duration: number; //thời lượng
  video_url: string;
  content: string;
}
const lessonSchema = new Schema<ILesson>({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  lecture: {
    type: Schema.Types.ObjectId,
    ref: "Lecture",
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  order: {
    type: Number,
    default: 0,
  },
  content: {
    type: String,
  },
  video_url: {
    type: String,
  },
  _destroy: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  duration: {
    type: Number,
    default: 0,
  },
  type: {
    type: String,
    enum: Object.values(ELessonType),
    default: ELessonType.VIDEO,
  },
});
const Lesson = models.Lesson || model<ILesson>("Lesson", lessonSchema);
export default Lesson;

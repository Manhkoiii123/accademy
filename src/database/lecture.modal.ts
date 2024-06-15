import { Document, Schema, model, models } from "mongoose";

export interface ILecture extends Document {
  _id: string;
  title: string;
  created_at: Date;
  course: Schema.Types.ObjectId; //thuộc khóa nào
  lessons: Schema.Types.ObjectId[];
  _destroy: boolean;
  order: number;
}

const lectureSchema = new Schema<ILecture>({
  title: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  lessons: [
    {
      type: Schema.Types.ObjectId,
      ref: "Lesson",
    },
  ],
  _destroy: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
});
const Lecture = models.Lecture || model<ILecture>("Lecture", lectureSchema);
export default Lecture;

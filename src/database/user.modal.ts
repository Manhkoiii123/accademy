import { EUserRole, EUserStatus } from "@/types/enums";
import { Document, Schema, model, models } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  email_address: string;
  avatar: string;
  status: EUserStatus;
  role: EUserRole;
  course: Schema.Types.ObjectId[];
  createdAt: Date;
}
const userSchema = new Schema<IUser>({
  clerkId: {
    type: String,
  },
  name: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email_address: {
    type: String,
    unique: true,
    required: true,
  },
  avatar: {
    type: String,
  },
  course: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course", //liên kết tới bảng khác
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: Object.values(EUserRole), // lấy 1 trong cái các EUserRole
    default: EUserRole.USER,
  },
  status: {
    type: String,
    enum: Object.values(EUserStatus), // lấy 1 trong cái các EUserRole
    default: EUserStatus.ACTIVE,
  },
});
const User = models.User || model("User", userSchema);
//khai báo modal trong mg
// models trong mg chứa hết tất cả các models đã được đăng kí trước đó
// như vậy dòng 52 có ý nghĩa là trong các model trước có user rồi thì dùng cái đó
// nếu chưa thì chạy vào model("User", userSchema) => model truyền vòa 2 cái (tên, schema) => đăng kí 1 cái model
export default User;

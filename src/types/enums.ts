enum EUserStatus {
  ACTIVE = "ACTIVE",
  UNACTIVE = "UNACTIVE",
  BANNED = "BANNED",
}
enum EUserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  EXPERT = "EXPERT",
}
enum ECourseStatus {
  APPROVED = "APPROVED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
}
enum ECourseLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}
enum ELessonType {
  VIDEO = "VIDEO",
  TEXT = "TEXT",
}
enum EOrderStatus {
  PENDING = "PENDING",
  CANCELED = "CANCELED",
  COMPLETED = "COMPLETED",
}
enum ECouponType {
  PERCENT = "PERCENT",
  AMOUNT = "AMOUNT",
}
export {
  ECourseLevel,
  ECourseStatus,
  ELessonType,
  EUserRole,
  EUserStatus,
  EOrderStatus,
  ECouponType,
};

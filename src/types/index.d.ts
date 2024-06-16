type TActiveLinkProps = {
  url: string;
  children: React.ReactNode;
};
type TMenuItem = {
  url: string;
  title: string;
  icon?: React.ReactNode;
};

type TCreateUserParams = {
  clerkId: string;
  name?: string;
  username: string;
  email: string;
  avatar?: string;
};

export type TCreateCourseParams = {
  title: string;
  slug: string;
  author: string;
};
export { TActiveLinkProps, TMenuItem, TCreateUserParams };

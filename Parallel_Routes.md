chia nhỏ ra
ví dụ ở cái lesson
thì load cả trang nó ko hay
tách nó ra thành 2 pahafn bên trái và bên phải
=> cấu trúc thư mục

```ts
lession
    @outline
        page.tsx
    @player
        page.tsx
    layout.tsx
    (ko có page.tsx ở đây)
```

khi đó file layout sẽ có dạng như sau

```ts
import PageNotFound from "@/app/not-found";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import { findAllLessons } from "@/lib/actions/lession.actions";
import { getUserInfo } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const Layout = async ({
  player,
  outline,
}: {
  player: React.ReactNode;
  outline: React.ReactNode;
}) => {

      <div>{player}</div>
      <div>{outline}</div>
    </div>
  );
};

export default Layout;
```

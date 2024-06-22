import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: {
    slug: string;
  };
}) => {
  return <div>page {searchParams.slug}</div>;
};

export default page;

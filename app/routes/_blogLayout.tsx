import { Outlet } from "@remix-run/react";
import React from "react";

const BlogLayout = () => {
  return (
    <div>
      <header>blog navigation</header>
      <Outlet />
    </div>
  );
};

export default BlogLayout;

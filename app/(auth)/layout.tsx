import React, { ReactNode } from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <main className="flex-center w-full h-screen">{children}</main>;
};

export default layout;

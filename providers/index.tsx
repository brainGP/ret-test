import React, { ReactNode } from "react";
import ReactQuery from "./query";

const Providers = ({ children }: { children: ReactNode }) => {
  return <ReactQuery>{children}</ReactQuery>;
};

export default Providers;

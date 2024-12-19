import { LoadingWait } from "@/components/LoadingWait";
import React from "react";

const LoadingPage = () => {
  return (
    <div className="w-full p-40 flex justify-center items-center">
      <LoadingWait isLoading={true} />
    </div>
  );
};

export default LoadingPage;

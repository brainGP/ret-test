import React from "react";
import Filter from "@/components/Filter";
import Breadcrumb from "@/components/BreadCrumb";

const OtherPage = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      <Filter />
      <main className="w-full flex flex-col p-4 pl-8 ">
        <Breadcrumb />
      </main>
    </div>
  );
};

export default OtherPage;

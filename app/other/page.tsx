import React from "react";
import Filter from "@/components/Filter";
import Breadcrumb from "@/components/BreadCrumb";

const Home = () => {
  return (
    <div className="flex flex-row gap-4">
      <Filter />

      <main className="flex-1 ">
        <Breadcrumb />
        hello
      </main>
    </div>
  );
};

export default Home;

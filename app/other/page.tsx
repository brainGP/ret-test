import React from "react";
import Filter from "@/components/Filter";
import Breadcrumb from "@/components/BreadCrumb";

const Home = () => {
  return (
    <div className="flex flex-row gap-4">
      {/* Filter Sidebar */}
      <aside className="w-1/4 p-4 bg-gray-50 border rounded-lg hide">
        <Filter />
      </aside>

      {/* Product Grid */}
      <main className="flex-1 ">
        <Breadcrumb />
        hello
      </main>
    </div>
  );
};

export default Home;

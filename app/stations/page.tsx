import React from "react";
import Filter from "@/components/Filter";
import ProductGrid from "@/components/ProductGrid";
import Breadcrumb from "@/components/BreadCrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import stationsData from "@/data/stations.json";

const Home = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      <aside className="w-full lg:w-1/4 p-4 bg-gray-50 border rounded-lg lg:block mb-6 lg:mb-0 sticky top-0 h-auto lg:h-auto hidden md:visible">
        <Filter />
      </aside>

      <main className="flex-1">
        <Breadcrumb />
        <ScrollArea className="rounded-md border h-full m-4 lg:m-6">
          <ProductGrid title="Гар станц" products={stationsData} />
        </ScrollArea>
      </main>
    </div>
  );
};

export default Home;

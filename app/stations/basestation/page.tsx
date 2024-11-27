import React from "react";
import Filter from "@/components/Filter";
import ProductGrid from "@/components/ProductGrid";
import Breadcrumb from "@/components/BreadCrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import stationsData from "../../../data/products.json";

interface Station {
  id: string;
  name: string;
  type: string;
  style: string;
  price: string;
  priceN: string;
  battery: string;
  power: string;
  hertz: string;
  status: string;
  size: { height: string; width: string }[];
  image: string;
}

const Home = () => {
  const stations: Station[] = stationsData[0]?.stations || [];
  return (
    <div className="flex flex-col lg:flex-row">
      <aside className="w-full lg:w-1/4 p-4 bg-gray-50 border rounded-lg lg:block mb-6 lg:mb-0 sticky top-0 h-auto lg:h-auto hidden md:visible">
        <Filter />
      </aside>

      <main className="flex-1">
        <Breadcrumb />
        <ScrollArea className="rounded-md border h-full m-4 lg:m-6">
          <ProductGrid title="Суурь" products={stations} />
        </ScrollArea>
      </main>
    </div>
  );
};

export default Home;

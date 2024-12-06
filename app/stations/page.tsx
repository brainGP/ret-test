"use client";

import React, { useState, useEffect } from "react";
import Filter from "@/components/Filter";
import ProductGrid from "@/components/ProductGrid";
import Breadcrumb from "@/components/BreadCrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import stationsData from "@/data/stations.json";
import FilterOrder from "@/components/FilterOrder";

const Home = () => {
  const [products, setProducts] = useState(stationsData);
  const [sortOrder, setSortOrder] = useState("");

  const handleOrderChange = (order: string) => {
    setSortOrder(order);
  };

  useEffect(() => {
    if (sortOrder === "hightolow") {
      setProducts((prev) =>
        [...prev].sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
      );
    } else if (sortOrder === "lowtohigh") {
      setProducts((prev) =>
        [...prev].sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
      );
    } else {
      setProducts(stationsData);
    }
  }, [sortOrder]);

  return (
    <div className="flex flex-col lg:flex-row">
      <Filter />

      <main className="flex-1 items-center">
        <div className="flex flex-col sm:flex-row justify-between mx-8 sm:mx-10 space-y-4 sm:items-center ">
          <Breadcrumb />
          <FilterOrder onOrderChange={handleOrderChange} />
        </div>

        <ScrollArea className="rounded-md h-full m-4 lg:m-6">
          <ProductGrid title="Гар станц" products={products} />
        </ScrollArea>
      </main>
    </div>
  );
};

export default Home;

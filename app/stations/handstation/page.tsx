"use client";

import React, { useState, useEffect, useCallback } from "react";
import Filter from "@/components/Filter";
import ProductGrid from "@/components/ProductGrid";
import Breadcrumb from "@/components/BreadCrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import stationsData from "@/data/stations.json";
import FilterOrder from "@/components/FilterOrder";
const Home = () => {
  const [products, setProducts] = useState(stationsData);
  const [sortOrder, setSortOrder] = useState("");

  const applyFiltersAndSorting = useCallback(() => {
    let filteredProducts = stationsData.filter(
      (station) => station.sort === "Гар станц"
    );

    if (sortOrder === "hightolow") {
      filteredProducts = filteredProducts.sort(
        (a, b) => parseFloat(b.price) - parseFloat(a.price)
      );
    } else if (sortOrder === "lowtohigh") {
      filteredProducts = filteredProducts.sort(
        (a, b) => parseFloat(a.price) - parseFloat(b.price)
      );
    }

    setProducts(filteredProducts);
  }, [sortOrder]); // Stable function depends on sortOrder

  useEffect(() => {
    applyFiltersAndSorting();
  }, [applyFiltersAndSorting]); // Now safe to include

  const handleOrderChange = (order: string) => {
    setSortOrder(order);
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <aside className="w-full lg:w-1/4 p-4 bg-gray-50 border rounded-lg lg:block mb-6 lg:mb-0 sticky top-0 h-auto lg:h-auto hidden md:visible">
        <Filter />
      </aside>

      <main className="flex-1">
        <div className="flex flex-row justify-between space-x-4 mb-4 mx-6">
          <Breadcrumb />
          <FilterOrder onOrderChange={handleOrderChange} />
        </div>
        <ScrollArea className="rounded-md border h-full m-4 lg:m-6">
          <ProductGrid title="Гар станц" products={products} />
        </ScrollArea>
      </main>
    </div>
  );
};

export default Home;

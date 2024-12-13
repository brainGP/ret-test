"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "@/components/Filter";
import ProductGrid from "@/components/ProductGrid";
import Breadcrumb from "@/components/BreadCrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import FilterOrder from "@/components/FilterOrder";
import { useParams } from "next/navigation";
import NotFound from "@/app/not-found";

interface Station {
  _id: string;
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
  sort: string;
  brand: string;
}

const Home = () => {
  const [products, setProducts] = useState<Station[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("lowtohigh");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { brand } = useParams();

  const handleOrderChange = (order: string) => {
    setSortOrder(order);
  };

  useEffect(() => {
    const fetchAndSortProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get("http://localhost:3001/api/product");
        const productsData: Station[] = response.data.products || [];

        const filteredProducts = productsData.filter(
          (product) => product.brand === brand
        );

        const sortedProducts = [...filteredProducts];
        if (sortOrder === "hightolow") {
          sortedProducts.sort(
            (a, b) =>
              parseFloat(b.priceN as string) - parseFloat(a.priceN as string)
          );
        } else if (sortOrder === "lowtohigh") {
          sortedProducts.sort(
            (a, b) =>
              parseFloat(a.priceN as string) - parseFloat(b.priceN as string)
          );
        }

        setProducts(sortedProducts);
      } catch {
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (brand) {
      fetchAndSortProducts();
    }
  }, [sortOrder, brand]);

  return (
    <div className="flex flex-col lg:flex-row">
      <Filter />
      <main className="flex-1 items-center">
        <div className="flex flex-col sm:flex-row justify-between mx-8 sm:mx-10 space-y-4 sm:items-center">
          <Breadcrumb />

          <FilterOrder onOrderChange={handleOrderChange} />
        </div>

        {loading && (
          <p className="text-center text-gray-500">Loading products...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        {products.length === 0 && !loading && !error && (
          <NotFound explain="Энэ брэндийн бүтээгдэхүүн байхгүй байна." />
        )}

        {/* Product Grid */}
        {products.length > 0 && (
          <ScrollArea className="rounded-md h-full m-4 lg:m-6">
            <ProductGrid title={`Брэнд: ${brand}`} products={products} />
          </ScrollArea>
        )}
      </main>
    </div>
  );
};

export default Home;

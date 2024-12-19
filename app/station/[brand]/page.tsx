"use client";

import React, { useState, useEffect } from "react";
import Filter from "@/components/Filter";
import ProductGrid from "@/components/ProductGrid";
import Breadcrumb from "@/components/BreadCrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import FilterOrder from "@/components/FilterOrder";
import { useParams } from "next/navigation";
import NotFound from "@/app/not-found";
import { Product } from "@/types/Product";
import { GET } from "@/apis/axios";
import { toast } from "sonner";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("lowtohigh");
  const [loading, setLoading] = useState<boolean>(false);

  const { brand } = useParams();

  const handleOrderChange = (order: string) => {
    setSortOrder(order);
  };

  useEffect(() => {
    const fetchAndSortProducts = async () => {
      setLoading(true);

      try {
        const response = await GET({ route: `/api/product` });
        const productsData: Product[] = response.data.products || [];
        const filteredProducts = productsData.filter(
          (product) => product.brand === brand
        );

        const sortedProducts = [...filteredProducts];
        if (sortOrder === "hightolow") {
          sortedProducts.sort(
            (a, b) =>
              parseFloat(b.priceN?.toString() || "0") -
              parseFloat(a.priceN?.toString() || "0")
          );
        } else if (sortOrder === "lowtohigh") {
          sortedProducts.sort(
            (a, b) =>
              parseFloat(a.priceN?.toString() || "0") -
              parseFloat(b.priceN?.toString() || "0")
          );
        }

        setProducts(sortedProducts);
      } catch {
        toast.error("Алдаа гарлаа. Та дахин оролдоно уу");
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

        {products.length === 0 && !loading && (
          <NotFound explain="Энэ брэндийн бүтээгдэхүүн байхгүй байна." />
        )}

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

"use client";

import React, { useState, useEffect } from "react";
import { GET } from "@/apis/axios";
import Filter from "@/components/Filter";
import ProductGrid from "@/components/ProductGrid";
import Breadcrumb from "@/components/BreadCrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import FilterOrder from "@/components/FilterOrder";
import { Product } from "@/types/Product";
import { LoadingError } from "@/components/LoadingError";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("lowtohigh");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleOrderChange = (order: string) => {
    setSortOrder(order);
  };

  useEffect(() => {
    const fetchAndSortProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await GET({ route: `/api/product` });
        const productsData: Product[] = response.data.products || [];

        const filteredProducts = productsData.filter(
          (product) => product.sort === "Суурин станц"
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

    fetchAndSortProducts();
  }, [sortOrder]);

  return (
    <>
      <Header />
      <div className="flex flex-col lg:flex-row">
        <Filter />
        <main className="flex-1 items-center">
          <div className="flex flex-col sm:flex-row justify-between mx-8 sm:mx-10 space-y-4 sm:items-center">
            <Breadcrumb />

            <FilterOrder onOrderChange={handleOrderChange} />
          </div>

          <LoadingError isLoading={loading} error={error} />
          <ScrollArea className="rounded-md h-full m-4 lg:m-6">
            <ProductGrid title="Гар станц" products={products} />
          </ScrollArea>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Home;

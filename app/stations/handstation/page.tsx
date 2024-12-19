"use client";
import React, { useState, useEffect } from "react";
import Filter from "@/components/Filter";
import ProductGrid from "@/components/ProductGrid";
import Breadcrumb from "@/components/BreadCrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import FilterOrder from "@/components/FilterOrder";
import { Product } from "@/types/Product";
import { LoadingError } from "@/components/LoadingError";
import { GET } from "@/apis/axios";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("lowtohigh");
  const [loading, setLoading] = useState<boolean>(false);

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
          (product) => product.sort === "Гар станц"
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
        toast.error("Алдаа гарлаа. Та дахин оролдоно уу");
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

          <LoadingError isLoading={loading} />

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

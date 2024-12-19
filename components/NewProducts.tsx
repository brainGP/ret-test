"use client";
import React, { useState, useEffect } from "react";
import ProductGrid from "./ProductGrid";
import { GET } from "@/apis/axios";

import { Product } from "@/types/Product";
import { LoadingError } from "./LoadingError";
import { toast } from "sonner";

const NewProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchAndSortProducts = async () => {
      setLoading(true);

      try {
        const response = await GET({ route: `/api/product/?new=true` });

        const productsData: Product[] = response.data.products || [];
        setProducts(productsData);
      } catch {
        toast.error("Алдаа гарлаа. Та дахин оролдоно уу");
      } finally {
        setLoading(false);
      }
    };

    fetchAndSortProducts();
  }, []);

  return (
    <div>
      <div className="relative overflow-hidden w-full max-w-[1536px] p-8">
        <div className="flex items-center py-8 gap-4">
          <div className="w-2 h-2 bg-yellow rounded-full" />
          <p className="text-lg font-semibold text-gray">Шинэ бүтээгдэхүүн</p>
        </div>
        <LoadingError isLoading={loading} />

        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default NewProducts;

"use client";
import React, { useState, useEffect } from "react";
import ProductGrid from "./ProductGrid";
import { GET } from "@/apis/axios";

import { Product } from "@/types/Product";
import { LoadingError } from "./LoadingError";

const NewProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndSortProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await GET({ route: `/api/product/?new=true` });

        const productsData: Product[] = response.data.products || [];
        setProducts(productsData);
        console.log(productsData);
      } catch {
        setError("Failed to fetch products. Please try again later.");
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
        <LoadingError isLoading={loading} error={error} />
        {error && <p className="text-center text-red-500">{error}</p>}

        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default NewProducts;

"use client";
import React from "react";
import ProductGrid from "./ProductGrid";
import { LoadingError } from "./LoadingError";
import { getNewProducts } from "@/apis/products";
import { useQuery } from "@tanstack/react-query";

const NewProducts = () => {
  const { data, isLoading } = useQuery({
    queryFn: getNewProducts,
    queryKey: ["new", "products"],
  });

  return (
    <div>
      <div className="relative overflow-hidden w-full max-w-[1536px] p-8">
        <div className="flex items-center py-8 gap-4">
          <div className="w-2 h-2 bg-yellow rounded-full" />
          <p className="text-lg font-semibold text-gray">Шинэ бүтээгдэхүүн</p>
        </div>
        <LoadingError isLoading={isLoading} />
        {data && <ProductGrid products={data} />}
      </div>
    </div>
  );
};

export default NewProducts;

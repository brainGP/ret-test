"use client";
import React from "react";
import ProductGrid from "./ProductGrid";
import { LoadingError } from "./LoadingError";
import { getNewProducts } from "@/apis/products";
import { useQuery } from "@tanstack/react-query";
import ProductGridSkeleton from "@/skeletons/ProductGridSkeleton";

const NewProducts = () => {
  const { data, isLoading, error } = useQuery({
    queryFn: getNewProducts,
    queryKey: ["new", "products"],
  });

  if (isLoading) {
    return (
      <div className="relative overflow-hidden w-full max-w-[1536px] p-8">
        <div className="flex items-center py-8 gap-4">
          <div className="w-2 h-2 bg-yellow rounded-full" />
          <p className="text-lg font-semibold text-gray">Шинэ бүтээгдэхүүн</p>
        </div>
        <ProductGridSkeleton />
      </div>
    );
  }

  if (error) {
    return <LoadingError isLoading={true} />;
  }

  return (
    <div className="relative overflow-hidden w-full max-w-[1536px] p-8">
      <div className="flex items-center py-8 gap-4">
        <div className="w-2 h-2 bg-yellow rounded-full" />
        <p className="text-lg font-semibold text-gray">Шинэ бүтээгдэхүүн</p>
      </div>
      {data && <ProductGrid products={data} />}
    </div>
  );
};

export default NewProducts;

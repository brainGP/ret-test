"use client";
import React, { ReactNode, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import ProductGrid from "../ProductGrid";
import FilterOrder from "../FilterOrder";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/Product";
import { LoadingError } from "../LoadingError";
import { LoadingWait } from "../LoadingWait";

type ProductDisplay = {
  title: string;
  hasSort?: boolean;
  fetcherKey?: string[];
  fetcher: () => Promise<Product[]>;
  filter?: (product: Product) => boolean;
  error?: ReactNode;
  loader?: ReactNode;
};
const ProductDisplay = ({
  title,
  hasSort = true,
  fetcherKey,
  fetcher,
  filter,
  error = (
    <div className="w-full text-center text-gray/40">Жагсаалт хоосон байна</div>
  ),
  loader = (
    <div className="w-full flex justify-center items-center">
      <LoadingWait isLoading={true} />
    </div>
  ),
}: ProductDisplay) => {
  const [sortOrder, setSortOrder] = useState<string>("lowtohigh");

  const getFilteredProducts = async () => {
    const data = await fetcher();
    if (!filter) return data;

    const filteredData = data.filter(filter);
    if (sortOrder === "hightolow") {
      filteredData.sort(
        (a, b) =>
          parseFloat(b.priceN?.toString() || "0") -
          parseFloat(a.priceN?.toString() || "0")
      );
    } else if (sortOrder === "lowtohigh") {
      filteredData.sort(
        (a, b) =>
          parseFloat(a.priceN?.toString() || "0") -
          parseFloat(b.priceN?.toString() || "0")
      );
    }
    return filteredData;
  };

  const { data, isLoading } = useQuery({
    queryFn: getFilteredProducts,
    queryKey: [sortOrder, fetcherKey, "products"],
  });

  const handleOrderChange = (order: string) => {
    setSortOrder(order);
  };

  return (
    <div className="w-full flex flex-col">
      {hasSort && (
        <div className="w-full flex justify-end">
          <FilterOrder onOrderChange={handleOrderChange} />
        </div>
      )}
      {isLoading && loader}

      {(!data || data.length == 0) && !isLoading && error && error}

      {data && data.length > 0 && (
        <ScrollArea>
          <ProductGrid title={title} products={data} />
        </ScrollArea>
      )}
    </div>
  );
};

export default ProductDisplay;

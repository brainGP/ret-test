"use client";

import React, { ReactNode, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import ProductGrid from "../ProductGrid";
import FilterOrder from "../FilterOrder";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/Product";
import { LoadingWait } from "../LoadingWait";
import BackButton from "../BackButton";
import Breadcrumb from "../BreadCrumb";
import TypeFilter from "../TypeFilter";
import { usePathname } from "next/navigation";

type SortOrder = "lowtohigh" | "hightolow";

type ProductDisplayProps = {
  title: string;
  hasSort?: boolean;
  fetcherKey?: string[];
  fetcher: () => Promise<Product[]>;
  filter?: (product: Product) => boolean;
  error?: ReactNode;
  loader?: ReactNode;
};

const ProductDisplay: React.FC<ProductDisplayProps> = ({
  title,
  hasSort = true,
  fetcherKey = [],
  fetcher,
  filter,
  error = (
    <div className="w-full h-64">
      <div className="flex absolute my-4">
        <BackButton />
      </div>
      <div className=" flex justify-center items-center w-full h-full">
        <span className="text-center">Жагсаалт хоосон байна</span>
      </div>
    </div>
  ),
  loader = (
    <div className="w-full flex justify-center items-center">
      <LoadingWait isLoading={true} />
    </div>
  ),
}) => {
  const [sortOrder, setSortOrder] = useState<SortOrder>("lowtohigh");

  const getFilteredProducts = async () => {
    const data = await fetcher();
    const filteredData = filter ? data.filter(filter) : data;

    const parsePrice = (price: string | number | undefined): number => {
      if (!price) return 0;
      return typeof price === "number"
        ? price
        : parseFloat(price.toString().replace(/[^0-9.]/g, ""));
    };

    return filteredData.sort((a, b) => {
      const multiplier = sortOrder === "hightolow" ? -1 : 1;
      return multiplier * (parsePrice(a.priceN) - parsePrice(b.priceN));
    });
  };

  const { data, isLoading, isError } = useQuery({
    queryFn: getFilteredProducts,
    queryKey: [sortOrder, ...fetcherKey, "products"],
  });

  const handleOrderChange = (order: SortOrder) => {
    setSortOrder(order);
  };
  const pathname = usePathname();
  const showTypeFilter = pathname.startsWith("/stations");

  return (
    <div className="w-full flex flex-col relative">
      {hasSort && (
        <div className="w-full flex flex-wrap gap-4 items-center justify-between md:pr-4 py-4">
          <Breadcrumb />
          <div className="w-full flex justify-between gap-4">
            {showTypeFilter && <TypeFilter />}
            <FilterOrder onOrderChange={handleOrderChange} />
          </div>
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center items-start bg-white bg-opacity-50 overflow-hidden">
          {loader}
        </div>
      )}
      {isError && !isLoading && error}
      {data && data.length > 0 && !isLoading && (
        <ScrollArea>
          <ProductGrid title={title} products={data} />
        </ScrollArea>
      )}
      {!data?.length && !isLoading && !isError && error}
    </div>
  );
};

export default ProductDisplay;

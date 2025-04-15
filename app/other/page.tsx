"use client";
import React from "react";
import Filter from "@/components/Filter";
import { getProducts, getProductsByBrand } from "@/apis/products";
import ProductDisplay from "@/components/Products/ProductDisplay";
import { useSearchParams } from "next/navigation";
import { Product } from "@/types/Product";
import ProductGridSkeleton from "@/skeletons/ProductGridSkeleton";

const OtherPage = () => {
  const searchparams = useSearchParams();
  const brand = searchparams.get("brand") as string;
  const type = searchparams.get("type") as string;

  const filterMap: Record<string, string> = {
    other: "Бусад бараа",
  };

  const fetcher = brand ? () => getProductsByBrand({ brand }) : getProducts;
  const filter = (product: Product) =>
    !type || type === "other" ? product.sort === filterMap["other"] : true;

  const title = "Бусад бараа";

  return (
    <div className="flex flex-col lg:flex-row">
      <Filter />
      <div className="w-full flex flex-col p-4">
        <ProductDisplay
          title={title}
          fetcher={fetcher}
          fetcherKey={[brand, type || "other"]}
          filter={filter}
          loader={<ProductGridSkeleton />}
        />
      </div>
    </div>
  );
};

export default OtherPage;

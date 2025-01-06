"use client";
import React from "react";
import Filter from "@/components/Filter";
import Breadcrumb from "@/components/BreadCrumb";
import { getProducts, getProductsByBrand } from "@/apis/products";
import ProductDisplay from "@/components/Products/ProductDisplay";
import { useSearchParams } from "next/navigation";
import { Product } from "@/types/Product";
import ProductGridSkeleton from "@/skeletons/ProductGridSkeleton";

const Home = () => {
  const searchparams = useSearchParams();
  const brand = searchparams.get("brand") as string;
  const type = searchparams.get("type") as string;
  const filterMap: Record<string, string> = {
    handstation: "Гар станц",
    basestation: "Суурин станц",
    equipments: "Дагалдах хэрэгслүүд",
  };

  const fetcher = brand ? () => getProductsByBrand({ brand }) : getProducts;
  const filter = type
    ? (product: Product) => product.sort === filterMap[type]
    : undefined;

  const title = type ? filterMap[type] : "Бүх бараа";

  return (
    <div className="flex flex-col lg:flex-row">
      <Filter />
      <div className="w-full flex flex-col p-4 pl-8">
        <div className="flex">
          <Breadcrumb />
        </div>

        <ProductDisplay
          title={title}
          fetcher={fetcher}
          fetcherKey={[brand, type]}
          filter={filter}
          loader={<ProductGridSkeleton />}
        />
      </div>
    </div>
  );
};

export default Home;

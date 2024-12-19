"use client";
import React from "react";
import Filter from "@/components/Filter";
import Breadcrumb from "@/components/BreadCrumb";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
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
  };

  const fetcher = brand ? () => getProductsByBrand({ brand }) : getProducts;
  const filter = type
    ? (product: Product) => product.sort == filterMap[type]
    : undefined;

  return (
    <main>
      <Header />
      <div className="flex flex-col lg:flex-row">
        <Filter />
        <div className="w-full flex flex-col p-8">
          <div className="flex">
            <Breadcrumb />
          </div>
          <ProductDisplay
            title="Гар станц"
            fetcher={fetcher}
            fetcherKey={[brand, type]}
            filter={filter}
            loader={<ProductGridSkeleton />}
          />
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Home;

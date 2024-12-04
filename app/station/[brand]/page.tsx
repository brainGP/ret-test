"use client";
import React from "react";
import { useParams } from "next/navigation";
import stationsData from "@/data/stations.json";
import ProductGrid from "@/components/ProductGrid";
import NotFound from "@/app/not-found";

const BrandProducts = () => {
  const params = useParams();
  const brandname = params?.brand;

  const products = stationsData.filter(
    (station) => station.brand === brandname
  );

  return (
    <div className="container mx-auto px-4">
      {products.length === 0 ? (
        <div className="flex flex-col justify-center">
          <NotFound explain="Энэ брэндийн бүтээгдэхүүн байхгүй байна." />
        </div>
      ) : (
        <ProductGrid
          title={` ${brandname} брэндийн бүтээгдэхүүнүүд`}
          products={products}
        />
      )}
    </div>
  );
};

export default BrandProducts;

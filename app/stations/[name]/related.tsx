"use client";
import { getProducts } from "@/apis/products";
import ProductDisplay from "@/components/Products/ProductDisplay";
import React from "react";

const RelatedProducts = ({ brand, id }: { brand: string; id: string }) => {
  return (
    <ProductDisplay
      title={`${brand} брэндийн бусад бүтээгдэхүүнүүд`}
      fetcher={getProducts}
      filter={(product) => product.brand == brand && product._id != id}
      fetcherKey={[brand, id]}
      error
    />
  );
};

export default RelatedProducts;

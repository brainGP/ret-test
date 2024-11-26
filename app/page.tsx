"use client";

import Carousel from "@/components/Carousel";
import React from "react";
import LogoSlider from "@/components/LogoSlider";
import NewProducts from "@/components/NewProducts";
import ProductGrid from "@/components/ProductGrid";
import products from "@/data/products.json";

const Home = () => {
  return (
    <div>
      <main>
        <Carousel />
        <LogoSlider />
        <NewProducts />
        <ProductGrid title="Аялал зугаалга" products={products} />
      </main>
    </div>
  );
};

export default Home;

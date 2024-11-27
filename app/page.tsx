"use client";

import Carousel from "@/components/Carousel";
import React from "react";
import LogoSlider from "@/components/LogoSlider";
import NewProducts from "@/components/NewProducts";
import ProductGrid from "@/components/ProductGrid";
import stationsData from "@/data/products.json";

// Define the station structure
interface Station {
  id: string;
  name: string;
  type: string;
  style: string;
  price: string;
  priceN: string;
  battery: string;
  power: string;
  hertz: string;
  status: string;
  size: { height: string; width: string }[];
  image: string;
}

// Define the structure of stationsData
interface StationsData {
  stations: Station[];
}

const Home = () => {
  const stations: Station[] = stationsData[0]?.stations || []; // Correct type and fallback if no data

  return (
    <div>
      <main>
        <Carousel />
        <LogoSlider />
        <NewProducts />

        <ProductGrid products={stations} title="Өндрийн станцууд" />
      </main>
    </div>
  );
};

export default Home;

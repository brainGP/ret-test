"use client";
import { Carousel } from "@/components/ui/carousel";
import LogoSlider from "@/components/LogoSlider";
import NewProducts from "@/components/NewProducts";
const Home = () => {
  return (
    <div>
      <main>
        <Carousel />
        <LogoSlider />
        <NewProducts />
      </main>
    </div>
  );
};

export default Home;

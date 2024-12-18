"use client";
import Carousel from "@/components/ui/carousel";
import LogoSlider from "@/components/LogoSlider";
import NewProducts from "@/components/NewProducts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const Home = () => {
  return (
    <div>
      <main>
        <Header />
        <Carousel />
        <LogoSlider />
        <NewProducts />
        <Footer />
      </main>
    </div>
  );
};

export default Home;

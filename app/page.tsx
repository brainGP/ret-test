"use client";
import CustomCarousel from "@/components/Carousel";
import LogoSlider from "@/components/LogoSlider";
import NewProducts from "@/components/NewProducts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div>
      <Header />
      <CustomCarousel />
      <LogoSlider />
      <NewProducts />
      <Footer />
    </div>
  );
};

export default Home;

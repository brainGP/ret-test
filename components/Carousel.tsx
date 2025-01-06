"use client";

import React, { useEffect, useState, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { getBanners } from "@/apis/banner";
import { Banner } from "@/types/Banner";
import { baseUrl } from "@/lib/staticData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const CustomCarousel = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [activeIndex, setActiveIndex] = useState(0); // Add state for active index
  const slideCount = banners.length;
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const fetchedBanners = await getBanners();
        console.log("Fetched Banners:", fetchedBanners); // Log the fetched data
        setBanners(fetchedBanners);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);

  if (banners.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative w-full flex justify-center items-start md:items-center overflow-hidden">
      <Carousel
        plugins={[plugin.current]}
        className="relative w-full h-[30vh] sm:h-[40vh] md:h-[60vh]"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {banners.map((banner, index) =>
            banner.images.map((image, imgIndex) => {
              const imgUrl = `${baseUrl}${image.image}`;

              return (
                <CarouselItem key={imgIndex}>
                  <div className="relative w-full h-auto items-center">
                    <Image
                      src={imgUrl}
                      alt={`Banner ${index} Image ${imgIndex}`}
                      className="object-contain p-4 h-auto w-full transition-all duration-300 "
                      priority={true}
                      width={600}
                      height={600}
                    />
                  </div>
                </CarouselItem>
              );
            })
          )}
        </CarouselContent>

        {/* Carousel Controls */}
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* Dot Navigation */}
      <div className="absolute z-30 flex -translate-x-1/2 space-x-3 bottom-5 left-1/2">
        {banners[0]?.images?.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === activeIndex ? "bg-yellow-500" : "bg-blue-500"
            }`}
            onClick={() => setActiveIndex(index)} // Direct navigation on click
          />
        ))}
      </div>
    </div>
  );
};

export default CustomCarousel;

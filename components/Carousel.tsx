"use client";

import React, { useEffect, useState, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { getBanners } from "@/apis/banner";
import { baseUrl } from "@/lib/staticData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

interface Banner {
  _id: string;
  image: string;
}

const CustomCarousel = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const slideCount = banners.length;
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const fetchedBanners = await getBanners();
        console.log("Fetched Banners:", fetchedBanners);
        setBanners(fetchedBanners);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);

  if (slideCount === 0) {
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
          {banners.map((banner, index) => {
            const imgUrl = `${baseUrl}${banner.image}`; // Ensure image is a string

            return (
              <CarouselItem key={index}>
                <div className="relative w-full h-auto items-center">
                  <Image
                    src={imgUrl}
                    alt={`Banner ${index}`}
                    className="object-contain p-4 h-auto w-full transition-all duration-300"
                    priority={true}
                    width={600}
                    height={600}
                  />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Carousel Controls */}
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* Dot Navigation */}
      <div className="absolute z-30 flex -translate-x-1/2 space-x-3 bottom-5 left-1/2">
        {banners.map((_, index) => (
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

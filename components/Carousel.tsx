"use client";

import React, { useEffect, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { useQuery } from "@tanstack/react-query";
import { getBanners } from "@/apis/banner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import CarouselSkeleton from "@/skeletons/CarouselSkeleton";

interface Banner {
  _id: string;
  image: string;
}

const fetchBanners = async (): Promise<Banner[]> => {
  const banners = await getBanners();
  return banners;
};

const CarouselComponent = () => {
  const autoplayPlugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );
  const {
    data: banners = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["banners"],
    queryFn: fetchBanners,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  useEffect(() => {
    const plugin = autoplayPlugin.current;
    return () => {
      plugin.reset();
    };
  }, []);

  if (isLoading) return <CarouselSkeleton />;
  if (isError) return <div className="text-center">Failed to load banners</div>;

  return (
    <div className="relative w-full flex justify-center items-start md:items-center overflow-hidden">
      <Carousel
        plugins={[autoplayPlugin.current]}
        className="relative w-full h-[30vh] sm:h-[40vh] md:h-[60vh]"
        onMouseEnter={autoplayPlugin.current.stop}
        onMouseLeave={autoplayPlugin.current.reset}
      >
        <CarouselContent>
          {banners.map((banner) => {
            return (
              <CarouselItem key={banner._id}>
                <div className="relative w-full h-[30vh] sm:h-[40vh] md:h-[60vh]">
                  <Image
                    src={banner.image}
                    alt={`Banner featuring ${banner._id}`}
                    className="object-cover object-center"
                    priority={true}
                    fill
                    sizes="100vw"
                  />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="absolute left-6 lg:left-8 h-6 w-6 lg:h-8 lg:w-8" />
        <CarouselNext className="absolute right-6 lg:right-8 h-6 w-6 lg:h-8 lg:w-8" />
      </Carousel>
    </div>
  );
};

export default CarouselComponent;

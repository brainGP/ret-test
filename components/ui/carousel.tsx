"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const slides = [
  { src: "/swipe_images/Poster1.png", alt: "Swipe 1" },
  { src: "/swipe_images/Poster2.png", alt: "Swipe 2" },
  { src: "/swipe_images/Poster3.png", alt: "Swipe 3" },
  { src: "/swipe_images/Poster4.png", alt: "Swipe 4" },
];

const CustomCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const slideCount = slides.length;
  const autoPlayInterval = 3000;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slideCount);
    }, autoPlayInterval);
    return () => clearInterval(interval);
  }, [slideCount]);

  return (
    <div className="relative w-full ">
      <div className="relative h-[30vh] sm:h-[40vh] md:h-[60vh] overflow-hidden rounded-lg">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={true}
            />
          </div>
        ))}
      </div>

      <div className="absolute z-30 flex -translate-x-1/2 space-x-3 bottom-5 left-1/2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === activeIndex ? "bg-yellow" : "bg-blue"
            }`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>

      <button
        type="button"
        className="absolute top-1/2 left-0 z-30 flex items-center justify-center h-10 px-4 cursor-pointer group focus:outline-none transform -translate-y-1/2"
        onClick={() =>
          setActiveIndex(
            (prevIndex) => (prevIndex - 1 + slideCount) % slideCount
          )
        }
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray/30 group-hover:bg-white/50 dark:group-hover:bg-gray/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray/70 group-focus:outline-none">
          <Image
            src="icons/left.svg"
            alt="icon"
            width={12}
            height={12}
            priority={true}
          />
        </span>
      </button>

      <button
        type="button"
        className="absolute top-1/2 right-0 z-30 flex items-center justify-center h-10 px-4 cursor-pointer group focus:outline-none transform -translate-y-1/2"
        onClick={() =>
          setActiveIndex((prevIndex) => (prevIndex + 1) % slideCount)
        }
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray/30 group-hover:bg-white/50 dark:group-hover:bg-gray/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray/70 group-focus:outline-none">
          <Image
            src="icons/right.svg"
            alt="icon"
            width={12}
            height={12}
            priority={true}
          />
        </span>
      </button>
    </div>
  );
};

export default CustomCarousel;

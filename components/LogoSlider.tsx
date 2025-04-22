"use client";

import React from "react";
import Image from "next/image";
import data from "@/data/products.json";

const LogoSlider: React.FC = () => {
  const logos = data[0]?.logos || [];

  return (
    <div className="relative overflow-hidden w-full px-8 md:px-12 lg:px-16">
      {/* Section Header */}
      <div className="flex items-center py-8 gap-4">
        <div className="w-2 h-2 bg-yellow rounded-full" />
        <div className="text-lg font-semibold text-gray">Брэндүүд</div>
      </div>

      {/* Scrolling Logos */}
      <div className="flex space-x-10 animate-marquee justify-center items-center">
        {logos.map((logo, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 h-12 md:h-20 lg:h-28 w-24 md:w-32 lg:w-40"
          >
            <Image
              src={logo.src}
              alt={logo.alt || `Брэнд лого ${index + 1}`}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 160px"
            />
          </div>
        ))}

        {/* Duplicate for seamless animation */}
        {logos.map((logo, index) => (
          <div
            key={`repeat-${index}`}
            className="relative flex-shrink-0 h-12 md:h-20 lg:h-28 w-24 md:w-32 lg:w-40"
          >
            <Image
              src={logo.src}
              alt={logo.alt || `Брэнд лого давталт ${index + 1}`}
              fill
              className="object-contain"
              loading="lazy"
              sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 160px"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoSlider;

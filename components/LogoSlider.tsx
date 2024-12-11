"use client";

import React from "react";
import Image from "next/image";
import data from "@/data/products.json";

const LogoSlider: React.FC = () => {
  const logos = data[0]?.logos || [];
  return (
    <div className="relative overflow-hidden w-full p-8">
      <div className="flex items-center py-8 gap-4">
        <div className="w-2 h-2 bg-yellow rounded-full" />
        <div className="text-lg font-semibold text-gray">Брэндүүд</div>
      </div>
      <div className="flex space-x-10 animate-marquee items-end">
        {logos.map((logo, index) => (
          <div key={index} className="flex-shrink-0 w-36 md:w-48 lg:w-60">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={200}
              height={100}
              style={{ objectFit: "contain" }}
              priority={true}
            />
          </div>
        ))}

        {logos.map((logo, index) => (
          <div
            key={`repeat-${index}`}
            className="flex-shrink-0 w-36 md:w-48 lg:w-60"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={200}
              height={100}
              style={{ objectFit: "contain" }}
              priority={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoSlider;

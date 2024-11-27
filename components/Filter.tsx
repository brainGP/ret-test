import React from "react";
import Image from "next/image";
import data from "@/data/products.json";

const Filter = () => {
  const logos = data[1]?.logos || [];

  return (
    <div className="flex flex-col gap-6 justify-center items-center">
      <h3 className="font-semibold mb-4 text-lg md:text-xl">Шүүлтүүр</h3>

      <div className="flex flex-wrap justify-center gap-12">
        {logos.map((logo, index) => (
          <div key={index} className="flex justify-center">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={200}
              height={100}
              style={{ objectFit: "contain" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;

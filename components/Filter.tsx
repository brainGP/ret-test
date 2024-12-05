import React from "react";
import Image from "next/image";
import Link from "next/link";
import data from "@/data/products.json";

const Filter = () => {
  const logos = data[0]?.logos || [];

  return (
    <aside className="w-1/6 p-4 bg-gray-50 rounded-lg lg:block mb-4 lg:mb-0 sticky top-0 h-screen hidden md:visible">
      <div className="flex flex-col gap-6 justify-center items-center">
        <h3 className="font-semibold mb-4 text-lg md:text-xl">Брэндүүд</h3>

        <div className="flex flex-wrap justify-center gap-12">
          {logos.map((logo, index) => (
            <Link
              key={index}
              href={`/station/${logo.name}`}
              passHref
              className="flex justify-center cursor-pointer"
            >
              <div className="hover:scale-110 transition">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={60}
                  style={{ objectFit: "contain" }}
                  priority={true}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Filter;

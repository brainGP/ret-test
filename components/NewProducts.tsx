import React from "react";
// import Image from "next/image";

// const products = [
//   { src: "/logos/logo1.svg", alt: "Logo 1" },
//   { src: "/logos/logo2.svg", alt: "Logo 2" },
//   { src: "/logos/logo3.svg", alt: "Logo 3" },
//   { src: "/logos/logo4.svg", alt: "Logo 4" },
//   { src: "/logos/logo5.svg", alt: "Logo 5" },
//   { src: "/logos/logo6.svg", alt: "Logo 6" },
// ];

function NewProducts() {
  return (
    <div>
      <div className="relative overflow-hidden w-full max-w-[1536px] p-8">
        <div className="flex items-center py-8 gap-4">
          <div className="w-2 h-2 bg-yellow rounded-full" />
          <p className="text-lg font-semibold text-gray">Шинэ бүтээгдэхүүн</p>
        </div>
        <div className="flex space-x-10 animate-marquee"></div>
      </div>
    </div>
  );
}

export default NewProducts;

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface Station {
  id: string;
  name: string;
  type: string;
  style: string;
  price: string;
  priceN: string;
  battery: string;
  power: string;
  hertz: string;
  status: string;
  size: { height: string; width: string }[];
  image: string;
}

interface ProductGridProps {
  title: string;
  products: Station[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ title, products }) => {
  return (
    <section className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between my-6">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 bg-yellow-500 rounded-full" />
          <p className="text-lg font-semibold text-gray-700">{title}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product) => (
          <Link href={`/stations/${product.id}`} key={product.id}>
            <div className="border p-4 h-[380px] w-full rounded-md shadow-md transition-transform hover:scale-105">
              <div className="relative h-48 w-full bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={80}
                  height={80}
                  className="object-contain"
                  priority={true}
                />
              </div>
              <h3 className="mt-4 text-sm sm:text-base font-medium text-gray-800">
                {product.name}
              </h3>
              <p className="text-orange-500 font-semibold text-lg">
                {product.price}
              </p>
              <p className="text-sm text-gray-500">{product.type}</p>
              <p className="text-sm text-gray-500">{product.style}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;

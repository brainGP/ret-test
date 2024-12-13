import React from "react";
import Link from "next/link";
import Image from "next/image";

interface Station {
  _id: string;
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
  title?: string;
  products: Station[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ title, products }) => {
  return (
    <section className="mx-auto text-gray">
      {title && (
        <div className="flex items-center gap-4 my-6">
          <p className="text-xl md:text-2xl lg:text-3xl font-semibold">
            {title}
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product) => {
          return (
            <Link href={`/stations/${product.name}`} key={product._id}>
              <div className="border h-[380px] w-full rounded-md shadow-md transition-transform hover:scale-105 flex flex-col">
                <div className="relative h-48 w-full rounded-md overflow-hidden flex items-center justify-center mb-4">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${product.image}`}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="object-contain w-full h-full p-2"
                    priority={true}
                  />
                </div>
                <div className="m-4">
                  <h3 className="my-2 text-xl font-semibold">{product.name}</h3>
                  <p className="font-semibold text-base">{product.priceN}</p>
                  <p className="text-sm text-start">
                    {product.type} {product.style}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default ProductGrid;

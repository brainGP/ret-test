import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/Product";
import { formatPrice } from "@/utils/formatPrice";
import { formatText } from "@/utils/formatText";

interface ProductGridProps {
  title?: string;
  products: Product[];
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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5">
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;

const ProductCard = ({ product }: { product: Product }) => {
  const imgUrl = product.images[0].image;

  return (
    <Link href={`/stations/${product.name}`}>
      <div className="border hover:border-gray/30 transition-all duration-300 h-[320px] w-full rounded-md bg-white  group flex flex-col">
        <div className="relative h-48 w-full rounded-md overflow-hidden flex items-center justify-center">
          <Image
            src={imgUrl || "/noresult.png"}
            alt={product.name}
            width={200}
            height={200}
            className="object-contain w-full h-full p-2 transition-all duration-300 group-hover:scale-105"
            priority={true}
          />
        </div>
        <div className="mx-4">
          <h3 className="text-xl font-semibold">{formatText(product.name)}</h3>
          <p className="font-semibold text-base">
            {formatPrice(product.priceN)}₮
          </p>
          <p className="text-sm text-start">
            {product.type} {product.style}
          </p>
        </div>
      </div>
    </Link>
  );
};

import React from "react";

// Define the station structure
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
    <section className="container mx-auto px-4 md:px-8 py-6">
      {/* Title Section */}
      <div className="flex items-center justify-between my-6">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 bg-yellow-500 rounded-full" />
          <p className="text-lg font-semibold text-gray-700">{title}</p>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {products.map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            className="border p-4 rounded-md shadow-md transition-transform hover:scale-105"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-24 sm:h-28 md:h-36 object-contain mb-4"
            />
            <h3 className="text-sm sm:text-base font-medium text-gray-800">
              {product.name}
            </h3>
            <p className="text-orange-500 font-semibold">{product.price}</p>
            <p className="text-sm text-gray-500">{product.type}</p>
            <p className="text-sm text-gray-500">{product.style}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;

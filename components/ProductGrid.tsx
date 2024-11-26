import React from "react";

interface Product {
  name: string;
  price: string;
  image: string;
}

interface ProductGridProps {
  title: string;
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ title, products }) => {
  return (
    <section className="container mx-auto py-10 px-4">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-6">
        {title}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map((product, index) => (
          <div key={index} className="border p-4 rounded-md">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-20 sm:h-28 object-contain mb-4"
            />
            <h3 className="text-sm sm:text-base font-medium">{product.name}</h3>
            <p className="text-orange-500 font-semibold">{product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;

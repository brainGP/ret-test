"use client";
import React, { useState, useEffect } from "react";
import ProductGrid from "./ProductGrid";
import axios from "axios";
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
  sort: string;
}

const NewProducts = () => {
  const [products, setProducts] = useState<Station[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndSortProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}api/product/?new=true`
        );
        const productsData: Station[] = response.data.products || [];
        setProducts(productsData);
      } catch {
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAndSortProducts();
  }, []);

  return (
    <div>
      <div className="relative overflow-hidden w-full max-w-[1536px] p-8">
        <div className="flex items-center py-8 gap-4">
          <div className="w-2 h-2 bg-yellow rounded-full" />
          <p className="text-lg font-semibold text-gray">Шинэ бүтээгдэхүүн</p>
        </div>
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center">
            <Image
              src="/icons/loading.svg"
              alt="loading"
              width={50}
              height={50}
              className="animate-spin"
            />
          </div>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default NewProducts;

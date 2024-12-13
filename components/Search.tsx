"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Station {
  _id: string;
  name?: string;
  brand?: string;
  sort?: string;
  type?: string;
  style?: string;
  price?: string;
  priceN?: string;
  battery?: string;
  power?: string;
  hertz?: string;
  status?: string;
  size?: { height: string; width: string }[];
  image?: string;
}

const Search = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Station[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Station[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/product");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();

        if (Array.isArray(data)) {
          setProducts(data);
          setFilteredProducts(data);
        } else if (data.products && Array.isArray(data.products)) {
          setProducts(data.products);
          setFilteredProducts(data.products);
        } else {
          console.error("Unexpected API response:", data);
          setProducts([]);
          setFilteredProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
        setFilteredProducts([]);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setQuery(value);

    if (value && Array.isArray(products)) {
      const results = products.filter((product) =>
        ["name", "brand", "sort", "type", "style"].some((key) => {
          const valueToCheck = (product[key as keyof Station] || "").toString();
          return valueToCheck.toLowerCase().includes(value);
        })
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts(products);
    }

    setIsDropdownVisible(!!value);
  };

  const handleBlur = () => {
    setTimeout(() => setIsDropdownVisible(false), 200);
  };
  return (
    <div className="relative w-full max-w-2xl text-gray">
      <div className="flex w-full items-center bg-blue rounded-full gap-4">
        <Input
          type="search"
          placeholder="Хайлт хийх..."
          value={query}
          onChange={handleSearch}
          onFocus={() => setIsDropdownVisible(true)}
          onBlur={handleBlur}
          className="px-4"
        />
        <Button
          type="submit"
          className="rounded-full bg-yellow hover:bg-yellow"
        >
          <Image
            src="/icons/search.svg"
            alt="Search Icon"
            width={24}
            height={24}
            priority={true}
          />
        </Button>
      </div>

      {isDropdownVisible && (
        <div className="absolute left-0 right-0 mt-2 bg-white border border-gray rounded-lg max-h-64 shadow-lg overflow-y-auto z-10">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className="flex items-center gap-4 px-4 py-2 hover:bg-transparent/10 h-32 cursor-pointer border-b"
                onClick={() => router.push(`/stations/${product.name}`)}
              >
                <Image
                  src={product.image || "/noresult.png"}
                  alt={product.name || "Product Image"}
                  width={80}
                  height={80}
                  className="object-contain max-w-[200px] max-h-[100px]"
                  priority={true}
                />
                <div>
                  <span className="font-semibold text-sm block">
                    {product.name}
                  </span>
                  <span className="text-xs text-gray-600">{product.style}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-sm">
              <span>Хайлт олдсонгүй</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;

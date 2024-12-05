"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import productsData from "@/data/stations.json";
import { useRouter } from "next/navigation";

interface Station {
  id: string;
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
  const [filteredProducts, setFilteredProducts] = useState<Station[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Initialize with all products
    setFilteredProducts(
      productsData.filter((item) => typeof item === "object" && "id" in item)
    );
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setQuery(value);

    if (value) {
      const results = productsData.filter((product) =>
        ["name", "brand", "sort", "type", "style"].some((key) => {
          const valueToCheck = (product[key as keyof Station] || "").toString();
          return valueToCheck.toLowerCase().includes(value);
        })
      );
      setFilteredProducts(results);
    } else {
      // Reset to full list when query is cleared
      setFilteredProducts(productsData);
    }

    setIsDropdownVisible(!!value); // Show dropdown only if there's a query
  };

  const handleBlur = () => {
    // Delay hiding dropdown to allow click events to fire
    setTimeout(() => setIsDropdownVisible(false), 200);
  };

  return (
    <div className="relative w-full max-w-2xl">
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
        <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto z-10">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 px-4 py-2 hover:bg-gray-100 cursor-pointer border-b"
                onClick={() => router.push(`/stations/${product.id}`)}
              >
                <Image
                  src={product.image || "/noresult.png"}
                  alt={product.name || "Product Image"}
                  width={40}
                  height={40}
                  className="object-contain"
                  priority={true}
                />
                <div>
                  <span className="font-semibold text-sm">{product.name}</span>
                  <span className="text-gray-500 text-xs">
                    {" "}
                    {product.style}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500 text-sm">
              <span>Хайлт олдсонгүй</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;

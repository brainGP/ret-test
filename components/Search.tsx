// import React, { useState } from "react";
// import Image from "next/image";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import productsData from "@/data/products.json";

// interface Station {
//   id: string;
//   name?: string;
//   brand?: string;
//   sort?: string;
//   type?: string;
//   style?: string;
//   price?: string;
//   priceN?: string;
//   battery?: string;
//   power?: string;
//   hertz?: string;
//   status?: string;
//   size?: { height: string; width: string }[];
//   image?: string;
// }

// // Filter out invalid objects from the JSON data
// const products: Station[] = (productsData as any[]).filter(
//   (item) => item && typeof item === "object" && "id" in item
// );

// const Search = () => {
//   const [query, setQuery] = useState("");
//   const [filteredProducts, setFilteredProducts] = useState(products);
//   const [isDropdownVisible, setIsDropdownVisible] = useState(false);

//   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value.toLowerCase();
//     setQuery(value);

//     if (value) {
//       const results = products.filter((product) =>
//         ["name", "brand", "sort", "type", "style"].some((key) => {
//           const valueToCheck = (product[key as keyof Station] || "").toString();
//           return valueToCheck.toLowerCase().includes(value);
//         })
//       );
//       setFilteredProducts(results);
//       setIsDropdownVisible(true);
//     } else {
//       setFilteredProducts(products);
//       setIsDropdownVisible(false);
//     }
//   };

//   const handleBlur = () => {
//     setTimeout(() => setIsDropdownVisible(false), 200);
//   };

//   return (
//     <div className="relative w-full max-w-2xl">
//       <div className="flex w-full items-center bg-blue rounded-full gap-4">
//         <Input
//           type="search"
//           placeholder="Хайлт хийх..."
//           value={query}
//           onChange={handleSearch}
//           onFocus={() => setIsDropdownVisible(true)}
//           onBlur={handleBlur}
//           className="px-4"
//         />
//         <Button
//           type="submit"
//           className="rounded-full bg-yellow hover:bg-yellow"
//         >
//           <Image
//             src="/icons/search.svg"
//             alt="Search Icon"
//             width={24}
//             height={24}
//           />
//         </Button>
//       </div>

//       {isDropdownVisible && (
//         <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto z-10">
//           {filteredProducts.length > 0 ? (
//             filteredProducts.map((product) => (
//               <div
//                 key={product.id}
//                 className="flex items-center gap-4 px-4 py-2 hover:bg-gray-100 cursor-pointer"
//               >
//                 <Image
//                   src={product.image || "/noresult.png"}
//                   alt={product.name || "Product Image"}
//                   width={40}
//                   height={40}
//                   className="object-contain"
//                 />
//                 <div>
//                   <h3 className="font-semibold text-sm">{product.name}</h3>
//                   <p className="text-gray-500 text-xs">{product.brand}</p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="p-4 text-center text-gray-500 text-sm">
//               Хайлт олдсонгүй
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Search;
import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Search = () => {
  return (
    <div className="flex w-full items-center bg-blue rounded-full gap-4">
      <Input type="search" placeholder="Хайлт хийх..." className="px-4" />
      <Button type="submit" className="rounded-full bg-yellow hover:bg-yellow">
        <Image
          src="/icons/search.svg"
          alt="Search Icon"
          width={24}
          height={24}
        />
      </Button>
    </div>
  );
};

export default Search;

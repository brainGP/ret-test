"use client";
import React from "react";
import Image from "next/image";
import { Product } from "@/types/Product";
import { formatPrice } from "@/utils/formatPrice";
import SetQuantity from "../stations/[name]/CartQuantity";
import { useCart } from "@/hooks/useCarts";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface ProductTableProps {
  products: Product[];
}

const CartTable: React.FC<ProductTableProps> = ({ products }) => {
  const {
    handleRemoveProductFromCart,
    handleCartQtyDecrease,
    handleCartQtyIncrease,
  } = useCart();

  return (
    <div className="w-full overflow-x-auto">
      {products && products.length > 0 ? (
        <table className="min-w-full table-fixed border-collapse">
          <thead className="bg-gray-100 text-sm font-semibold text-gray-700">
            <tr>
              <th className="w-[80px] p-3 text-left">Зураг</th>
              <th className="w-[200px] p-3 text-left">Бүтээгдэхүүн</th>
              <th className="w-[100px] p-3 text-left">Үнэ</th>
              <th className="w-[120px] p-3 text-left">Тоо ширхэг</th>
              <th className="w-[100px] p-3 text-left">Нийт</th>
              <th className="w-[140px] p-3 text-left">Үйлдэл</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {products.map((product) => (
              <tr
                key={product._id}
                className="border-b hover:bg-gray-50 transition"
              >
                {/* Image */}
                <td className="p-3">
                  <Image
                    src={product.images?.[0]?.image || "/noresult.png"}
                    alt={product.name}
                    width={60}
                    height={60}
                    className="object-contain rounded-md"
                  />
                </td>

                {/* Product Info */}
                <td className="p-3">
                  <p className="font-medium">{product.name}</p>
                  <div className="flex gap-1 mt-1 text-xs text-gray-500">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                      {product.brand}
                    </span>
                  </div>
                </td>

                {/* Price */}
                <td className="p-3 font-semibold">
                  {formatPrice(product.priceN)}₮
                </td>

                {/* Quantity */}
                <td className="p-3">
                  <SetQuantity
                    cartCounter
                    cartProduct={product}
                    handleQtyDecrease={() => handleCartQtyDecrease(product)}
                    handleQtyIncrease={() => handleCartQtyIncrease(product)}
                  />
                </td>

                {/* Total */}
                <td className="p-3 font-semibold">
                  {formatPrice(product.priceN * product.quantity)}₮
                </td>

                {/* Actions */}
                <td className="p-3 space-y-2">
                  <Button
                    className="bg-red-500 hover:bg-red-400 text-white text-xs w-full"
                    onClick={() => handleRemoveProductFromCart(product)}
                  >
                    <Trash2 size={14} className="mr-1" /> Устгах
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500 mt-6">
          Танд сагсанд хийсэн бүтээгдэхүүн байхгүй байна!
        </p>
      )}
    </div>
  );
};

export default CartTable;

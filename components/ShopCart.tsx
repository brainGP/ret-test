"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCarts";
import StoreIcon from "@/public/icons/store";

const ShopCard = () => {
  const router = useRouter();
  const { cartTotalQty } = useCart();

  return (
    <div
      className="relative cursor-pointer"
      onClick={() => router.push(`/cart`)}
    >
      <div>
        <StoreIcon color="black" size={24} />
      </div>

      {cartTotalQty > 0 && (
        <div className="absolute top-[-10px] right-[-10px] bg-gray text-white h-5 w-5 rounded-full flex justify-center items-center text-xs">
          {cartTotalQty}
        </div>
      )}
    </div>
  );
};

export default ShopCard;

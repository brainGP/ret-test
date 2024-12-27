"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCarts";

const ShopCard = () => {
  const router = useRouter();
  const { cartTotalQty } = useCart();
  return (
    <div
      className="relative cursor-pointer"
      onClick={() => router.push(`/cart`)}
    >
      <div>
        <Image src={`/icons/store.svg`} alt="icon" height={24} width={24} />
      </div>
      <div className="absolute top-[-10px] right-[-10px] bg-gray text-white h-4 w-4 rounded-full flex justify-center items-center text-xs">
        {cartTotalQty}
      </div>
    </div>
  );
};

export default ShopCard;

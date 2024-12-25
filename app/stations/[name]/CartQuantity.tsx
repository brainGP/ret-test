"use client";
import React from "react";
import { Product } from "@/types/Product";

interface SetQtyProps {
  cartCounter?: boolean;
  cartProduct: Product;
  handleQtyIncrease: () => void;
  handleQtyDecrease: () => void;
}
const SetQuantity: React.FC<SetQtyProps> = ({
  cartCounter,
  cartProduct,
  handleQtyDecrease,
  handleQtyIncrease,
}) => {
  return (
    <div className="flex py-4 items-center gap-4">
      {cartCounter ? null : <div className="font-semibold">Тоо хэмжээ:</div>}
      <div className="flex text-base items-center gap-4">
        <button
          onClick={handleQtyDecrease}
          className="border hover:border-gray transition duration-300 px-2 rounded"
        >
          -
        </button>
        <div>{cartProduct.quantity}</div>
        <button
          onClick={handleQtyIncrease}
          className="border hover:border-gray transition duration-300 px-2 rounded"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default SetQuantity;

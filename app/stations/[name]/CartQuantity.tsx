"use client";
import React from "react";
import { Product } from "@/types/Product";
import { Button } from "@/components/ui/button";
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
        <Button
          onClick={handleQtyDecrease}
          className=" text-gray border transition duration-300 bg-transparent shadow-none rounded"
        >
          -
        </Button>
        <div>{cartProduct.quantity}</div>
        <Button
          onClick={handleQtyIncrease}
          className=" text-gray border transition duration-300 bg-transparent shadow-none rounded"
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default SetQuantity;

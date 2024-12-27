"use client";

import React from "react";
import { useCart } from "@/hooks/useCarts";
import CartTable from "./CartTable";
import Breadcrumb from "@/components/BreadCrumb";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Image from "next/image";
import { formatPrice } from "@/utils/formatPrice";

const CartClient = () => {
  const { cartProducts, handleClearCart, cartTotalAmount } = useCart();

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex justify-center items-center flex-col w-full h-96 space-y-4">
        <Image src={`/noresult.png`} alt="image" height={200} width={200} />
        <p className="font-semibold">
          Танд хадгалсан бүтээгдэхүүн байхгүй байна!
        </p>
        <Link href={`/stations`} className="hover:underline">
          Буцах
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center w-full top-0 border-b px-4 md:px-6 mb-8 py-4">
      <div className="container flex flex-col mx-auto max-w-7xl gap-4">
        <div className="flex flex-col sm:flex-row justify-between">
          <h1 className="font-semibold text-xl mb-4">
            Хадгалсан бүтээгдэхүүнүүд
          </h1>
        </div>
        <div className="flex flex-row ">
          <Breadcrumb />
        </div>
      </div>
      <div className="container flex flex-col sm:flex-row items-center justify-between py-4 mx-auto max-w-7xl gap-4">
        <CartTable products={cartProducts} />
      </div>
      <div className="container flex flex-col justify-between md:flex-row md:justify-between py-4 mx-auto max-w-7xl gap-4">
        <Button
          onClick={() => {
            handleClearCart();
          }}
          className="w-48"
        >
          Хүсэлт устгах
        </Button>

        <div className="flex flex-col">
          <span className="text-pretty text-red-500">
            Та захиалга хийхдээ утасны дугаараар хийнэ үү!
          </span>
          <div className="flex items-center gap-4">
            <p className="font-medium">Холбогдох дугаар:</p>
            <span className="text-lg font-bold underline">99021617</span>
          </div>
        </div>

        <div className="text-sm flex flex-col gap-1 items-start mt-8 md:mt-0">
          <div className="flex justify-between w-full text-base font-semibold">
            <span>Нийт:</span>
            <span className="text-lg">{formatPrice(cartTotalAmount)}₮</span>
          </div>
          <p className="text-gray">НӨАТ-ийн үнэтэй тооцон гаргасан болно.</p>
          <Button className="flex justify-center items-center mt-2">
            <Link href={`/stations`} className="text-white flex items-center">
              <MdArrowBack />
              <span>Нэмж захиалах</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartClient;

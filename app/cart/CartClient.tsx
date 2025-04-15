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
import Container from "@/components/Container";

const CartClient = () => {
  const { cartProducts, handleClearCart, cartTotalAmount } = useCart();

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex justify-center items-center flex-col w-full h-96 space-y-4">
        <Image src={`/noresult.png`} alt="image" height={200} width={200} />
        <p className="font-semibold text-center">
          Танд сагсанд хийсэн бүтээгдэхүүн байхгүй байна!
        </p>
        <Link href={`/stations`} className="hover:underline">
          Буцах
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center w-full top-0 border-b px-4 md:px-6 mb-8 py-4">
      <div className="container flex flex-col items-center justify-start py-4 mx-auto max-w-7xl gap-4 ">
        <div className=" w-full flex justify-start">
          <h1 className="font-semibold text-xl mb-4 justify-start">
            Хадгалсан бүтээгдэхүүнүүд
          </h1>
        </div>
        <div className=" w-full flex justify-start">
          <Breadcrumb />
        </div>
      </div>
      <Container>
        <CartTable products={cartProducts} />
      </Container>
      <div className="container flex flex-col sm:flex-row items-start justify-between py-4 mx-auto max-w-7xl gap-4 ">
        <Button
          onClick={() => {
            handleClearCart();
          }}
          className="w-48"
        >
          Хүсэлт устгах
        </Button>

        <div className="flex flex-col">
          <span>Та захиалга хийхдээ утасны дугаараар хийнэ үү!</span>
          <div className="flex items-center gap-4">
            <p className="font-medium">Холбогдох дугаар:</p>
            <div className="flex gap-2 items-center">
              <p> (+976)</p>
              <span className="text-lg font-bold underline">9902 1617</span>
            </div>
          </div>
        </div>

        <div className="text-sm flex flex-col gap-1 items-start mt-8 md:mt-0">
          <div className="flex justify-start md:justify-between w-full text-base font-semibold gap-1">
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

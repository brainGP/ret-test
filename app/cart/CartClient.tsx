"use client";

import React from "react";
import { useCart } from "@/hooks/useCarts";
import CartTable from "./CartTable";
import Breadcrumb from "@/components/BreadCrumb";
import NotFound from "../not-found";

const CartClient = () => {
  const { cartProducts } = useCart();

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div>
        <NotFound explain="Танд хадгалсан бүтээгдэхүүн байхгүй байна!" />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center w-full top-0 border-b px-4 md:px-6 mb-8 py-4">
      <div className="container flex flex-col items-centerpy-4 mx-auto max-w-7xl gap-4">
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
    </div>
  );
};

export default CartClient;

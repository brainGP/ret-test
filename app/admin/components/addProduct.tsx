"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import { postNewProduct } from "@/apis/products";
import ProductModal from "@/components/Products/ProductModal";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/Product";

const AddProduct = ({
  setProducts,
}: {
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}) => {
  const [newProduct, setNewProduct] = useState<Product | null>(null);

  const addProduct = async (product: Product) => {
    try {
      const data = await postNewProduct({ product });
      setProducts((prev) => [...prev, data]);
      toast.success("Product added successfully!");
    } catch (e) {
      const err = e as Error;
      toast.error(err.message);
    }
  };

  return (
    <>
      <Button
        className="mb-4 text-white"
        onClick={() => setNewProduct({} as Product)}
      >
        Шинэ бүтээгдэхүүн нэмэх
      </Button>
      {newProduct && (
        <ProductModal
          product={newProduct}
          onClose={() => setNewProduct(null)}
          onSave={addProduct}
        />
      )}
    </>
  );
};

export default AddProduct;

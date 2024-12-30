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

    const addProduct = async (product: Product, files: File[]) => {
        try {
            const formData = new FormData();
            Object.keys(product).forEach((key) => {
                const value = (product as any)[key];
                if (Array.isArray(value)) {
                    value.forEach((item) => formData.append(key, JSON.stringify(item)));
                } else {
                    formData.append(key, value);
                }
            });
            files.forEach((file) => {
                formData.append("images", file);
            });
            const data = await postNewProduct(formData);
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
                    onSave={async (updatedProduct: Product, files: File[]) =>
                        await addProduct(updatedProduct, files)
                    }
                />
            )}
        </>
    );
};

export default AddProduct;

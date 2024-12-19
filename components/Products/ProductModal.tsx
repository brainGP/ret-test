"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/Product";
import { ScrollArea } from "../ui/scroll-area";
import Image from "next/image";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onSave: (product: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Product>({
    ...product,
    brand: product.brand || "",
    sort: product.sort || "",
    name: product.name || "",
    type: product.type || "",
    style: product.style || "",
    price: product.price || "0",
    priceN: product.priceN || "0",
    battery: product.battery || "",
    power: product.power || "",
    hertz: product.hertz || "",
    status: product.status || "",
    size: product.size || [{ height: "", width: "" }],
    image: product.image || "",
  });

  useEffect(() => {
    setFormData({
      ...product,
      brand: product.brand || "",
      sort: product.sort || "",
      name: product.name || "",
      type: product.type || "",
      style: product.style || "",
      price: product.price || "0",
      priceN: product.priceN || "0",
      battery: product.battery || "",
      power: product.power || "",
      hertz: product.hertz || "",
      status: product.status || "",
      size: product.size || [{ height: "", width: "" }],
      image: product.image || "",
    });
  }, [product]);

  const handleChange = (field: keyof Product, value: string | number) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSizeChange = (
    index: number,
    field: "height" | "width",
    value: string
  ) => {
    const updatedSizes = [...formData.size];
    updatedSizes[index] = { ...updatedSizes[index], [field]: value };
    setFormData({ ...formData, size: updatedSizes });
  };

  const handleNumericChange = (field: keyof Product, value: string) => {
    if (/^\d*\.?\d*$/.test(value)) {
      setFormData({ ...formData, [field]: parseFloat(value) || 0 });
    }
  };

  return (
    <ScrollArea>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl overflow-y-auto max-h-[90vh]">
          <div className="flex flex-row justify-between m-4">
            <h2 className="text-xl font-bold mb-4">
              {product._id ? "Бүтээгдэхүүн өөрчлөх" : "Бүтээгдэхүүн нэмэх"}
            </h2>
            <Button
              className="bg-white shadow-none hover:bg-gray/10"
              onClick={onClose}
            >
              <Image
                src={`/icons/xicon.svg`}
                height={24}
                width={24}
                alt="icons"
              />
            </Button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSave(formData);
            }}
          >
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Брэнд</label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => handleChange("brand", e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Нэр</label>
              <input
                type="text"
                value={formData.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Төрөл/гар, суурь/
              </label>
              <input
                type="text"
                value={formData.sort || ""}
                onChange={(e) => handleChange("sort", e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Төрөл/UHF,VHF/
              </label>
              <input
                type="text"
                value={formData.type || ""}
                onChange={(e) => handleChange("type", e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Загвар</label>
              <input
                type="text"
                value={formData.style || ""}
                onChange={(e) => handleChange("style", e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Үнэ /НӨАТ-гүй/
              </label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => handleNumericChange("price", e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Үнэ /НӨАТ-тэй/
              </label>
              <input
                type="text"
                value={formData.priceN}
                onChange={(e) => handleNumericChange("priceN", e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Зай багтаамж
              </label>
              <input
                type="text"
                value={formData.battery || ""}
                onChange={(e) => handleChange("battery", e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Хүчин чадал
              </label>
              <input
                type="text"
                value={formData.power || ""}
                onChange={(e) => handleChange("power", e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Герц</label>
              <input
                type="text"
                value={formData.hertz || ""}
                onChange={(e) => handleChange("hertz", e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Статус</label>
              <input
                type="text"
                value={formData.status || ""}
                onChange={(e) => handleChange("status", e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Хэмжээ</label>
              {formData.size?.map((size, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    placeholder="Өндөр"
                    value={size.height || ""}
                    onChange={(e) =>
                      handleSizeChange(index, "height", e.target.value)
                    }
                    className="w-1/2 border rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    placeholder="Өргөн"
                    value={size.width || ""}
                    onChange={(e) =>
                      handleSizeChange(index, "width", e.target.value)
                    }
                    className="w-1/2 border rounded px-3 py-2"
                  />
                </div>
              ))}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Зураг</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleChange("image", e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="mt-6 flex justify-end">
              <Button className="text-white" type="submit">
                Save Product
              </Button>
            </div>
          </form>
        </div>
      </div>
    </ScrollArea>
  );
};

export default ProductModal;

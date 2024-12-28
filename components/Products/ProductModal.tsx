import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/types/Product";
import { toast } from "sonner";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onSave: (updatedProduct: Product) => Promise<void>;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Product>({
    ...product,
    images: product.images || [],
  });

  const handleChange = (field: keyof Product, value: string | number) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = async () => {
    try {
      await onSave(formData);
      onClose();
    } catch {
      toast.error("Error saving product");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex flex-row justify-between m-4">
          <h2 className="text-xl font-bold mb-4">
            {product._id ? "Бүтээгдэхүүн өөрчлөх" : "Бүтээгдэхүүн нэмэх"}
          </h2>
          <button
            className="bg-white shadow-none hover:bg-gray/10"
            onClick={onClose}
          >
            <Image src="/icons/xicon.svg" height={24} width={24} alt="Close" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Нэр
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Үнэ
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                handleChange("price", parseFloat(e.target.value) || 0)
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Тайлбар
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Зураг
            </label>
            {formData.images && formData.images.length > 0 && (
              <Image
                src={formData.images[0].image || "/placeholder.png"}
                alt="Uploaded image"
                width={200}
                height={200}
                className="rounded-md"
              />
            )}
          </div>
        </div>

        <div className="flex justify-end mt-6 space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            onClick={onClose}
          >
            Болих
          </button>
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            onClick={handleSave}
          >
            Хадгалах
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;

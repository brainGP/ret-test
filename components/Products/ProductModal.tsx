"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Product } from "@/types/Product";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import { ScrollArea } from "../ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onSave: (updatedProduct: Product, files: File[]) => Promise<void>;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Product>({
    ...product,
    name: product.name || "",
    brand: product.brand || "",
    type: product.type || "",
    style: product.style || "",
    price: product.price || 0,
    priceN: product.priceN || 0,
    description: product.description || "",
    battery: product.battery || "",
    power: product.power || "",
    hertz: product.hertz || "",
    status: product.status || false,
    size: product.size || "",
    images: product.images || [],
    quantity: product.quantity || 0,
    sort: product.sort || "",
    rating: product.rating || 0,
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  useEffect(() => {
    setFormData({
      ...product,
      name: product.name || "",
      brand: product.brand || "",
      type: product.type || "",
      style: product.style || "",
      price: product.price || 0,
      priceN: product.priceN || 0,
      description: product.description || "",
      battery: product.battery || "",
      power: product.power || "",
      hertz: product.hertz || "",
      status: product.status || false,
      size: product.size || "",
      images: product.images || [],
      quantity: product.quantity || 0,
      sort: product.sort || "",
      rating: product.rating || 0,
    });
    setUploadedFiles([]);
  }, [product]);

  const handleChange = (
    field: keyof Product,
    value: string | number | boolean
  ) => {
    if (typeof value === "string") {
      value = value.charAt(0).toUpperCase() + value.slice(1);
    }
    setFormData({ ...formData, [field]: value });
  };

  const handleStatusChange = (value: string) => {
    setFormData({ ...formData, status: value === "true" });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      const filePreviews = filesArray.map((file) => ({
        image: URL.createObjectURL(file),
      }));
      setFormData({
        ...formData,
        images: [...formData.images, ...filePreviews],
      });
      setUploadedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updatedImages });
    setUploadedFiles(updatedFiles);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.brand || !formData.price) {
      toast.error("Бүх шаардлагатай талбарыг бөглөнө үү!");
      return;
    } else {
      try {
        await onSave(formData, uploadedFiles);

        onClose();
      } catch {
        toast.error("Хадгалах явцад алдаа гарлаа.");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl overflow-hidden">
        <ScrollArea className="h-[800px] p-6">
          <div className="flex flex-row justify-between">
            <h2 className="text-xl font-bold">
              {product._id ? "Бүтээгдэхүүн өөрчлөх" : "Бүтээгдэхүүн нэмэх"}
            </h2>
            <button
              className="bg-white shadow-none hover:bg-gray-100"
              onClick={onClose}
            >
              <Image
                src="/icons/xicon.svg"
                height={24}
                width={24}
                alt="Close"
              />
            </button>
          </div>

          <div className="space-y-4 mt-4 mx-1">
            <div>
              <label className="block text-sm font-medium mb-1">Нэр</label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full overflow-hidden"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Брэнд</label>
              <Input
                type="text"
                value={formData.brand}
                onChange={(e) => handleChange("brand", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Үнэлэмж /1-5/
              </label>
              <Input
                type="number"
                value={formData.rating}
                onChange={(e) =>
                  handleChange("rating", parseFloat(e.target.value) || 0)
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Төрөл /гар, суурь станц/
              </label>
              <Select
                value={formData.sort}
                onValueChange={(value) => handleChange("sort", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue className="text-white/10" placeholder="сонгох" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Гар станц">Гар станц</SelectItem>
                    <SelectItem value="Суурин станц">Суурин станц</SelectItem>
                    <SelectItem value="Дагалдах хэрэгслүүд">
                      Дагалдах хэрэгслүүд
                    </SelectItem>
                    <SelectItem value="Бусад бараа">Бусад бараа</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Төрөл /UHF, VHF/
              </label>
              <Input
                type="text"
                value={formData.type}
                onChange={(e) => handleChange("type", e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Загвар /Өндрийн станц, Суурин станц/
              </label>
              <Input
                type="text"
                value={formData.style}
                onChange={(e) => handleChange("style", e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Үнэ /НӨАТ/
              </label>
              <Input
                type="number"
                value={formData.priceN}
                onChange={(e) =>
                  handleChange("priceN", parseFloat(e.target.value) || 0)
                }
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Үнэ</label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  handleChange("price", parseFloat(e.target.value) || 0)
                }
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Төлөв</label>
              <Select
                value={formData.status ? "true" : "false"}
                onValueChange={handleStatusChange}
              >
                <SelectTrigger className="w-full border rounded px-3 py-2">
                  <SelectValue placeholder="Төлөв" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">True</SelectItem>
                  <SelectItem value="false">False</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Баттэрэй</label>
              <Input
                type="string"
                value={formData.battery}
                onChange={(e) => handleChange("battery", e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Хүчин чадал
              </label>
              <Input
                type="string"
                value={formData.power}
                onChange={(e) => handleChange("power", e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Герц</label>
              <Input
                type="string"
                value={formData.hertz}
                onChange={(e) => handleChange("hertz", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Хэмжээ</label>
              <Input
                type="string"
                value={formData.size}
                onChange={(e) => handleChange("size", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Тайлбар</label>
              <Textarea
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Зураг</label>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className=" border-0 mt-1 px-0 block shadow-none w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
              <div className="flex space-x-4 mt-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={image.image}
                      alt="images"
                      width={100}
                      height={100}
                      className="rounded-md"
                    />
                    <Button
                      onClick={() => removeImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6 space-x-8">
            <button className="hover:underline" onClick={onClose}>
              Болих
            </button>
            <Button onClick={handleSave}>Хадгалах</Button>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ProductModal;

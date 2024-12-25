"use client";
import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { baseUrl } from "@/lib/staticData";
import Link from "next/link";
import { Product } from "@/types/Product";
import SetQuantity from "./CartQuantity";
import { useCart } from "@/hooks/useCarts";
import { MdCheckCircle } from "react-icons/md";
import { useRouter } from "next/navigation";

const StationCard = ({ station }: { station: Product }) => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(station.images[0]?.image);
  const [isProductInCart, setIsProductInCart] = useState(false);
  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };
  const { handleAddProductToCart, cartProducts } = useCart();
  const [cartProduct, setCartProduct] = useState<Product>({
    _id: station._id,
    name: station.name,
    type: station.type,
    style: station.style,
    price: station.price,
    priceN: station.priceN,
    battery: station.battery,
    power: station.power,
    hertz: station.hertz,
    status: station.status,
    size: station.size,
    images: station.images,
    quantity: 1,
    sort: station.sort,
    brand: station.brand,
  });

  useEffect(() => {
    setIsProductInCart(false);

    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item._id === station._id
      );
      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts, station._id]);

  const handleQtyIncrease = useCallback(() => {
    if (cartProduct.quantity >= station.quantity) {
      return;
    }
    setCartProduct((prev) => ({
      ...prev,
      quantity: prev.quantity + 1,
    }));
  }, [cartProduct, station.quantity]);

  const handleQtyDecrease = useCallback(() => {
    if (cartProduct.quantity === 1) {
      return;
    }
    setCartProduct((prev) => ({
      ...prev,
      quantity: prev.quantity - 1,
    }));
  }, [cartProduct]);

  return (
    <div className="flex flex-col lg:flex-row w-full items-center gap-8 p-4 space-y-4 lg:space-y-0">
      <div className="flex flex-col-reverse gap-8 lg:gap-12 md:flex-row justify-between">
        <div className="flex flex-row md:flex-col h-[100px] w-[330px] sm:w-[400px] md:h-[498px] md:w-[160px] lg:h-[500px] lg:w-[130px] xl:w-[160px] justify-center lg:items-center gap-4">
          {station.images.map((image) => (
            <div
              key={image.image}
              onClick={() => handleImageClick(image.image)}
              className="cursor-pointer border hover:border-gray/30 rounded-lg h-[100] w-[100px] sm:h-[130px] sm:w-[130px] md:w-[160px] md:h-[160px] flex justify-center items-center group"
            >
              <Image
                src={`${baseUrl}${image.image}`}
                alt={`Station Image ${image.image}`}
                height={40}
                width={40}
                className="object-contain transition duration-300 group-hover:scale-110 "
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center h-[330px] w-[330px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] border items-center rounded-lg overflow-hidden">
          <Image
            src={`${baseUrl}${selectedImage}`}
            alt={station.name}
            height={500}
            width={500}
            className="object-contain w-full h-full p-2"
            priority={true}
          />
        </div>
      </div>
      <div className="w-full overflow-hidden flex justify-center">
        <div className="flex flex-col space-y-4 w-full sm:w-[350px] md:w-[500px] lg:w-[500px] justify-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray">
            {station.name}
          </h1>
          <div className="text-gray space-y-4">
            <p>
              <strong>Төрөл:</strong> {station.type} {station.style}
            </p>
            <p>
              <strong>Хүчдэл:</strong> {station.battery}
            </p>
            <p>
              <strong>Хүч:</strong> {station.power}
            </p>
            <p>
              <strong>Давтамж:</strong> {station.hertz}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-semibold">
              <strong>Үнэ:</strong> {station.priceN}
            </span>
            <span> (НӨАТ-тэй)</span>
          </div>
          <SetQuantity
            cartProduct={cartProduct}
            handleQtyDecrease={handleQtyDecrease}
            handleQtyIncrease={handleQtyIncrease}
          />

          {isProductInCart ? (
            <>
              <div className="flex items-center gap-2">
                <MdCheckCircle size={20} className="text-gray" />
                <span>Таны сагсанд нэмэгдсэн байна.</span>

                <Button
                  className="bg-neutral-800 text-white hover:bg-neutral-800/80 px-6 py-3 rounded-md w-full"
                  onClick={() => {
                    router.push(`/cart`);
                  }}
                >
                  Сагс харах
                </Button>
              </div>
            </>
          ) : (
            <>
              <Button
                className="bg-neutral-800 text-white hover:bg-neutral-800/80 px-6 py-3 rounded-md w-full"
                onClick={() => handleAddProductToCart(cartProduct)}
              >
                Сагсанд нэмэх
              </Button>
            </>
          )}
          <Link href="https://m.me/RetevisMongolia" passHref>
            <div className="flex flex-col gap-4 w-auto">
              <Button className="bg-whiteb border border-gray/30 text-gray hover:border-neutral-800/80 px-6 py-3 rounded-md w-full">
                Холбогдох
              </Button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StationCard;

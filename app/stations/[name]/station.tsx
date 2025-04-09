"use client";
import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { baseUrl } from "@/lib/staticData";
import { Product } from "@/types/Product";
import SetQuantity from "./CartQuantity";
import { useCart } from "@/hooks/useCarts";
import { MdCheckCircle } from "react-icons/md";
import { useRouter } from "next/navigation";
import { Rating } from "@mui/material";
import { formatPrice } from "@/utils/formatPrice";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import StoreIcon from "@/public/icons/store";
import BatteryIcon from "@/public/icons/battery";

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
    description: station.description,
    rating: station.rating,
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
    <div className="flex flex-col lg:flex-row w-full items-center justify-between gap-8 px-24 space-y-4 lg:space-y-0 mt-8">
      <div className="flex flex-col-reverse gap-8 lg:gap-12 md:flex-row justify-between">
        <div className="flex flex-row md:flex-col h-auto w-full max-w-[400px] md:max-w-[160px] lg:max-w-[130px] justify-center lg:items-center gap-4 md:space-y-2">
          {station.images.map((image, index) => (
            <div
              key={`${image.image}-${index}`}
              onClick={() => handleImageClick(image.image)}
              className="cursor-pointer border hover:border-gray/30 rounded-lg w-[110px] h-[110px] sm:w-[150px] sm:h-[150px] flex justify-between items-center group"
            >
              <Image
                src={image.image}
                alt={image.image}
                height={200}
                width={200}
                className="object-contain h-full transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center h-[360px] w-[360px] sm:w-[500px] sm:h-[500px] border rounded-lg overflow-hidden">
          <Image
            src={`${selectedImage}`}
            alt={station.name}
            height={500}
            width={500}
            className="object-contain w-full h-full p-2"
            priority={true}
          />
        </div>
      </div>
      <div className="min-w-[400px] px-8 md:px-0 max-w-[682px] overflow-hidden flex justify-center">
        <div className="flex flex-col space-y-2 w-[360px] sm:w-[500px] md:w-[682px] lg:w-[580px] justify-center">
          <Image
            src={`/Retevis/rete.svg`}
            alt="logo"
            height={200}
            width={80}
            className="object-contain hidden md:block"
          />

          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray">
            {station.name}
          </h1>
          <Rating value={station.rating} readOnly />
          <div className="flex items-end gap-2 py-4">
            <span className="text-3xl md:text-4xl font-semibold">
              {formatPrice(station.priceN)}₮
            </span>
            <span className="text-gray/40"> (НӨАТ-тэй)</span>
          </div>
          <Separator />
          <ScrollArea className="w-full lg:max-w-full lg:max-h-44 overflow-hidden rounded-lg">
            <div className="space-y-4">
              <div className="flex-1 space-y-2">
                <strong>Тайлбар:</strong>
                <p className="text-sm">{station.description}</p>
              </div>
              <div className="flex gap-2 items-center">
                <strong>Батарэй:</strong>
                <p className="text-sm">{station.battery}</p>
                <BatteryIcon />
              </div>
              <div className="flex space-x-2 items-center">
                <strong>Гаралтын чадал:</strong>
                <p className="text-sm">{station.power}</p>
              </div>
              <div className="flex space-x-2 items-center">
                <strong>Давтамж:</strong>
                <p className="text-sm ">{station.hertz}</p>
              </div>
              <div className="flex space-x-2 items-center">
                <strong>Загвар:</strong>
                <p className="text-sm ">{station.style}</p>
              </div>
            </div>
          </ScrollArea>
          <Separator />
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <SetQuantity
              cartProduct={cartProduct}
              handleQtyDecrease={handleQtyDecrease}
              handleQtyIncrease={handleQtyIncrease}
            />

            {isProductInCart ? (
              <div className="flex flex-col items-center gap-2 w-full">
                <div className="flex gap-4 items-center">
                  <div className="w-4 h-4 flex justify-center items-center">
                    <MdCheckCircle size={16} className="text-gray" />
                  </div>

                  <span>Таны сагсанд нэмэгдсэн байна.</span>
                </div>

                <Button
                  className="flex text-white px-6 py-3 rounded-md w-full"
                  onClick={() => {
                    router.push(`/cart`);
                  }}
                >
                  <StoreIcon size={24} color="white" />
                  <span>Сагс харах</span>
                </Button>
              </div>
            ) : (
              <>
                <Button
                  className=" flex text-white px-6 py-3 rounded-md w-full"
                  onClick={() => handleAddProductToCart(cartProduct)}
                >
                  <StoreIcon size={24} color="white" />
                  <span>Сагсанд нэмэх</span>
                </Button>
              </>
            )}
          </div>
          <a
            href="https://m.me/RetevisMongolia"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-white border border-gray/30 text-gray hover:bg-gray/5 px-6 py-3 rounded-md w-full gap-4">
              <Image
                src="/icons/msgIcon.svg"
                alt="icon"
                height="16"
                width="16"
              />
              <span> Холбогдох</span>
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default StationCard;

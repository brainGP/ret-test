import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
const ShopCard = () => {
  const router = useRouter();
  return (
    <div onClick={() => router.push(`/cart`)}>
      <Image src={`/icons/store.svg`} alt="icon" height={24} width={24} />
    </div>
  );
};

export default ShopCard;

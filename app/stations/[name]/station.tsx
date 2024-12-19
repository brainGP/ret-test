import { Product } from "@/types/Product";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { baseUrl } from "@/lib/staticData";
import Link from "next/link";

const StationCard = ({ station }: { station: Product }) => {
  return (
    <div className="flex flex-col lg:flex-row w-full gap-4 lg:gap-12 justify-evenly items-center">
      <div className="flex justify-center h-[330px] w-[330px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[500px] border items-center rounded-lg overflow-hidden">
        <Image
          src={`${baseUrl}${station.image}`}
          alt={station.name}
          height={500}
          width={500}
          className="object-contain w-full h-full p-2"
          priority={true}
        />
      </div>

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
        <Link href="https://m.me/RetevisMongolia" passHref>
          <Button className="bg-neutral-800 text-white hover:bg-neutral-800/80 px-6 py-3 rounded-md w-full">
            Холбогдох
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default StationCard;

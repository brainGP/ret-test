"use client";

import React, { useEffect, useState } from "react";
import stations from "@/data/stations.json";
import NotFound from "@/app/not-found";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Station {
  id: string;
  name: string;
  type: string;
  style: string;
  price: string;
  priceN: string;
  battery: string;
  power: string;
  hertz: string;
  status: string;
  size: { height: string; width: string }[];
  image: string;
}

interface Params {
  name?: string;
}

const StationNamePage: React.FC = () => {
  const params = useParams() as Params;
  const [station, setStation] = useState<Station | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stationName = params?.name ? decodeURIComponent(params.name) : null;
    console.log("Decoded Station Name:", stationName);
    if (stationName) {
      const foundStation = stations.find((s) => s.name === stationName);
      setStation(foundStation || null);
    }
  }, [params?.name]);

  if (!station) return <NotFound />;

  return (
    <div className="p-8 flex flex-col items-center gap-8">
      <div className="flex flex-col sm:flex-row gap-8 p-6 max-w-4xl">
        <Button
          className="top-16 left-4 bg-transparent border text-gray shadow-none hover:bg-gray/10"
          onClick={() => router.back()}
        >
          Back
        </Button>
        <div className="flex-shrink-0">
          <Image
            src={station.image}
            alt={station.name}
            width={300}
            height={300}
            className="rounded-md object-cover"
            priority={true}
          />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {station.name}
          </h1>
          <p className="text-lg text-gray-600">
            <strong>Type:</strong> {station.type}
          </p>
          <p className="text-lg text-gray-600">
            <strong>Style:</strong> {station.style}
          </p>
          <p className="text-lg text-gray-600">
            <strong>Battery:</strong> {station.battery}
          </p>
          <p className="text-lg text-gray-600">
            <strong>Power:</strong> {station.power}
          </p>
          <p className="text-lg text-gray-600">
            <strong>Frequency:</strong> {station.hertz}
          </p>
          <p className="text-lg font-semibold text-orange-500 mt-4">
            <strong>Price:</strong> {station.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StationNamePage;

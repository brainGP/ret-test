"use client";

import React, { useEffect, useState } from "react";
import stations from "@/data/stations.json"; // Ensure the JSON file path is correct
import NotFound from "@/app/not-found";
import { useParams } from "next/navigation";
import Image from "next/image";

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

const StationIdPage = () => {
  const params = useParams();
  const [station, setStation] = useState<Station | null>(null);

  useEffect(() => {
    if (params?.id) {
      const foundStation = stations.find((s) => s.id === params.id);
      setStation(foundStation || null);
    }
  }, [params?.id]);

  if (!station) return <NotFound />;

  return (
    <div className="p-4 flex flex-row gap-4">
      <Image
        src={station.image}
        alt={station.name}
        width={200}
        height={200}
        className="rounded-md object-cover"
      />
      <div className="flex flex-col">
        <h1 className="text-xl font-bold">{station.name}</h1>
        <p className="text-gray-600">{station.type}</p>
        <p className="text-gray-600">{station.style}</p>
        <p className="text-gray-800 font-semibold">{station.price}</p>
      </div>
    </div>
  );
};

export default StationIdPage;

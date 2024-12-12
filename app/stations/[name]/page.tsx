"use client";

import React, { useEffect, useState } from "react";
import NotFound from "@/app/not-found";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/BreadCrumb";
import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";

interface Station {
    _id: string;
    brand: string;
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
    const [stations, setStations] = useState<Station[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchStations = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/product");
                console.log("API Response Status:", response.status);
                if (response.ok) {
                    const data = await response.json();

                    setStations(data.products || []);
                } else {
                    console.error("Failed to fetch stations");
                }
            } catch (error) {
                console.error("Error fetching stations:", error);
            }
        };

        fetchStations();
    }, []);

    useEffect(() => {
        const stationName = params?.name ? decodeURIComponent(params.name) : null;
        if (stationName && stations.length > 0) {
            const foundStation = stations.find(
                (s) => s.name.toLowerCase().trim() === stationName.toLowerCase().trim()
            );
            console.log(stationName.toLowerCase);

            setStation(foundStation || null);
        }
    }, [params?.name, stations]);

    if (!station) {
        return <NotFound />;
    }

    const sameBrandStations = stations.filter(
        (s) => s.brand === station.brand && s._id !== station._id
    );

    return (
        <div className="m-8 flex-1 justify-center gap-8">
            <div className="flex-1 space-y-4 py-4">
                <Breadcrumb />
                <Button
                    className="flex bg-gray text-white max-w-[64px] border relative hover:bg-gray/80 px-4 py-2 rounded-md shadow-sm"
                    onClick={() => router.back()}
                >
                    Back
                </Button>
            </div>

            <div className="flex flex-col lg:flex-row w-full gap-4 lg:gap-12 justify-evenly items-center">
                <div className="flex justify-center h-[330px] w-[330px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[500px] border items-center rounded-lg overflow-hidden">
                    <Image
                        src={station.image}
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
                            Contact
                        </Button>
                    </Link>
                </div>
            </div>

            {sameBrandStations.length > 0 && (
                <div className="mt-10">
                    <ProductGrid
                        title={`${station.brand} брэндийн бусад бүтээгдэхүүнүүд`}
                        products={sameBrandStations}
                    />
                </div>
            )}
        </div>
    );
};

export default StationNamePage;

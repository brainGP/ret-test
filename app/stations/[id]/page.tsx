import React from "react";
import stations from "@/data/stations.json";
import NotFound from "@/app/not-found";
import Image from "next/image";
import Breadcrumb from "@/components/BreadCrumb";
import Filter from "@/components/Filter";

const StationIdPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const data = stations.find((station) => station?.id === id);
  if (!data) return <NotFound />;

  return (
    <div className="flex flex-col lg:flex-row">
      <aside className="w-full lg:w-1/4 p-4 bg-gray-50 border rounded-lg lg:block mb-6 lg:mb-0 sticky top-0 h-auto lg:h-auto hidden md:visible">
        <Filter />
      </aside>

      <main className="flex-1">
        <Breadcrumb />
        <div className="container mx-auto p-4">
          <div className="bg-white shadow rounded-lg p-6 lg:flex lg:items-start lg:gap-8">
            {/* Image Section */}
            <div className="flex justify-center mb-6 lg:mb-0 lg:flex-none">
              <Image
                src={data.image}
                alt={data.name}
                width={300}
                height={400}
                className="rounded-lg shadow-md"
              />
            </div>

            {/* Info Section */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-4">{data.name}</h1>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Брэнд:</span> {data.brand}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Төрөл:</span> {data.sort}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Загвар:</span> {data.style}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Үнэ:</span> {data.price}
                {",  "}
                <span>{data.priceN}(НӨАТ)</span>
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Батарей:</span> {data.battery}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Хүч:</span> {data.power}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Давтамж:</span> {data.hertz}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Статус:</span>{" "}
                {data.status || "Байхгүй"}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Хэмжээ:</span>{" "}
                {data.size.map((size, index) => (
                  <span key={index}>
                    {size.height} x {size.width}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StationIdPage;

import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";

// Define the station structure
interface Station {
  id: string;
  name: string;
  type: string;
  style: string;
  price: string;
  battery: string;
  power: string;
  hertz: string;
  status: string;
  size: { height: string; width: string }[];
  image: string;
}

interface StationDetailsProps {
  station: Station;
}

const StationDetails: React.FC<StationDetailsProps> = ({ station }) => {
  const router = useRouter();

  // If the page is being statically generated, show a loading state
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <section className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800">{station.name}</h1>
      <img
        src={station.image}
        alt={station.name}
        className="w-full h-64 object-contain my-6"
      />
      <p className="text-lg font-semibold text-gray-800">{station.price}</p>
      <p className="text-sm text-gray-500">Type: {station.type}</p>
      <p className="text-sm text-gray-500">Style: {station.style}</p>
      <p className="text-sm text-gray-500">Battery: {station.battery}</p>
      <p className="text-sm text-gray-500">Power: {station.power}</p>
      <p className="text-sm text-gray-500">Hertz: {station.hertz}</p>
      <p className="text-sm text-gray-500">Status: {station.status}</p>
      <p className="text-sm text-gray-500">
        Size: {station.size[0].height} x {station.size[0].width}
      </p>
    </section>
  );
};

// Define the paths to be statically generated
export const getStaticPaths: GetStaticPaths = async () => {
  // Sample data for stations. You can replace this with your actual API call
  const stations: Station[] = [
    {
      id: "1",
      name: "Station 1",
      image: "/path/to/image1.jpg",
      price: "$100",
      type: "Type A",
      style: "Modern",
      battery: "5000mAh",
      power: "100W",
      hertz: "60Hz",
      status: "Available",
      size: [{ height: "100cm", width: "50cm" }],
    },
    {
      id: "2",
      name: "Station 2",
      image: "/path/to/image2.jpg",
      price: "$150",
      type: "Type B",
      style: "Classic",
      battery: "6000mAh",
      power: "150W",
      hertz: "50Hz",
      status: "Out of stock",
      size: [{ height: "120cm", width: "60cm" }],
    },
  ];

  // Generate the paths dynamically based on the data
  const paths = stations.map((station) => ({
    params: { id: station.id },
  }));

  return {
    paths,
    fallback: true, // Set this to true for on-demand static generation
  };
};

// Fetch data for each station based on its id
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  // Replace this with your actual data fetch call, like an API request
  const station: Station = {
    id,
    name: `Station ${id}`,
    image: `/path/to/image${id}.jpg`,
    price: `{id * 100}`,
    type: "Type A",
    style: "Modern",
    battery: "5000mAh",
    power: "100W",
    hertz: "60Hz",
    status: id === "1" ? "Available" : "Out of stock",
    size: [{ height: `{id * 100}cm`, width: `{id * 50}cm` }],
  };

  return {
    props: {
      station,
    },
  };
};

export default StationDetails;

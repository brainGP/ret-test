import React from "react";
import Head from "next/head";
import { formatPrice } from "@/utils/formatPrice";

interface Product {
  _id: string;
  name: string;
  brand: string;
  type: string;
  style: string;
  price: number;
  priceN: number;
  description: string;
  battery: string;
  power: string;
  hertz: string;
  status: boolean;
  size: string;
  images: { image: string }[];
  quantity: number;
  sort: string;
  rating: number;
}

// Props interface
interface MetaTagsProps {
  data: {
    item?: Product;
    error?: boolean;
  };
}

const MetaTags: React.FC<MetaTagsProps> = ({ data }) => {
  const item = data?.item;

  return (
    <Head>
      {item && !data.error ? (
        <>
          {/* Page Title */}
          <title>{item.name || "Product"}</title>

          {/* Meta Description */}
          <meta
            name="description"
            content={`НӨАТ орсон Үнэ: ${
              item.priceN
                ? formatPrice(item.priceN)
                : `НӨАТ-гүй Үнэ: ${formatPrice(item.price)}`
            }`}
          />
          <meta
            property="og:description"
            content={`НӨАТ орсон Үнэ: ${
              item.priceN
                ? formatPrice(item.priceN)
                : `НӨАТ-гүй Үнэ: ${formatPrice(item.price)}`
            }`}
          />

          {/* Title Metadata */}
          <meta name="title" content={item.name} />
          <meta property="og:title" content={item.name} />

          {/* OG Image Metadata */}
          <meta
            property="og:image"
            content={item.images?.[0]?.image || "/default-image.png"}
          />
        </>
      ) : (
        <>
          {/* Fallback for Missing Product */}
          <title>Бараа | Станцын төрөлжсөн дэлгүүр</title>
          <meta name="title" content="Retevis | Станцын төрөлжсөн дэлгүүр" />
          <meta
            property="og:title"
            content="Retevis | Станцын төрөлжсөн дэлгүүр"
          />
          <meta name="description" content="Бараа олдсонгүй" />
          <meta property="og:description" content="Бараа олдсонгүй" />
          <meta
            property="og:image"
            content="https://cdni.iconscout.com/illustration/premium/thumb/search-result-not-found-2130361-1800925.png?f=webp"
          />
        </>
      )}
    </Head>
  );
};

export default MetaTags;

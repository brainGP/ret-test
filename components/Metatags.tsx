import React from "react";
import Head from "next/head";
import { formatPrice } from "@/utils/formatPrice";
import { Product } from "@/types/Product";

interface MetaTagsProps {
  data?: Product;
}

const MetaTags: React.FC<MetaTagsProps> = ({ data }) => {
  const fallbackImage = "https://retevis-back.onrender.com/banner/Poster1.png";

  const metaTitle = data?.name || "Retevis | Станцын төрөлжсөн дэлгүүр";
  const metaDescription = data
    ? `НӨАТ орсон Үнэ: ${
        data.priceN
          ? formatPrice(data.priceN)
          : `НӨАТ-гүй Үнэ: ${formatPrice(data.price || 0)}`
      }`
    : "Бараа олдсонгүй";

  const metaImage =
    Array.isArray(data?.images) && data.images[0]?.image
      ? data.images[0].image
      : fallbackImage;

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:description" content={metaDescription} />
      <meta name="title" content={metaTitle} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:image" content={metaImage} />
    </Head>
  );
};

export default MetaTags;

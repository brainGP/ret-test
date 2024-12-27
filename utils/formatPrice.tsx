export const formatPrice = (price: string | number): string => {
  const priceNumber =
    typeof price === "string" ? parseInt(price.replace(/[^0-9]/g, "")) : price;

  if (isNaN(priceNumber)) return price.toString();

  return new Intl.NumberFormat("en-MN", {
    style: "currency",
    currency: "MNT",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(priceNumber);
};

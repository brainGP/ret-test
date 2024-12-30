export interface Product {
  _id: string;
  name: string;
  type: string;
  style: string;
  price: number;
  description: string;
  rating: number;
  priceN: number;
  battery: string;
  power: string;
  hertz: string;
  status: boolean;
  size: string;
  images: { image: string }[];
  quantity: number;
  sort: string;
  brand: string;
}

export interface Product {
  _id: string;
  name: string;
  type: string;
  style: string;
  price: number;
  priceN: number;
  battery: string;
  power: string;
  hertz: string;
  status: string;
  size: string;
  images: { image: string }[];
  quantity: number;
  sort: string;
  brand: string;
}

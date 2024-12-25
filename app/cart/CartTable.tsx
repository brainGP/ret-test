import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/types/Product";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface ProductTableProps {
  products: Product[];
}

const formatPrice = (price: string | number) => {
  const priceNumber =
    typeof price === "string" ? parseInt(price.replace(/[^0-9]/g, "")) : price;
  if (isNaN(priceNumber)) return price;
  return priceNumber.toLocaleString("en-US").replace(/,/g, "'");
};

const CartTable: React.FC<ProductTableProps> = ({ products }) => {
  return (
    <ScrollArea className="w-screen xl:w-full overflow-x-auto rounded-md border">
      <div className="min-w-[1200px]">
        <Table>
          <TableCaption>Product list in your cart</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-center">#</TableHead>
              <TableHead className="w-[100px]">Product</TableHead>
              <TableHead className="w-[150px]">Price</TableHead>
              <TableHead className="w-[100px]">Quantity</TableHead>
              <TableHead className="w-[150px]">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products && products.length > 0 ? (
              products.map((product, index) => (
                <TableRow key={product._id}>
                  <TableCell className="text-center font-medium">
                    {index + 1}.
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{formatPrice(product.priceN)}₮</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>
                    {formatPrice(product.priceN * product.quantity)}₮
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No products available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default CartTable;

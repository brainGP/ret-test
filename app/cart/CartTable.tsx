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
import { baseUrl } from "@/lib/staticData";
import Image from "next/image";
import { formatPrice } from "@/utils/formatPrice";
import SetQuantity from "../stations/[name]/CartQuantity";
import { useCart } from "@/hooks/useCarts";
import { Button } from "@/components/ui/button";

interface ProductTableProps {
  products: Product[];
}

const CartTable: React.FC<ProductTableProps> = ({ products }) => {
  const {
    handleRemoveProductFromCart,
    handleCartQtyDecrease,
    handleCartQtyIncrease,
  } = useCart();

  return (
    <ScrollArea className="w-screen xl:w-full overflow-x-auto rounded-md border">
      <div className="min-w-[1200px]">
        <Table>
          <TableCaption>Product list in your cart</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-center">#</TableHead>
              <TableHead className="w-[200px]">Image</TableHead>
              <TableHead className="w-[100px]">Product</TableHead>
              <TableHead className="w-[150px]">Price</TableHead>
              <TableHead className="w-[100px]">Quantity</TableHead>
              <TableHead className="w-[150px]">Total</TableHead>
              <TableHead className="w-[150px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products && products.length > 0 ? (
              products.map((product, index) => (
                <TableRow key={product._id}>
                  <TableCell className="text-center font-medium">
                    {index + 1}.
                  </TableCell>
                  <TableCell className="w-40 h-40">
                    <Image
                      src={
                        product.images?.[0]?.image
                          ? `${baseUrl}${product.images[0].image}`
                          : "/noresult.png"
                      }
                      alt={product.name}
                      width={200}
                      height={200}
                      className="object-contain h-full"
                      priority={true}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{formatPrice(product.priceN)}₮</TableCell>
                  <TableCell>
                    <SetQuantity
                      cartCounter={true}
                      cartProduct={product}
                      handleQtyDecrease={() => {
                        handleCartQtyDecrease(product);
                      }}
                      handleQtyIncrease={() => {
                        handleCartQtyIncrease(product);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    {formatPrice(product.priceN * product.quantity)}₮
                  </TableCell>
                  <TableCell>
                    <Button
                      className="bg-red-500 hover:bg-red-400"
                      onClick={() => handleRemoveProductFromCart(product)}
                    >
                      Устгах
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Танд хадгалсан бүтээгдэхүүн байхгүй байна!
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

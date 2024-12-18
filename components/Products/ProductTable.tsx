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
import { ProductActions } from "./ProductActions";
import { Product } from "@/types/Product";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

// Helper function to format the price with a thousand separator
const formatPrice = (price: string | number) => {
  // Ensure the price is a number and return formatted string with thousand separators
  const priceNumber =
    typeof price === "string" ? parseInt(price.replace(/[^0-9]/g, "")) : price;
  if (isNaN(priceNumber)) return price; // Return the original price if it's not a valid number
  return priceNumber.toLocaleString("en-US").replace(/,/g, "'"); // Replace commas with apostrophes
};

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onEdit,
  onDelete,
}) => {
  return (
    <ScrollArea className="w-screen xl:w-full overflow-x-auto rounded-md border">
      <div className="min-w-[1200px]">
        <Table>
          <TableCaption>Бүх бүтээгдэхүүний жагсаалт.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-center">#</TableHead>
              <TableHead className="w-[100px]">Brand</TableHead>
              <TableHead className="w-[150px]">Name</TableHead>
              <TableHead className="w-[100px]">Type</TableHead>
              <TableHead className="w-[150px]">Style</TableHead>
              <TableHead className="w-[100px]">Price (НӨАТ, ₮)</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <TableRow key={product._id}>
                  <TableCell className="text-center font-medium">
                    {index + 1}.
                  </TableCell>
                  <TableCell className="font-medium">{product.brand}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.type}</TableCell>
                  <TableCell>{product.style}</TableCell>
                  <TableCell>{formatPrice(product.priceN)}₮</TableCell>
                  <TableCell>
                    <ProductActions
                      product={product}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
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

export default ProductTable;

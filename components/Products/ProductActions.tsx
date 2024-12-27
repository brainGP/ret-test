import { Button } from "@/components/ui/button";
import { Product } from "@/types/Product";

interface ProductActionsProps {
  product: Product;
  // onEdit: (product: Product) => void;
  // onDelete: (id: string) => void;
}

export const ProductActions: React.FC<ProductActionsProps> = (
  {
    // product,
    // onEdit,
    // onDelete,
  }
) => {
  return (
    <div className="flex fle-col lg:flex-row space-4">
      <Button
        className="bg-transparent hover:underline hover:bg-transparent shadow-none text-gray px-3 py-1 rounded mr-2"
        // onClick={() => onEdit(product)}
      >
        Засварлах
      </Button>
      <Button
        className="bg-red-500 hover:bg-red-400 text-white px-3 py-1 rounded"
        // onClick={() => onDelete(product._id!)}
      >
        Устгах
      </Button>
    </div>
  );
};

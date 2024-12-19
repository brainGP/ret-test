"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAdmin, isUserLoggedIn } from "@/lib/authHelper";
import { getCookie } from "cookies-next";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Product } from "@/types/Product";
import ProductTable from "@/components/Products/ProductTable";
import { LoadingError } from "@/components/LoadingError";
import { toast } from "sonner";
import Link from "next/link";
import Breadcrumb from "@/components/BreadCrumb";
import { deleteProductById, getProducts } from "@/apis/products";
import ConfirmationDialog from "./components/confirmation";
import AddProduct from "./components/addProduct";

function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const router = useRouter();

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (e) {
      const err = e as Error;
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    console.log(id);

    try {
      await deleteProductById({ id });
      setProducts((prev) => prev.filter((product) => product._id !== id));
      toast.success("Бүтээгдэхүүнийг амжилттай устгалаа.");
    } catch (e) {
      const err = e as Error;
      toast.error(err.message);
    } finally {
      setIsDialogOpen(false);
    }
  };

  const handleEdit = (product: Product) => setEditProduct(product);

  const handleDelete = (id: string) => {
    setProductToDelete(id);
    setIsDialogOpen(true);
  };

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = getCookie("accessToken");
      if (!accessToken || !isAdmin()) {
        router.push("/");
      } else {
        await fetchProducts();
      }
      if (!isUserLoggedIn) {
        router.push("/");
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div className="flex flex-col justify-center items-center w-full top-0 border-b px-4 md:px-6 mb-8 py-4">
      <div className="container flex flex-col items-centerpy-4 mx-auto max-w-7xl gap-4">
        <div className="flex flex-col sm:flex-row  justify-between ">
          <h1 className="font-semibold text-xl mb-4">Админы хяналтын хэсэг</h1>
          <AddProduct setProducts={setProducts} />
        </div>
        <div className="flex flex-row justify-between items-center">
          <Breadcrumb />
          <Link href="/admin/users">
            <Button> Хэрэглэгчид</Button>
          </Link>
        </div>
      </div>
      <div className="container flex flex-col sm:flex-row items-center justify-between py-4 mx-auto max-w-7xl gap-4">
        <ScrollArea className="w-full h-min-96 overflow-auto border rounded-lg">
          <ProductTable
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </ScrollArea>
      </div>

      <LoadingError isLoading={loading} />

      <ConfirmationDialog
        isOpen={isDialogOpen}
        setIsOpen={(val) => setIsDialogOpen(val)}
        title="Бүтээгдэхүүн устгах"
        description="Энэ үйлдлийг буцаах боломжгүй. Та энэ бүтээгдэхүүнийг устгахдаа
              үнэхээр итгэлтэй байна уу?"
        callback={() => {
          if (productToDelete) {
            deleteProduct(productToDelete);
          }
        }}
        actionLabel="Устгах"
      />
    </div>
  );
}

export default AdminPage;

"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { isAdmin } from "@/lib/authHelper";
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
import Container from "@/components/Container";

function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [authorized, setAuthorized] = useState(false);

  const router = useRouter();

  const fetchProducts = useCallback(async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (e) {
      const err = e as Error;
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = getCookie("accessToken");

      if (!accessToken) {
        toast.error("Нэвтрэх шаардлагатай.");
        router.push("/login");
        return;
      }

      const isAdminUser = await isAdmin();
      if (isAdminUser) {
        setAuthorized(true);
        await fetchProducts();
      } else {
        toast.error("Та энэ хуудсанд хандах эрхгүй.");
        router.push("/");
      }
    };

    checkAuth();
  }, [router, fetchProducts]);

  if (!authorized) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center w-full top-0 border-b px-4 md:px-6 mb-8 py-4">
      <div className="container flex flex-col items-centerpy-4 mx-auto max-w-7xl gap-4">
        <div className="flex flex-col sm:flex-row justify-between">
          <h1 className="font-semibold text-xl mb-4">Админы хяналтын хэсэг</h1>
          <AddProduct
            setProducts={setProducts}
            editProduct={editProduct}
            setEditProduct={setEditProduct}
          />
        </div>
        <div className="flex flex-row justify-between items-center">
          <Breadcrumb />
          <Link href="/admin/users">
            <Button> Хэрэглэгчид</Button>
          </Link>
        </div>
      </div>
      <Container>
        <ScrollArea className="w-full h-min-96 overflow-auto border rounded-lg">
          <ProductTable
            products={products}
            onEdit={setEditProduct}
            onDelete={(id) => {
              setProductToDelete(id);
              setIsDialogOpen(true);
            }}
          />
        </ScrollArea>
      </Container>

      <LoadingError isLoading={loading} />

      <ConfirmationDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        title="Бүтээгдэхүүн устгах"
        description="Энэ үйлдлийг буцаах боломжгүй. Та энэ бүтээгдэхүүнийг устгахдаа үнэхээр итгэлтэй байна уу?"
        callback={() => {
          if (productToDelete) {
            deleteProductById({ id: productToDelete });
            setProducts((prev) =>
              prev.filter((product) => product._id !== productToDelete)
            );
            toast.success("Бүтээгдэхүүнийг амжилттай устгалаа.");
          }
        }}
        actionLabel="Устгах"
      />
    </div>
  );
}

export default AdminPage;

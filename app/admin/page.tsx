"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAdmin, isUserLoggedIn } from "@/lib/authHelper";
import axios from "axios";
import { getCookie } from "cookies-next";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Product } from "@/types/Product";
import ProductTable from "@/components/Products/ProductTable";
import ProductModal from "@/components/Products/ProductModal";
import { LoadingError } from "@/components/LoadingError";
import { toast } from "sonner";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Breadcrumb from "@/components/BreadCrumb";
import { DELETE, GET, POST, PUT } from "@/apis/axios";

function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [isFinalConfirmation, setIsFinalConfirmation] = useState(false);
  const router = useRouter();

  const fetchProducts = async () => {
    try {
      const accessToken = getCookie("accessToken");
      if (!accessToken) throw new Error("Unauthorized");

      const response = await GET({ route: `/api/product`, token: accessToken });
      if (response.status === 200) {
        setProducts(response.data.products);
      }
    } catch {
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!isFinalConfirmation) return;

    try {
      const accessToken = getCookie("accessToken");
      if (!accessToken) throw new Error("Unauthorized");

      const response = await DELETE({
        route: `/api/product/${id}`,
        token: accessToken,
      });

      if (response.status === 200) {
        setProducts((prev) => prev.filter((product) => product._id !== id));
        toast.success("Бүтээгдэхүүнийг амжилттай устгалаа.");
      }
    } catch {
      toast.error("Бүтээгдэхүүнийг устгаж чадсангүй.");
    } finally {
      setIsDialogOpen(false);
    }
  };

  const updateProduct = async (product: Product) => {
    try {
      const accessToken = getCookie("accessToken");
      if (!accessToken) throw new Error("Unauthorized");

      const response = await PUT({
        route: `/api/product/${product._id}`,
        token: accessToken,
        body: product,
      });

      if (response.status === 200) {
        setProducts((prev) =>
          prev.map((item) => (item._id === product._id ? response.data : item))
        );
        toast.success("Бүтээгдэхүүн амжилттай шинэчилсэн.");
        setEditProduct(null);
      }
    } catch {
      toast.error("Бүтээгдэхүүнийг шинэчилж чадсангүй.");
    }
  };

  const addProduct = async (product: Product) => {
    try {
      const accessToken = getCookie("accessToken");
      if (!accessToken) throw new Error("Unauthorized");

      const response = await POST({
        route: `/api/product`,
        token: accessToken,
        body: product,
      });
      if (response.status === 201) {
        setProducts((prev) => [...prev, response.data]);
        toast.success("Бүтээгдэхүүнийг амжилттай нэмлээ.");
        setNewProduct(null);
      }
    } catch {
      toast.error("Бүтээгдэхүүнийг нэмж чадсангүй.");
    }
  };

  const handleEdit = (product: Product) => {
    setEditProduct(product);
  };

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
          <Button
            className="mb-4 text-white"
            onClick={() => setNewProduct({} as Product)}
          >
            Шинэ бүтээгдэхүүн нэмэх
          </Button>
        </div>
        <div className="flex flex-row justify-between items-center">
          <Breadcrumb />
          <Link href={`admin/users`}>
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

      <LoadingError isLoading={loading} error={error} />

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Та энэ бүтээгдэхүүнийг устгахдаа итгэлтэй байна уу?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Энэ үйлдлийг буцаах боломжгүй. Та энэ бүтээгдэхүүнийг устгахдаа
              үнэхээр итгэлтэй байна уу?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
              Цуцлах
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500"
              onClick={() => {
                setIsFinalConfirmation(true);
                if (productToDelete) {
                  deleteProduct(productToDelete);
                }
              }}
            >
              Устгах
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {editProduct && (
        <ProductModal
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onSave={updateProduct}
        />
      )}

      {newProduct && (
        <ProductModal
          product={newProduct}
          onClose={() => setNewProduct(null)}
          onSave={addProduct}
        />
      )}
    </div>
  );
}

export default AdminPage;

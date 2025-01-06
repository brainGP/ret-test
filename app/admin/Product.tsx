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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";

function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [authorized, setAuthorized] = useState(false);
  const [selectedSort] = useState<string>("");

  const router = useRouter();

  const fetchProducts = useCallback(async () => {
    try {
      const data = await getProducts();
      setProducts(data);
      setFilteredProducts(data);
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

  useEffect(() => {
    if (selectedSort) {
      setFilteredProducts(
        products.filter((product) => product.sort === selectedSort)
      );
    } else {
      setFilteredProducts(products);
    }
  }, [selectedSort, products]);

  if (!authorized) {
    return null;
  }

  const handleFilter = (selectedValue: string) => {
    if (selectedValue === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.sort === selectedValue)
      );
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full top-0 px-4 md:px-6 border-b mb-8 py-4">
      <div className="container flex flex-col  mx-auto max-w-7xl gap-4">
        <div className="flex flex-col sm:flex-row justify-between">
          <h1 className="font-semibold text-xl mb-4">Админы хяналтын хэсэг</h1>
          <div className="flex gap-4">
            <AddProduct
              setProducts={setProducts}
              editProduct={editProduct}
              setEditProduct={setEditProduct}
            />
          </div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <Breadcrumb />
          <div className="flex gap-4">
            <div>
              <Select
                onValueChange={(value) => {
                  handleFilter(value);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Сонгох" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="All">Бүгд</SelectItem>
                    <SelectItem value="Гар станц">Гар станц</SelectItem>
                    <SelectItem value="Суурин станц">Суурин станц</SelectItem>
                    <SelectItem value="Дагалдах хэрэгслүүд">
                      Дагалдах хэрэгслүүд
                    </SelectItem>
                    <SelectItem value="Бусад бараа">Бусад бараа</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Link href="/admin/banner">
              <Button> Баннер</Button>
            </Link>
            <Link href="/admin/users">
              <Button> Хэрэглэгчид</Button>
            </Link>
          </div>
        </div>
      </div>
      <Container>
        <ScrollArea className="w-full h-min-96 overflow-auto border rounded-lg">
          <ProductTable
            products={filteredProducts}
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

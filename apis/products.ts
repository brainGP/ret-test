"use server";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DELETE, GET, POST, PUT } from "./axios";
import { cookies } from "next/headers";
import { getCookie, getCookies } from "cookies-next/server";
import { Product } from "@/types/Product";

export const getProducts = async (): Promise<Product[]> => {
  const response = await GET({ route: "/api/product" });
  if (response.status !== 200) throw new Error("Алдаа гарлаа");
  const data: Product[] = response.data.products || [];
  return data;
};

export const getProductByName = async ({
  name,
}: {
  name: string;
}): Promise<Product> => {
  const response = await GET({ route: `/api/product?name=${name}` });
  if (response.status !== 200) throw new Error("Алдаа гарлаа");
  const data: Product[] = response.data.products || null;
  return data[0];
};

export const getProductsByBrand = async ({
  brand,
}: {
  brand: string;
}): Promise<Product[]> => {
  const response = await GET({ route: `/api/product?brand=${brand}` });
  if (response.status !== 200) throw new Error("Алдаа гарлаа");
  const data: Product[] = response.data.products || [];
  return data;
};

export const getNewProducts = async (): Promise<Product[]> => {
  const response = await GET({ route: `/api/product/?new=true` });
  if (response.status !== 200) throw new Error("Алдаа гарлаа");
  const data: Product[] = response.data.products || [];
  return data;
};

export const getProductById = async ({
  id,
}: {
  id: string;
}): Promise<Product> => {
  const response = await GET({ route: `/api/product/${id}` });
  if (response.status !== 200) throw new Error("Алдаа гарлаа");
  const data: Product = response.data.products || {};
  return data;
};

export const postNewProduct = async (product: FormData): Promise<Product> => {
  const { accessToken } = await getCookies({ cookies });
  if (!accessToken) throw new Error("Зөвшөөрөлгүй хэрэглэгч");
  const response = await POST({
    route: `/api/product`,
    token: accessToken,
    body: product,
  });
  if (response.status !== 200)
    throw new Error("Бүтээгдэхүүнийг нэмж чадсангүй.");
  return response.data;
};

export const deleteProductById = async ({ id }: { id: string }) => {
  const { accessToken } = await getCookies({ cookies });
  if (!accessToken) throw new Error("Зөвшөөрөлгүй хэрэглэгч");
  const response = await DELETE({
    route: `/api/product/${id}`,
    token: accessToken,
  });

  if (response.status !== 200)
    throw new Error("Бүтээгдэхүүнийг устгаж чадсангүй.!");
};

export const updateProductById = async ({
  product,
}: {
  product: Product;
}): Promise<Product> => {
  const { accessToken } = await getCookies({ cookies });
  if (!accessToken) throw new Error("Зөвшөөрөлгүй хэрэглэгч");
  const response = await PUT({
    route: `/api/product/${product._id}`,
    token: accessToken,
    body: product,
  });

  if (response.status !== 200)
    throw new Error("Бүтээгдэхүүнийг шинэчилж чадсангүй.");
  return response.data;
};

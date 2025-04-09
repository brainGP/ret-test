"use server";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GET, POST } from "./axios";
import { cookies } from "next/headers";
import { getCookie, getCookies } from "cookies-next/server";
import { Banner } from "@/types/Banner";

export const getBanners = async (): Promise<Banner[]> => {
  const response = await GET({ route: "/api/dashboard" });

  if (response.status !== 200) throw new Error("Алдаа гарлаа");

  const data: Banner[] = response.data.banners || [];

  return data;
};

export const postNewBanner = async (banner: FormData): Promise<Banner> => {
  const { accessToken } = await getCookies({ cookies });
  if (!accessToken) throw new Error("Unauthorized user");
  const res = await POST({
    route: `/api/dashboard`,
    token: accessToken,
    body: banner,
  });

  if (res.status !== 200) throw new Error("Бүтээгдэхүүнийг нэмж чадсангүй.");
  return res.data;
};

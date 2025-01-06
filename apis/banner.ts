"use server";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DELETE, GET, POST, PUT } from "./axios";
import { cookies } from "next/headers";
import { getCookie, getCookies } from "cookies-next/server";
import { Banner } from "@/types/Banner";

export const getBanners = async (): Promise<Banner[]> => {
  const response = await GET({ route: "/api/dashboard" });
  if (response.status !== 200) throw new Error("Алдаа гарлаа");
  const data: Banner[] = response.data.banner || [];
  return data;
};

export const postNewBanner = async (banner: FormData): Promise<Banner> => {
  const { accessToken } = await getCookies({ cookies });
  if (!accessToken) throw new Error("Unauthorized user");

  try {
    const response = await POST({
      route: `/api/dashboard`,
      token: accessToken,
      body: banner,
    });

    console.log("API Response:", response);
    if (response.status !== 200) {
      throw new Error("Failed to create banner");
    }

    return response.data;
  } catch (error) {
    console.error("Error posting new banner:", error);
    throw error;
  }
};

import { baseUrl } from "@/lib/staticData";
import axios, { AxiosRequestConfig } from "axios";

const buildAPIUrl = (route: string) => `${baseUrl}${route}`;
export type body = { [key: string]: any };
interface MyRequest {
  route: string;
  token?: string;
}

interface MyBodyRequest extends MyRequest {
  body: any;
}

export const GET = async ({ route, token }: MyRequest) => {
  const url = buildAPIUrl(route);
  const config: AxiosRequestConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.get(url, config);
};

export const DELETE = async ({ route, token }: MyRequest) => {
  const url = buildAPIUrl(route);
  const config: AxiosRequestConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.delete(url, config);
};

export const PUT = async ({ route, token, body }: MyBodyRequest) => {
  const url = buildAPIUrl(route);
  const config: AxiosRequestConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.put(url, body, config);
};

export const POST = async ({ route, token, body }: MyBodyRequest) => {
  const url = buildAPIUrl(route);
  const isFormData = body instanceof FormData;

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
    },
  };

  return axios.post(url, body, config);
};

"use client";

import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

console.log('start');

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ✅ Corrected Request Interceptor Type
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // Set necessary CORS headers
    config.headers["Access-Control-Allow-Origin"] = "*";
    config.headers["Access-Control-Allow-Headers"] =
      "Origin, X-Requested-With, Content-Type, Accept";
    config.headers["Access-Control-Allow-Methods"] =
      "GET, POST, PUT, DELETE, OPTIONS";

    return config;
  },
  (error: AxiosError): Promise<never> => Promise.reject(error)
);

// ✅ Response Interceptor with Correct Type
const AxiosInterceptor = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const errInterceptor = (error: AxiosError): Promise<never> => {
      return Promise.reject(error);
    };

    const interceptor = api.interceptors.response.use(
      (response: AxiosResponse) => response,
      errInterceptor
    );

    return () => api.interceptors.response.eject(interceptor);
  }, [router]);

  return children;
};

export default api;
export { AxiosInterceptor };

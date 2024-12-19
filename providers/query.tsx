"use client";
import LoadingPage from "@/app/loading";
import { LoadingWait } from "@/components/LoadingWait";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import React, { ReactNode, useEffect, useState } from "react";

const queryClient = new QueryClient();

const ReactQuery = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return <LoadingPage />;
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQuery;

import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export const metadata: Metadata = {
  title: "Retevis",
  description: "Retevis Mongolia",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <Toaster />
      {children}
      <Footer />
    </>
  );
}

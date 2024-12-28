import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Providers from "../providers";
import CartProvider from "@/providers/CartProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Retevis",
  description: "Retevis Mongolia",
  icons: "/RMLogo.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray/[2%]">
        <CartProvider>
          <Providers>
            <Header />
            {children}
            <Footer />
          </Providers>
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}

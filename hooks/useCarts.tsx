"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Product } from "@/types/Product";
import { toast } from "sonner";

type CartContextType = {
  cartTotalQty: number;
  cartProducts: Product[] | null;
  handleAddProductToCart: (product: Product) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export const CartContextProvider: React.FC<Props> = ({ children }) => {
  const [cartProducts, setCartProducts] = useState<Product[] | null>([]);
  const [cartTotalQty, setCartTotalQty] = useState(0);

  useEffect(() => {
    const cartItems = localStorage.getItem("Retevis");
    const cProducts: Product[] = cartItems ? JSON.parse(cartItems) : [];
    setCartProducts(cProducts);
  }, []);

  useEffect(() => {
    const totalQty =
      cartProducts?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;
    setCartTotalQty(totalQty);
  }, [cartProducts]);

  // Add product to cart
  const handleAddProductToCart = useCallback((product: Product) => {
    setCartProducts((prev) => {
      let updatedCart;
      if (prev) {
        updatedCart = [...prev, product];
      } else {
        updatedCart = [product];
      }
      toast.success("Product successfully added to the cart.");
      localStorage.setItem("Retevis", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, []);

  const value = {
    cartTotalQty,
    cartProducts,
    handleAddProductToCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
};

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
  cartTotalAmount: number;
  cartProducts: Product[] | null;
  handleAddProductToCart: (product: Product) => void;
  handleRemoveProductFromCart: (product: Product) => void;
  handleCartQtyIncrease: (product: Product) => void;
  handleCartQtyDecrease: (product: Product) => void;
  handleClearCart: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export const CartContextProvider: React.FC<Props> = ({ children }) => {
  const [cartProducts, setCartProducts] = useState<Product[] | null>([]);
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);

  useEffect(() => {
    const cartItems = localStorage.getItem("Retevis");
    const cProducts: Product[] = cartItems ? JSON.parse(cartItems) : [];
    setCartProducts(cProducts);
  }, []);

  useEffect(() => {
    const getTotals = () => {
      if (cartProducts) {
        const { total, qty } = cartProducts?.reduce(
          (acc, item) => {
            const itemTotal = item.priceN * item.quantity;

            acc.total += itemTotal;
            acc.qty += item.quantity;

            return acc;
          },
          {
            total: 0,
            qty: 0,
          }
        );
        setCartTotalQty(qty);
        setCartTotalAmount(total);
      }
    };
    getTotals();
  }, [cartProducts]);

  useEffect(() => {
    const totalQty =
      cartProducts?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;
    setCartTotalQty(totalQty);
  }, [cartProducts]);

  const handleAddProductToCart = useCallback((product: Product) => {
    setCartProducts((prev) => {
      let updatedCart;
      if (prev) {
        updatedCart = [...prev, product];
      } else {
        updatedCart = [product];
      }
      toast.success("Бүтээгдэхүүн жагсаалтанд амжилттай нэмэгдлээ.");
      localStorage.setItem("Retevis", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, []);

  const handleRemoveProductFromCart = useCallback(
    (product: Product) => {
      if (cartProducts) {
        const filteredProducts = cartProducts.filter((item) => {
          return item._id !== product._id;
        });
        setCartProducts(filteredProducts);
        toast.success("Бүтээгдэхүүн амжилттай устгагдлаа.");
        localStorage.setItem("Retevis", JSON.stringify(filteredProducts));
      }
    },
    [cartProducts]
  );

  const handleCartQtyIncrease = useCallback(
    (product: Product) => {
      let updateCart;
      if (product.quantity === 99) {
        return toast.error("Тус бүтээгдэхүүн хэмжээнээс хэтэрсэн.");
      }
      if (cartProducts) {
        updateCart = [...cartProducts];

        const existingIndex = cartProducts.findIndex(
          (item) => item._id === product._id
        );
        if (existingIndex > -1) {
          updateCart[existingIndex].quantity = ++updateCart[existingIndex]
            .quantity;
        }
        setCartProducts(updateCart);
        localStorage.setItem("Retevis", JSON.stringify(updateCart));
      }
    },
    [cartProducts]
  );
  const handleCartQtyDecrease = useCallback(
    (product: Product) => {
      let updateCart;
      if (product.quantity === 1) {
        return toast.error("Тус бүтээгдэхүүн уг хэмжээнээс доошлох боломжгүй!");
      }
      if (cartProducts) {
        updateCart = [...cartProducts];

        const existingIndex = cartProducts.findIndex(
          (item) => item._id === product._id
        );
        if (existingIndex > -1) {
          updateCart[existingIndex].quantity = --updateCart[existingIndex]
            .quantity;
        }
        setCartProducts(updateCart);
        localStorage.setItem("Retevis", JSON.stringify(updateCart));
      }
    },
    [cartProducts]
  );
  const handleClearCart = useCallback(() => {
    setCartProducts(null);
    setCartTotalQty(0);
    toast.success("Бүх жагсаалт амжилттай устгагдлаа!");
    localStorage.setItem("Retevis", JSON.stringify(null));
  }, [cartProducts]);

  const value = {
    cartTotalQty,
    cartTotalAmount,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
    handleClearCart,
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

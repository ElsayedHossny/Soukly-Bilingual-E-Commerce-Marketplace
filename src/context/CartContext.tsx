
import { ICartResponse } from "@/interface/cart.interface";
import { getUserCart } from "@/services/cart.service";
import { createContext, useContext, useEffect, useState } from "react";

interface ICartContext{
  CartDetails : ICartResponse | null;
}

const CartContext = createContext<ICartContext | null>(null);


export function CartContextProvider({ children }: { children: React.ReactNode }) {

  const [CartDetails, setCartDetails] = useState<ICartResponse | null>(null);

useEffect(() => {
  const getCart = async () => {
    const data = await getUserCart();
    setCartDetails(data);
  };

  getCart();
}, []);

  return <CartContext.Provider value={{CartDetails}}>{children}</CartContext.Provider>;
}


export function useCart() {
  const context = useContext(CartContext);
  if(!context){
    throw new Error("useCart must use in CartContextProvider")
  }
  return context; 
}
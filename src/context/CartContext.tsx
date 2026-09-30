import { ICartResponse } from "@/interface/cart.interface";
import { getUserCart } from "@/services/cart.service";
import { createContext, useContext, useEffect, useState } from "react";

interface ICartContext {
  CartDetails: ICartResponse | null;
  setCartDetails: React.Dispatch<React.SetStateAction<ICartResponse | null>>;
  getCart :  ()=> Promise<void>;
}

const CartContext = createContext<ICartContext | null>(null);

export function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [CartDetails, setCartDetails] = useState<ICartResponse | null>(null);

  async function getCart() {
    const data :ICartResponse = await getUserCart();
      // console.log("GET CART BEFORE SET:", data.numOfCartItems);
    setCartDetails(data);
  }


//     useEffect(() => {
//   console.log("CART STATE CHANGED:", CartDetails?.numOfCartItems);
// }, [CartDetails]);

useEffect(() => {
  async function fetchCart() {
    await getCart();
  }

  fetchCart();
}, []);

  return (
    <CartContext.Provider value={{ CartDetails, setCartDetails , getCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must use in CartContextProvider");
  }
  return context;
}

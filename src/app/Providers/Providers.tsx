"use client";

import { CartContextProvider } from "@/context/CartContext";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SessionProvider>
        {" "}
        <CartContextProvider> {children}</CartContextProvider>
      </SessionProvider>
    </>
  );
}

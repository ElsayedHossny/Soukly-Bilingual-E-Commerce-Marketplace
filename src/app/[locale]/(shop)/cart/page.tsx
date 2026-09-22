"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { CustomButton } from "@/components/ui/button copy";
import { useCart } from "@/context/CartContext";
import { ICartProduct } from "@/interface/cart.interface";
import { removeAllItems } from "@/services/cart.service";
import { toast } from "sonner";
import { ShoppingCartIcon } from "lucide-react";

export default function Cart() {
  const { CartDetails, setCartDetails } = useCart();
  const ProductsCart: ICartProduct[] = CartDetails?.data?.products ?? [];

  async function removeUserCart() {
    try {
      const res = await removeAllItems();
      if (res?.message === "success") {
        toast.success("Cart remove successfully");
        setCartDetails(null);
        return;
      }
      toast.error(res?.message || "Something went wrong");
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  console.log("CartDetails", CartDetails);

  return (
    <div className="container mx-auto mt-6 mb-12 px-3 sm:mt-10 sm:px-6">
      {CartDetails?.numOfCartItems ? (
        <>
          <section className="mb-12 sm:mb-20">
            <div className="w-full overflow-x-auto rounded-lg border border-border bg-card shadow-sm">
              <Table className="min-w-[700px]">
                <TableHeader>
                  <TableRow className="border-b border-border bg-muted/40 hover:bg-muted/40">
                    <TableHead className="h-12 px-3 text-start font-semibold text-foreground sm:h-14 sm:px-5">
                      Product
                    </TableHead>

                    <TableHead className="h-12 px-3 text-center font-semibold text-foreground sm:h-14 sm:px-5">
                      Price
                    </TableHead>

                    <TableHead className="h-12 px-3 text-center font-semibold text-foreground sm:h-14 sm:px-5">
                      Quantity
                    </TableHead>

                    <TableHead className="h-12 px-3 text-end font-semibold text-foreground sm:h-14 sm:px-5">
                      Subtotal
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {ProductsCart.map((product, key) => (
                    <TableRow
                      key={product.product?._id ?? key}
                      className="border-b border-border transition-colors hover:bg-muted/30"
                    >
                      <TableCell className="px-3 py-4 sm:px-5 sm:py-6">
                        <div className="flex min-w-[250px] items-center gap-3 sm:gap-5">
                          <Image
                            src={
                              product.product?.imageCover ?? "/placeholder.png"
                            }
                            alt={product.product?.title ?? "Product thumbnail"}
                            height={54}
                            width={54}
                            className="size-12 shrink-0 rounded-md border border-border object-cover sm:size-[54px]"
                          />

                          <h2 className="line-clamp-2 max-w-[220px] text-sm font-medium text-foreground sm:text-base">
                            {product.product?.title ?? "Product"}
                          </h2>
                        </div>
                      </TableCell>

                      <TableCell className="whitespace-nowrap px-3 text-center text-sm font-medium text-foreground sm:px-5 sm:text-base">
                        ${Number(product.price ?? 0).toFixed(2)}
                      </TableCell>

                      <TableCell className="whitespace-nowrap px-3 text-center text-sm text-muted-foreground sm:px-5 sm:text-base">
                        {product.count}
                      </TableCell>

                      <TableCell className="whitespace-nowrap px-3 text-end text-sm font-semibold text-foreground sm:px-5 sm:text-base">
                        $
                        {((product.price ?? 0) * (product.count ?? 0)).toFixed(
                          2,
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <CustomButton
                variant={"outline"}
                className="w-full bg-primary px-6 py-4 text-white hover:bg-primary/90 hover:text-white sm:w-auto"
              >
                <Link href={"/product"}>Return To Shop</Link>
              </CustomButton>

              <CustomButton
                variant={"destructive"}
                className="w-full px-6 py-4 sm:w-auto cursor-pointer"
                onClick={async () => {
                  await removeUserCart();
                }}
              >
                Remove All
              </CustomButton>
            </div>
          </section>

          <section className="flex flex-col gap-6 sm:gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex w-full flex-col gap-3 rounded-lg border border-border bg-card p-4 shadow-sm sm:p-6 lg:w-5/12">
              <Input
                placeholder="Coupon Code"
                className="h-11 border-border bg-background text-sm text-foreground shadow-none transition-all duration-200 placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30"
              />

              <CustomButton
                variant={"destructive"}
                className="h-11 w-full shrink-0 px-6 font-medium sm:w-auto"
              >
                Apply Coupon
              </CustomButton>
            </div>

            <div className="w-full rounded-lg border border-border bg-card p-4 shadow-sm sm:p-6 lg:w-5/12">
              <h3 className="mb-4 text-lg font-semibold text-foreground sm:mb-5 sm:text-xl">
                Cart Total
              </h3>

              <ul className="mb-6">
                <li className="flex items-center justify-between gap-4 border-b border-border py-3">
                  <span className="text-sm text-muted-foreground sm:text-base">
                    Subtotal:
                  </span>

                  <span className="whitespace-nowrap text-sm font-medium text-foreground sm:text-base">
                    {CartDetails?.data?.totalCartPrice
                      ? `$${CartDetails.data.totalCartPrice.toFixed(2)}`
                      : "$0.00"}
                  </span>
                </li>

                <li className="flex items-center justify-between gap-4 border-b border-border py-3">
                  <span className="text-sm text-muted-foreground sm:text-base">
                    Shipping:
                  </span>

                  <span className="text-sm font-medium text-foreground sm:text-base">
                    Free
                  </span>
                </li>

                <li className="flex items-center justify-between gap-4 pt-4 text-base font-semibold sm:text-lg">
                  <span className="text-foreground">Total:</span>

                  <span className="whitespace-nowrap text-foreground">
                    {CartDetails?.data?.totalCartPrice
                      ? `$${CartDetails.data.totalCartPrice.toFixed(2)}`
                      : "$0.00"}
                  </span>
                </li>
              </ul>

              <CustomButton
                variant={"destructive"}
                className="w-full py-4 font-medium"
              >
                Process to checkout
              </CustomButton>
            </div>
          </section>
        </>
      ) : (
        <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-border/60 bg-muted/20 px-6 py-12 text-center shadow-sm">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
            <ShoppingCartIcon className="h-12 w-12 text-primary" />
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Your Cart is Empty
          </h2>

          <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
            Looks like you haven&apos;t added anything to your cart yet. Start
            shopping and discover something you&apos;ll love.
          </p>

          <div className="mt-8">
            <CustomButton
              variant="outline"
              className="h-11 rounded-lg bg-primary px-7 font-medium text-white shadow-sm transition-all duration-200 hover:bg-primary/90 hover:text-white hover:shadow-md"
            >
              <Link href="/product">Return To Shop</Link>
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  );
}

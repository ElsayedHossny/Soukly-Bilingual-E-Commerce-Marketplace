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

export default function Cart() {
  const { CartDetails } = useCart();

  console.log(CartDetails?.data?.products);

  const ProductsCart: ICartProduct[] = CartDetails?.data?.products ?? [];

  return (
    <div className="container mx-auto mt-6 px-3 sm:mt-10 sm:px-6">
      {CartDetails && (
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
                              product.product?.imageCover ??
                              "/placeholder.png"
                            }
                            alt={
                              product.product?.title ??
                              "Product thumbnail"
                            }
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
                        {(
                          (product.price ?? 0) *
                          (product.count ?? 0)
                        ).toFixed(2)}
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
                className="w-full px-6 py-4 sm:w-auto"
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
                    $1500
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
                    $1500
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
      )}
    </div>
  );
}


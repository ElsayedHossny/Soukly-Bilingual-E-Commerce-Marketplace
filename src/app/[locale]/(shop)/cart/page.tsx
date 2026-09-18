"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from "next/image"
import Link from "next/link"
import { Input } from '@/components/ui/input';
import { CustomButton } from "@/components/ui/button copy";
import { useCart } from "@/context/CartContext";

export default  function Cart() {

  const {CartDetails} = useCart();

  return (

<div className="container mx-auto mt-10 px-4 sm:px-6">
  {CartDetails&& (<>
  <section className="mb-20">
    <div className="overflow-x-auto rounded-lg border border-border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-border bg-muted/40 hover:bg-muted/40">
            <TableHead className="h-14 px-5 text-start font-semibold text-foreground">
              Product
            </TableHead>

            <TableHead className="h-14 px-5 text-center font-semibold text-foreground">
              Price
            </TableHead>

            <TableHead className="h-14 px-5 text-center font-semibold text-foreground">
              Quantity
            </TableHead>

            <TableHead className="h-14 px-5 text-end font-semibold text-foreground">
              Subtotal
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow className="border-b border-border transition-colors hover:bg-muted/30">
            <TableCell className="px-5 py-6">
              <div className="flex items-center gap-5">
                <Image
                  src={
                    "https://ecommerce.routemisr.com/Route-Academy-products/1680403397482-1.jpeg"
                  }
                  alt="Product thumbnail"
                  height={54}
                  width={54}
                  className="rounded-md border border-border object-cover"
                />

                <h2 className="font-medium text-foreground">
                  ElsayedHossny
                </h2>
              </div>
            </TableCell>

            <TableCell className="px-5 text-center font-medium text-foreground">
              $250.00
            </TableCell>

            <TableCell className="px-5 text-center text-muted-foreground">
              2
            </TableCell>

            <TableCell className="px-5 text-end font-semibold text-foreground">
              {250 * 2}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <CustomButton
        variant={"outline"}
        className="bg-primary px-6 py-4 text-white hover:bg-primary/90 hover:text-white"
      >
        <Link href={"/product"}>Return To Shop</Link>
      </CustomButton>

      <CustomButton
        variant={"destructive"}
        className="px-6 py-4"
      >
        Remove All
      </CustomButton>
    </div>
  </section>

  <section className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
    <div className="flex w-full flex-col gap-3 rounded-lg border border-border bg-card p-6 shadow-sm sm:flex-row lg:w-5/12">
      <Input
        placeholder="Coupon Code"
        className="h-11 border-border bg-background text-sm text-foreground shadow-none transition-all duration-200 placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30"
      />

      <CustomButton
        variant={"destructive"}
        className="h-11 shrink-0 px-6 font-medium"
      >
        Apply Coupon
      </CustomButton>
    </div>

    {/* Cart Total */}
    <div className="w-full rounded-lg border border-border bg-card p-6 shadow-sm lg:w-5/12">
      <h3 className="mb-5 text-xl font-semibold text-foreground">
        Cart Total
      </h3>

      <ul className="mb-6">
        <li className="flex items-center justify-between border-b border-border py-3">
          <span className="text-muted-foreground">
            Subtotal:
          </span>

          <span className="font-medium text-foreground">
            $1500
          </span>
        </li>

        <li className="flex items-center justify-between border-b border-border py-3">
          <span className="text-muted-foreground">
            Shipping:
          </span>

          <span className="font-medium text-foreground">
            Free
          </span>
        </li>

        <li className="flex items-center justify-between pt-4 text-lg font-semibold">
          <span className="text-foreground">
            Total:
          </span>

          <span className="text-foreground">
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
  </>)
}
</div>
  )
}

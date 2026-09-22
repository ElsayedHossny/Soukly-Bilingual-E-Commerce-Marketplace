"use client";
import { Heart, Menu, ShoppingCart, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import LogoEn from "@assets/Logo.png";
import LogoAr from "@assets/logoAR.png";

import { useLocale, useTranslations } from "next-intl";
import { AuthItem, MenuItem, Navbar1Props } from "@/interface/navbar.interface";
import BtnModeToggle from "../navbar/BtnModeToggle";
import BtnLanguage from "../navbar/BtnLanguage";

import { signOut, useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar1 = () => {
  const locale = useLocale();
  const t = useTranslations("Home.navbar");
  const pathname = usePathname();
  const isRtl = locale === "ar";

  const logo: Navbar1Props = {
    url: "/",
    alt: "logo",
    title: "",
  };
  const navMenu: MenuItem[] = [
    { title: t("products"), url: "/product" },
    { title: t("productsOffline"), url: "/productOffline" },
    { title: "Blog", url: "#" },
  ];
  const auth: AuthItem = {
    login: { title: t("Login"), url: "/login" },
    signup: { title: t("Sign_up"), url: "/register" },
    signout: { title: t("Sign_Out"), url: "/register" },
  };

  const isActive = (url: string) => url !== "#" && pathname === url;

  const { data: sessions, status } = useSession();

  // console.log(sessions);

  const { CartDetails } = useCart();

  // console.log(CartDetails.numOfCartItems);

  // px-3 py-3 md:px-6

  return (
    <div className="top-0 z-50 w-full ">
      <section
        dir={isRtl ? "rtl" : "ltr"}
        className={cn(
          "border-primary-hover/40 bg-primary",
          // "mx-auto max-w-7xl rounded-full border transition-all duration-300",
          "dark:border-border dark:bg-surface",
          "py-4 backdrop-blur-md dark:bg-surface/90",
        )}
      >
        <div className="px-4 md:px-6">
          {/* Desktop Menu */}
          <nav className="hidden items-center justify-between lg:flex">
            <div className="flex items-center gap-6">
              <Link href={logo.url} className="flex items-center gap-2">
                <Image
                  src={isRtl ? LogoAr : LogoEn}
                  alt={logo.alt}
                  width={100}
                  height={100}
                  priority
                  className="h-12 w-32 rounded-2xl bg-white p-0.5"
                />
                {logo.title && (
                  <span className="text-lg font-semibold tracking-tighter text-primary-foreground dark:text-foreground">
                    {logo.title}
                  </span>
                )}
              </Link>
              <NavigationMenu>
                <NavigationMenuList>
                  {navMenu.map((item) => (
                    <NavigationMenuItem key={item.title}>
                      <NavigationMenuLink
                        href={item.url}
                        aria-current={isActive(item.url) ? "page" : undefined}
                        className={cn(
                          "group inline-flex h-10 w-max items-center justify-center rounded-full bg-transparent px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-white/10 hover:text-primary-foreground",
                          "dark:text-foreground dark:hover:bg-muted dark:hover:text-accent-foreground",
                          isActive(item.url) && "bg-white/20 dark:bg-muted",
                        )}
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
              <div className="flex gap-2">
                <BtnModeToggle />
                <BtnLanguage />
              </div>
            </div>
            <div className="flex items-center gap-2">
              {status == "loading" ? (
                <>loadding...</>
              ) : status == "unauthenticated" ? (
                <>
                  <Link
                    href={auth.login.url}
                    className={cn(
                      buttonVariants({ size: "sm" }),
                      "rounded-full border-0 bg-white text-primary hover:bg-white/90",
                      "dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary-hover",
                      "transition-colors font-extrabold focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:focus-visible:ring-offset-background",
                    )}
                  >
                    {auth.login.title}
                  </Link>
                  <Link
                    href={auth.signup.url}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "rounded-full font-extrabold border-white/70 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground",
                      "dark:border-border dark:text-foreground dark:hover:bg-primary/10 dark:hover:border-primary/50 dark:hover:text-primary",
                      "transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:focus-visible:ring-offset-background",
                    )}
                  >
                    {auth.signup.title}
                  </Link>
                </>
              ) : (
                <>
                  <div className="flex gap-3">
                    <Link
                      href="/wishlist"
                      className="relative inline-flex items-center justify-center"
                    >
                      <Heart className="size-7 text-white" />

                      <Badge
                        variant="destructive"
                        className="absolute -right-2 -top-1.5 size-5 font-mono text-white rounded-full p-1 bg-red-600 dark:bg-red-600"
                      >
                        9
                      </Badge>
                    </Link>

                    <Link
                      href="/cart"
                      className="relative inline-flex items-center justify-center"
                    >
                      <ShoppingCart className="size-7 text-white" />
                      <Badge
                        variant="destructive"
                        className="absolute -right-2 -top-1.5 size-5 font-mono text-white rounded-full p-1 bg-red-600 dark:bg-red-600"
                      >
                        {CartDetails?.numOfCartItems || 0}
                      </Badge>
                    </Link>

                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon"
                            className="cursor-pointer rounded-full text-white transition-all duration-200 hover:bg-white/15 hover:text-white focus-visible:ring-2 focus-visible:ring-white/30"
                          />
                        }
                      >
                        <UserRound className="size-6" />
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        align="end"
                        sideOffset={8}
                        className="w-52 rounded-xl border border-border/50 bg-background/95 p-1.5 shadow-xl backdrop-blur-md"
                      >
                        <DropdownMenuGroup>
                          <DropdownMenuLabel className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            {t("myaccount")}
                          </DropdownMenuLabel>

                          <DropdownMenuItem className="cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent">
                            <Link
                              href="/profile"
                              className="w-full cursor-pointer"
                            >
                              {t("profile")}
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            className="cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10 focus:text-destructive"
                            onClick={() => signOut({ callbackUrl: "/login" })}
                          >
                            {auth.signout.title}
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Menu */}
          <div className="block lg:hidden">
            <div className="flex items-center justify-between">
              <Link href={logo.url} className="flex items-center gap-2">
                <Image
                  src={isRtl ? LogoAr : LogoEn}
                  alt={logo.alt}
                  loading="lazy"
                  width={100}
                  height={100}
                  className="h-10 w-32 rounded-2xl bg-white p-0.5"
                />
              </Link>
              <Sheet>
                <SheetTrigger
                  aria-label="Open menu"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "icon" }),
                    "rounded-full border-white/70 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground",
                    "dark:border-border dark:text-foreground dark:hover:bg-muted",
                  )}
                >
                  <Menu className="size-4" />
                </SheetTrigger>
                <SheetContent
                  side={isRtl ? "right" : "left"}
                  className="overflow-y-auto bg-background text-foreground"
                >
                  <SheetHeader>
                    <SheetTitle>
                      <Link href={logo.url} className="flex items-center gap-2">
                        <Image
                          src={isRtl ? LogoAr : LogoEn}
                          alt={logo.alt}
                          loading="lazy"
                          width={100}
                          height={100}
                          className="h-10 w-32 rounded-2xl bg-white p-0.5"
                        />
                      </Link>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-2 p-4 ">
                    <div className="flex flex-col items-center gap-2">
                      {navMenu.map((item) => (
                        <Link
                          key={item.title}
                          href={item.url}
                          aria-current={isActive(item.url) ? "page" : undefined}
                          className={cn(
                            "inline-flex items-center justify-center rounded-md px-4 py-2",
                            "text-md font-semibold text-foreground",
                            "hover:bg-accent hover:text-accent-foreground",
                            isActive(item.url) && "text-primary",
                          )}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                    <div className="flex justify-center gap-2">
                      <BtnModeToggle />
                      <BtnLanguage />
                    </div>
                    <div className="flex flex-col mt-4 gap-5">
                      {status == "loading" ? (
                        <>loadding...</>
                      ) : status == "unauthenticated" ? (
                        <>
                          <Link
                            href={auth.login.url}
                            className={cn(
                              buttonVariants({ size: "sm" }),
                              "rounded-full",
                              "font-extrabold",
                            )}
                          >
                            {auth.login.title}
                          </Link>
                          <Link
                            href={auth.signup.url}
                            className={cn(
                              buttonVariants({
                                variant: "outline",
                                size: "sm",
                              }),
                              "rounded-full",
                              "font-extrabold",
                            )}
                          >
                            {auth.signup.title}
                          </Link>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center justify-center gap-3">
                            <Link
                              href="/wishlist"
                              className="relative inline-flex items-center justify-center"
                            >
                              <Heart className="size-7" />

                              <Badge
                                variant="destructive"
                                className="absolute -right-2 -top-1.5 size-5 font-mono rounded-full p-1 text-white bg-red-600 dark:bg-red-600"
                              >
                                9
                              </Badge>
                            </Link>

                            <Link
                              href="/cart"
                              className="relative inline-flex items-center justify-center"
                            >
                              <ShoppingCart className="size-7 " />

                              <Badge
                                variant="destructive"
                                className="absolute -right-2 -top-1.5 size-5 font-mono text-white rounded-full p-1 bg-red-600 dark:bg-red-600"
                              >
                                {CartDetails?.numOfCartItems || 0}
                              </Badge>
                            </Link>

                            <DropdownMenu>
                              <DropdownMenuTrigger
                                render={
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="cursor-pointer rounded-full text-white transition-all duration-200 hover:bg-white/15 hover:text-white focus-visible:ring-2 focus-visible:ring-white/30"
                                  />
                                }
                              >
                                <UserRound className="size-6" />
                              </DropdownMenuTrigger>

                              <DropdownMenuContent
                                align="end"
                                sideOffset={8}
                                className="w-52 rounded-xl border border-border/50 bg-background/95 p-1.5 shadow-xl backdrop-blur-md"
                              >
                                <DropdownMenuGroup>
                                  <DropdownMenuLabel className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                    {t("myaccount")}
                                  </DropdownMenuLabel>

                                  <DropdownMenuItem className="cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent">
                                    <Link
                                      href="/profile"
                                      className="w-full cursor-pointer"
                                    >
                                      {t("profile")}
                                    </Link>
                                  </DropdownMenuItem>

                                  <DropdownMenuItem
                                    className="cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10 focus:text-destructive"
                                    onClick={() =>
                                      signOut({ callbackUrl: "/login" })
                                    }
                                  >
                                    {auth.signout.title}
                                  </DropdownMenuItem>
                                </DropdownMenuGroup>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export { Navbar1 };

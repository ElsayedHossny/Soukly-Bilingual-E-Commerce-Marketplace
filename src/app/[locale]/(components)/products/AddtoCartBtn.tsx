"use client";
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/CartContext';
import { addItemToCart } from '@/services/cart.service';
import { ShoppingCartIcon } from 'lucide-react'
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

type AddtoCartBtnProps = {
  id: string
}

export default function AddtoCartBtn({ id }: AddtoCartBtnProps) {

      const {getCart} = useCart();

      const t =  useTranslations("ProductCard");

  async function handleAddToCart(productId: string) {
    try {
      const res = await addItemToCart(productId)
      const numOfItems = res.numOfCartItems;
      console.log("numOfItems" , numOfItems);
       await getCart();
      if (res?.message === 'success') {
        toast.success('Product added to cart successfully')
        return
      }
      toast.error(res?.message || 'Something went wrong')
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  return (
    <Button
      className="w-full cursor-pointer gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 hover:shadow-md sm:w-fit sm:px-10"
      onClick={() => handleAddToCart(id)}
    >
      <ShoppingCartIcon className="h-5 w-5" />
      {t('addToCart')}
    </Button>
  )
}

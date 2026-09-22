import { getUserToken } from "@/lib/serverUtilts";

export async function getUserCart() {
  try {
    const token= await getUserToken();
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: token as string,  
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch UserCart");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return []
  }
}

export async function removeAllItems() {
  try {
    const token= await getUserToken();
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      method:"DELETE",
      headers: {
        token: token as string,  
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch UserCart");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return []
  }
}


export async function addItemToCart(productId: string) {
  try {
    const token= await getUserToken();
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      method:"POST",
      headers: {
        "content-type": "application/json",
        token: token as string,  
      },
      body: JSON.stringify({productId}),
    });
    if (!res.ok) {
      throw new Error("Failed to fetch UserCart");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return []
  }
}

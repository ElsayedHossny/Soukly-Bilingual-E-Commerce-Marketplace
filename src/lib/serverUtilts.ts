// "use server";
// import { decode } from "next-auth/jwt";
// import { cookies } from "next/headers";


// export async function  getUserToken() {
//     const encodedeToken= (await cookies()).get("next-auth.session-token")?.value;
//     const decodedToken = await decode({token : encodedeToken ,secret :process.env.NEXTAUTH_SECRET ! });
//     return decodedToken?.token;
// }



"use server";

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
  const cookieStore = await cookies();

  const encodedToken =
    cookieStore.get("__Secure-next-auth.session-token")?.value ??
    cookieStore.get("next-auth.session-token")?.value;

  if (!encodedToken) {
    return null;
  }

  const decodedToken = await decode({
    token: encodedToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  return decodedToken?.token;
}
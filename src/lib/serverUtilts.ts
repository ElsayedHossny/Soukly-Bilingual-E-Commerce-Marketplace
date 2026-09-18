"use server";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";


export async function  getUserToken() {
    const encodedeToken= (await cookies()).get("next-auth.session-token")?.value;
    const decodedToken = await decode({token : encodedeToken ,secret :process.env.NEXTAUTH_SECRET ! });
    return decodedToken?.token;
}


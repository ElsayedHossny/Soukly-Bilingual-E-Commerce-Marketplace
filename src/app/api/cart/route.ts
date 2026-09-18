// import { getUserToken } from "@/lib/serverUtilts";

// export async function GET() {
//   try {
//     const token = await getUserToken();

//     const res = await fetch(
//       "https://ecommerce.routemisr.com/api/v1/cart",
//       {
//         headers: {
//           token: token as string,
//         },
//       }
//     );

//     if (!res.ok) {
//       throw new Error("Failed to fetch UserCart");
//     }

//     const data = await res.json();

//     return Response.json(data);
//   } catch (error) {
//     console.log(error);

//     return Response.json([], { status: 500 });
//   }
// }
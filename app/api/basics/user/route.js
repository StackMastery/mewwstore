import { userIn } from "@/controllers/basics/user";
import { accessKeyValidate } from "@/lib/accessKeyValidator";
import { decode } from "next-auth/jwt";

export async function POST(request) {
  const body = await request.json(); // <-- read body

  // if (!accessKeyValidate) {
  //   return Response.json({ error: "Unauthorized" });
  // }

  if (!body?.token) {
    const user = await userIn();
    return Response.json(user);
  }
  const decoded = await decode({
    token: body?.token,
    secret: process.env.NEXTAUTH_SECRET,
  });
  console.log(decoded);
}

import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";
import getCustomersFromHubspot from "@/actions/getCustomersFromHubspot";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  if (currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  // const customer = await prisma.user.findMany({
  //   where: { role: "USER" },
  // });
  const customers = await getCustomersFromHubspot();
  return NextResponse.json(customers);
}

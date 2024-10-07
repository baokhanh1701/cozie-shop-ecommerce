import getCurrentUser from "@/actions/getCurrentUser";
import getCustomersFromHubspot from "@/actions/getCustomersFromHubspot";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const customers = await getCustomersFromHubspot();
  return NextResponse.json(customers);
}

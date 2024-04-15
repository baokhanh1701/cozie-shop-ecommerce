import syncProducts from "@/actions/SyncProducts";
import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
    await syncProducts()
    return NextResponse.json("End of request")
}

import { NextResponse } from "next/server";
import { prisma } from "@/configs/prisma";

// 1. GET: Admin fetches all orders
export async function GET(
  request: Request,
  { params }: { params: Promise<{ store: string }> },
) {
  try {
    const { store } = await params;

    const shop = await prisma.store.findUnique({
      where: {
        slug: store,
      },
    });

    if (!shop) {
      return NextResponse.json({ error: "Invalid store" }, { status: 400 });
    }
    const orders = await prisma.order.findMany({
      where: {
        store_id: shop.id,
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 },
    );
  }
}

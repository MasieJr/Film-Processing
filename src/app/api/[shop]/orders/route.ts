import { NextResponse } from "next/server";
import { prisma } from "@/configs/prisma";

// 1. GET: Admin fetches all orders
export async function GET(
  request: Request,
  { params }: { params: Promise<{ shop: string }> },
) {
  try {
    const { shop } = await params;

    const store = await prisma.store.findUnique({
      where: {
        slug: shop,
      },
    });

    if (!store) {
      return NextResponse.json({ error: "Invalid store" }, { status: 400 });
    }
    const orders = await prisma.order.findMany({
      where: {
        store_id: store.id,
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

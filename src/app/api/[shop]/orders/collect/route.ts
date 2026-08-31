import { NextResponse } from "next/server";
import { prisma } from "@/configs/prisma";

export async function PATCH(
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
    const orders = await prisma.order.updateMany({
      where: {
        status: "Waiting",
      },
      data: {
        status: "Collected",
      },
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

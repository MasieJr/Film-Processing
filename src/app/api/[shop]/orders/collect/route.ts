import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL as string });

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

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

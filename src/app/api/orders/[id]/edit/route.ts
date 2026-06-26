import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL as string });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const body = await request.json();
  const { id: orderId } = await params;

  try {
    const updated = await prisma.order.update({
      where: { id: orderId, status: "Pending" },
      data: {
        customerName: body.customerName,
        email: body.email,
        phone: body.phone,
        status: body.status ? "Completed" : "Pending",
      },
    });
    return NextResponse.json(updated);
  } catch (error: any) {
    if (error.code === "P2025") {
      const safeUpdate = await prisma.order.update({
        where: { id: orderId },
        data: {
          customerName: body.customerName,
          email: body.email,
          phone: body.phone,
        },
      });
      return NextResponse.json(safeUpdate);
    }

    console.error("API Update Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

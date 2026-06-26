import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL as string });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const body = await request.json();
  const resolvedParams = await params;
  const orderId = resolvedParams.id;

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
  } catch (error) {
    // If P2025 (Record not found), it means status was NOT Pending.
    // Perform a 'Safe Update' that ignores status changes.
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
}

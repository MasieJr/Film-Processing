import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL as string });

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Missing Email Address" }, { status: 400 });
    }

    
    const orders = await prisma.order.findMany({
      where: { 
        email: email.trim().toLowerCase() 
      },
      orderBy: {
        createdAt: 'desc' 
      },
      select: {
        id: true,
        customerName: true,
        services: true,
        status: true,
        createdAt: true,
      }
    });

    
    if (orders.length === 0) {
      return NextResponse.json({ error: "No orders found for this email address." }, { status: 404 });
    }

    return NextResponse.json(orders);

  } catch (error) {
    console.error("Tracking API Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
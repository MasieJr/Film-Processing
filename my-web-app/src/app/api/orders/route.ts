import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";


const pool = new Pool({ connectionString: process.env.DATABASE_URL as string });

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

// 1. GET: Admin fetches all orders
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' } 
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

// 2. POST: Customer submits a new order
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9\s\-()]{10,15}$/;
    if (!body.email || !emailRegex.test(body.email)) {
      return NextResponse.json({ error: "Invalid email address provided" }, { status: 400 });
    }

    if (!body.phone || !phoneRegex.test(body.phone)) {
      return NextResponse.json({ error: "Invalid phone number provided" }, { status: 400 });
    }

    const chosenService = body.selectedService || "";
  
    const isPrintingService = chosenService.toLowerCase().includes("print");

    const newOrder = await prisma.order.create({
      data: {
        customerName: body.customerName,
        email: body.email.trim(),
        phone: body.phone.trim(),
        quantity: parseInt(body.quantity),
        salesPerson: body.salesPerson,
        services: body.services,
        selectedSize: isPrintingService ? (body.selectedSize || null) : null,
        selectedFinish: isPrintingService ? (body.selectedFinish || null) : null,
        // selectedSize: body.selectedSize || null,
        // selectedFinish: body.selectedFinish || null,
        keepNegatives: body.keepNegatives || false,
        totalPrice:parseFloat(body.totalPrice),
      }
    });

    return NextResponse.json({ success: true, order: newOrder });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
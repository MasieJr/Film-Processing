import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL as string });

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // 1. Fetch the order FIRST to make sure it's valid
    const order = await prisma.order.findUnique({
      where: { id: id },
      select: { fileUrl: true, status: true },
    });

    // 2. If no order, or no file attached, gracefully redirect to home
    if (!order || !order.fileUrl) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (order.status !== "Downloaded") {
      await prisma.order.update({
        where: { id: id },
        data: { status: "Downloaded" },
      });
    }
    const redirectUrl = `https://pub-2211504cc3954264949ef6ba81981173.r2.dev/${order.fileUrl}`;
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error("Download Route Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

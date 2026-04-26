import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { Resend } from "resend"; // 1. Import Resend

const pool = new Pool({ connectionString: process.env.DATABASE_URL as string });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// 2. Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    const body = await request.json();
    const resolvedParams = await params;
    const orderId = resolvedParams.id;

    // 1. Update the database (This also grabs the customer's email and name!)
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        fileUrl: body.fileUrl,
        status: "Completed", // Optional: Auto-move them to the Completed tab!
      },
    });

    // 2. SEND THE AUTOMATED EMAIL
    if (body.fileUrl) {
      // Construct the download link using your Cloudflare Public URL
      // Replace this URL with your actual r2.dev subdomain!
      const downloadLink = `https://pub-2211504cc3954264949ef6ba81981173.r2.dev/${body.fileUrl}`;

      await resend.emails.send({
        // Use 'onboarding@resend.dev' for testing, update to your domain later
        from: "Film Lab <onboarding@resend.dev>", 
        to: updatedOrder.email, // Sends directly to the customer
        subject: `Your film scans are ready! 🎞️ (Order #${updatedOrder.id.slice(-4)})`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Hi ${updatedOrder.customerName},</h2>
            <p>Great news! Your film has been successfully processed and your high-resolution scans are ready for download.</p>
            
            <div style="margin: 30px 0;">
              <a href="${downloadLink}" style="background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
                Download Your Scans (.zip)
              </a>
            </div>
            
            <p><strong>Note:</strong> This link will expire, so please download your files to a safe location as soon as possible.</p>
            <p>Thanks for choosing our lab!</p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error("Database Update Error:", error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
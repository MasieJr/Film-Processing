import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { Resend} from "resend";


const pool = new Pool({ connectionString: process.env.DATABASE_URL as string });

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

const resend = new Resend(process.env.RESEND_API_KEY);

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

    await resend.emails.send({
  from: "Foto First Cresta <film@masieseremu.co.za>",
  to: body.email, // Or whatever variable holds the customer's email
  subject: "Thank you for submitting your film! 🎞️",
  html: `
    <table border="0" width="100%" cellpadding="0" cellspacing="0" role="presentation" align="center">
      <tbody>
        <tr>
          <td style="font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;font-size:1em;min-height:100%;line-height:155%;background-color:#ffffff">
            <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;align:center;width:100%;color:#000000;background-color:#ffffff;padding-top:20px;padding-right:20px;padding-bottom:20px;padding-left:20px;border-radius:20px;border-color:#000000;line-height:155%">
              <tbody>
                <tr style="width:100%">
                  <td>
                    <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          <td align="center" data-id="__react-email-column">
                            <img alt='The words "FOTO FIRST" are displayed in large, bold, blue letters with a green outline and a 3D effect.' src="https://resend-attachments.s3.amazonaws.com/0b878869-9789-42b5-a88b-64b270ac9628" style="display:block;outline:none;border:none;text-decoration:none;max-width:100%;border-radius:8px" width="100" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <p style="margin:0;padding:0;font-size:18px;padding-top:0.5em;padding-bottom:0.5em">
                      <strong>Good day </strong><strong>${body.customerName}</strong>
                    </p>
                    <p style="margin:0;padding:0;font-size:18px;padding-top:0.5em;padding-bottom:0.5em">
                      Thank You for submitting your film with us.
                    </p>
                    <p style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                      <br />
                    </p>
                    <p style="margin:0;padding:0;font-size:18px;padding-top:0.5em;padding-bottom:0.5em">
                      Please note it takes <span style="color:#ff0000">7 Days</span> to process the film unless stated otherwise. Please ask the sales Person for an <span style="color:#ff0000">ESTIMATE TURNAROUND</span>.
                    </p>
                    <p style="margin:0;padding:0;font-size:18px;padding-top:0.5em;padding-bottom:0.5em">
                      You have selected to have your film ${body.services}.
                    </p>
                    <p style="margin:0;padding:0;font-size:18px;padding-top:0.5em;padding-bottom:0.5em">
                      The total cost of your order is R${body.totalPrice}
                    </p>
                    <p style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                      <br />
                    </p>
                    <p style="margin:0;padding:0;font-size:18px;padding-top:0.5em;padding-bottom:0.5em">
                      Feel free to contact us if you have any questions.
                    </p>
                    <p style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                      <br />
                    </p>
                    <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          <td align="center" data-id="__react-email-column">
                            <img alt='Logo for Foto First, a photographic and digital printing company, with the tagline "Welcome to the Bigger Picture."' src="https://resend-attachments.s3.amazonaws.com/4031321f-3326-43de-895b-7877edab88c4" style="display:block;outline:none;border:none;text-decoration:none;max-width:100%;border-radius:8px" width="100%" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <p style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                      <br />
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  `
});

    return NextResponse.json({ success: true, order: newOrder });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
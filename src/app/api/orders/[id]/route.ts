import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { Resend } from "resend";

const pool = new Pool({ connectionString: process.env.DATABASE_URL as string });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const resend = new Resend(process.env.RESEND_API_KEY);

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const body = await request.json();
    const resolvedParams = await params;
    const orderId = resolvedParams.id;

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        fileUrl: body.fileUrl,
        status: body.status,
      },
    });

    if (body.fileUrl) {
      // const downloadLink = `https://pub-2211504cc3954264949ef6ba81981173.r2.dev/${body.fileUrl}`;
      const downloadLink = `${process.env.NEXT_PUBLIC_BASE_URL}/api/download/${orderId}`;

      await resend.emails.send({
        from: "Foto First Cresta <film@masieseremu.co.za>",
        to: updatedOrder.email,
        subject: "Your photos are ready to download! 🎞️",
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
                            <img alt='The words "FOTO FIRST" are displayed in large, bold, blue letters with a green outline and a 3D effect.' src="${process.env.NEXT_PUBLIC_BASE_URL}/icon.png" style="display:block;outline:none;border:none;text-decoration:none;max-width:100%;border-radius:8px" width="100" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <p style="margin:0;padding:0;font-size:18px;padding-top:0.5em;padding-bottom:0.5em">
                      <strong>Good day </strong><strong>${updatedOrder.customerName}</strong>
                    </p>
                    <p style="margin:0;padding:0;font-size:18px;padding-top:0.5em;padding-bottom:0.5em">
                      Great news. Your order is ready to be downloaded.
                    </p>
                    <p style="margin:0;padding:0;font-size:18px;padding-top:0.5em;padding-bottom:0.5em">
                      Please note the download link is available for <span style="color:#ff0000">7 Days</span>. Please download it as soon as possible.
                    </p>
                    <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          <td align="center" data-id="__react-email-column">
                            
                            <a class="button" href="${downloadLink}" style="line-height:100%;text-decoration:none;display:inline-block;max-width:100%;mso-padding-alt:0px;margin:0;padding:0;background-color:#10a400;color:#ffffff;border-radius:10px;padding-top:15px;padding-right:15px;padding-bottom:15px;padding-left:15px;font-weight:800;font-size:25px" target="_blank">
                              <span></span>
                              <span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:11.25px">Download Files</span>
                              <span></span>
                            </a>
                            
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <p style="margin:0;padding:0;font-size:18px;padding-top:0.5em;padding-bottom:0.5em">
                      <br />
                    </p>
                    <p style="margin:0;padding:0;font-size:19px;padding-top:0.5em;padding-bottom:0.5em">
                      Thank You for choosing Foto First Cresta to develop your Film.
                    </p>
                    <p class="node-paragraph" style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                      <br />
                    </p>
                    <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          <td align="center" data-id="__react-email-column">
                            <img alt='Logo for Foto First, a photographic and digital printing company, with the tagline "Welcome to the Bigger Picture."' src="${process.env.NEXT_PUBLIC_BASE_URL}/banner.jpg" style="display:block;outline:none;border:none;text-decoration:none;max-width:100%;border-radius:8px" width="100%" />
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
  `,
      });
    }

    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error("Database Update Error:", error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 },
    );
  }
}

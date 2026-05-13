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
        uploadedAt: new Date(),
      },
    });

    if (body.fileUrl) {
      // const downloadLink = `https://pub-2211504cc3954264949ef6ba81981173.r2.dev/${body.fileUrl}`;
      const downloadLink = `${process.env.NEXT_PUBLIC_BASE_URL}/download/${orderId}`;

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
                        <img alt='Foto First Icon' src="${process.env.NEXT_PUBLIC_BASE_URL}/icon.png" style="display:block;outline:none;border:none;text-decoration:none;max-width:100%;border-radius:8px" width="100" />
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
                <p style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                  <br />
                </p>
                
                <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                  <tbody style="width:100%">
                    <tr style="width:100%">
                      <td align="center" data-id="__react-email-column">
                        <a href="${downloadLink}" style="background-color:#10a400; border-radius:10px; color:#ffffff; display:inline-block; font-family:-apple-system, BlinkMacSystemFont, sans-serif; font-size:22px; font-weight:bold; line-height:55px; text-align:center; text-decoration:none; width:280px; -webkit-text-size-adjust:none;" target="_blank">
                          Download Files
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <p style="margin:0;padding:0;font-size:14px;padding-top:1.5em;padding-bottom:0.5em;color:#666666;text-align:center;">
                  If the button above doesn't work, copy and paste this link into your browser:<br/>
                  <a href="${downloadLink}" style="color:#10a400;word-break:break-all;">${downloadLink}</a>
                </p>
                
                <p style="margin:0;padding:0;font-size:18px;padding-top:0.5em;padding-bottom:0.5em">
                  <br />
                </p>
                <p style="margin:0;padding:0;font-size:19px;padding-top:0.5em;padding-bottom:0.5em">
                  Thank You for choosing Foto First Cresta to develop your Film.
                </p>
                <p style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                  <br />
                </p>
                
                <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                  <tbody style="width:100%">
                    <tr style="width:100%">
                      <td align="center" data-id="__react-email-column">
                        <img alt='Welcome to the Bigger Picture' src="${process.env.NEXT_PUBLIC_BASE_URL}/banner.jpg" style="display:block;outline:none;border:none;text-decoration:none;max-width:100%;border-radius:8px" width="100%" />
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
export async function POST(
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

    if (body.type === "Print") {
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
                        <img alt='Foto First Icon' src="${process.env.NEXT_PUBLIC_BASE_URL}/icon.png" style="display:block;outline:none;border:none;text-decoration:none;max-width:100%;border-radius:8px" width="100" />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p style="margin:0;padding:0;font-size:18px;padding-top:0.5em;padding-bottom:0.5em">
                  <strong>Good day </strong><strong>${body.customerName}</strong>
                </p>
                <p style="margin:0;padding:0;font-size:18px;padding-top:0.5em;padding-bottom:0.5em">
                  Great news! Your film has been processed and your physical prints are ready for collection.
                </p>
                <p style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                  <br />
                </p>
                <p style="margin:0;padding:0;font-size:18px;padding-top:0.5em;padding-bottom:0.5em">
                  You can pop into <strong>Foto First Cresta</strong> at your earliest convenience to pick them up. Just provide your name at the counter.
                </p>
                <p style="margin:0;padding:0;font-size:18px;padding-top:0.5em;padding-bottom:0.5em">
                  You selected: ${body.services}.
                </p>
                <p style="margin:0;padding:0;font-size:18px;padding-top:0.5em;padding-bottom:0.5em">
                  The total cost of your order is R${body.totalPrice}
                </p>
                <p style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                  <br />
                </p>
                <p style="margin:0;padding:0;font-size:18px;padding-top:0.5em;padding-bottom:0.5em">
                  We look forward to seeing you in-store soon!
                </p>
                <p style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                  <br />
                </p>
                <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                  <tbody style="width:100%">
                    <tr style="width:100%">
                      <td align="center" data-id="__react-email-column">
                        <img alt='Foto First Banner' src="${process.env.NEXT_PUBLIC_BASE_URL}/banner.jpg" style="display:block;outline:none;border:none;text-decoration:none;max-width:100%;border-radius:8px" width="100%" />
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

    if (body.type === "Blank") {
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
                        <img alt='Foto First Icon' src="${process.env.NEXT_PUBLIC_BASE_URL}/icon.png" style="display:block;outline:none;border:none;text-decoration:none;max-width:100%;border-radius:8px" width="100" />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p style="margin:0;padding:0;font-size:18px;padding-top:0.5em;padding-bottom:0.5em">
                  <strong>Good day </strong><strong>${body.customerName}</strong>
                </p>
                <p style="margin:0;padding:0;font-size:18px;padding-top:0.5em;padding-bottom:0.5em">
                  We have finished processing your recent film order, but unfortunately, we have some bad news.
                </p>
                <p style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                  <br />
                </p>
                <p style="margin:0;padding:0;font-size:18px;padding-top:0.5em;padding-bottom:0.5em">
                  During development, we discovered that <span style="color:#ff0000;font-weight:bold;">${body.blankCount} of your rolls</span> came out completely blank.
                </p>
                <p style="margin:0;padding:0;font-size:18px;padding-top:0.5em;padding-bottom:0.5em">
                  Blank film is usually caused by the film not catching properly on the camera's take-up spool, meaning it never advanced through the camera while you were shooting. It can also be caused by a faulty shutter or severely expired film.
                </p>
                <p style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                  <br />
                </p>
                <p style="margin:0;padding:0;font-size:18px;padding-top:0.5em;padding-bottom:0.5em">
                  Please feel free to bring your camera into Foto First Cresta! Our lab technicians would be more than happy to inspect it and show you how to safely load your next roll to ensure this doesn't happen again.
                </p>
                <p style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                  <br />
                </p>
                <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                  <tbody style="width:100%">
                    <tr style="width:100%">
                      <td align="center" data-id="__react-email-column">
                        <img alt='Foto First Banner' src="${process.env.NEXT_PUBLIC_BASE_URL}/banner.jpg" style="display:block;outline:none;border:none;text-decoration:none;max-width:100%;border-radius:8px" width="100%" />
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

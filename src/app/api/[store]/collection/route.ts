import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import puppeteer from "puppeteer";

import { prisma } from "@/configs/prisma";
import { S3 } from "@/configs/cloudflare";

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ store: string }> },
) {
  let browser;

  try {
    const { store } = await params;

    // 1. Find shop
    const shop = await prisma.store.findUnique({
      where: { slug: store },
    });

    if (!shop) {
      return NextResponse.json({ error: "Invalid store" }, { status: 400 });
    }

    // 2. Fetch orders waiting for collection
    const orders = await prisma.order.findMany({
      where: {
        store_id: shop.id,
        status: "Waiting",
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (orders.length === 0) {
      return NextResponse.json(
        { error: "There are no orders waiting for collection." },
        { status: 400 },
      );
    }

    const orderIds = orders.map((order) => order.id);

    // 3. Prepare Template Variables
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-ZA", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    const formattedTime = now.toLocaleTimeString("en-ZA", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const shopName =
      shop.name || store.charAt(0).toUpperCase() + store.slice(1);

    const rows = orders
      .map(
        (order, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${escapeHtml(order.id)}</td>
            <td>${escapeHtml(order.customerName || "Walk-in Customer")}</td>
            <td>${escapeHtml(order.services || "-")}</td>
            <td class="center">${order.quantity ?? 1}</td>
            <td class="check"></td>
          </tr>
        `,
      )
      .join("");

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          * { box-sizing: border-box; }
          body {
            font-family: Arial, Helvetica, sans-serif;
            color: #111;
            margin: 0;
            padding: 35px;
            font-size: 12px;
          }
          .header {
            display: flex;
            justify-content: space-between;
            border-bottom: 2px solid #111;
            padding-bottom: 18px;
            margin-bottom: 25px;
          }
          .brand { font-size: 28px; font-weight: bold; }
          .title { font-size: 18px; font-weight: bold; margin-top: 5px; }
          .details { text-align: right; line-height: 1.7; }
          .summary { margin-bottom: 20px; }
          .summary strong { font-size: 16px; }
          .note { color: #666; margin-top: 5px; }
          table { width: 100%; border-collapse: collapse; }
          thead { display: table-header-group; }
          tr { page-break-inside: avoid; }
          th {
            text-align: left;
            border-top: 2px solid #111;
            border-bottom: 2px solid #111;
            padding: 10px 7px;
          }
          td {
            border-bottom: 1px solid #ccc;
            padding: 13px 7px;
          }
          .center { text-align: center; }
          .check { width: 18px; height: 18px; border: 2px solid #111; }
          .footer-section {
            margin-top: 40px;
            border-top: 2px solid #111;
            padding-top: 20px;
            page-break-inside: avoid;
          }
          .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin-top: 25px;
          }
          .label { font-weight: bold; margin-bottom: 7px; }
          .line { height: 25px; border-bottom: 1px solid #111; }
          .footer {
            text-align: center;
            color: #777;
            font-size: 9px;
            margin-top: 35px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="brand">FOTO FIRST</div>
            <div class="title">Driver Collection List</div>
          </div>
          <div class="details">
            <div><strong>Branch:</strong> ${escapeHtml(shopName)}</div>
            <div><strong>Date:</strong> ${formattedDate}</div>
            <div><strong>Time:</strong> ${formattedTime}</div>
          </div>
        </div>

        <div class="summary">
          <strong>Total Orders: ${orders.length}</strong>
          <div class="note">Please verify each order when collecting from the branch.</div>
        </div>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Order</th>
              <th>Customer</th>
              <th>Service</th>
              <th>Qty</th>
              <th>✓</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>

        <div class="footer-section">
          <div class="grid">
            <div>
              <div class="label">Driver</div>
              <div class="line"></div>
            </div>
            <div>
              <div class="label">Branch Staff</div>
              <div class="line"></div>
            </div>
          </div>
          <div class="grid">
            <div>
              <div class="label">Driver Signature</div>
              <div class="line"></div>
            </div>
            <div>
              <div class="label">Collection Time</div>
              <div class="line"></div>
            </div>
          </div>
        </div>

        <div class="footer">
          Foto First Film Processing — Driver Collection Manifest
        </div>
      </body>
      </html>
    `;

    // 4. Render PDF with Puppeteer
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "domcontentloaded" });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "15mm",
        right: "15mm",
        bottom: "15mm",
        left: "15mm",
      },
    });

    await browser.close();
    browser = null;

    // 5. Upload PDF to Cloudflare R2
    const fileKey = `${store}/${formattedDate}.pdf`;

    await S3.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME_COL,
        Key: fileKey,
        Body: pdf,
        ContentType: "application/pdf",
        Metadata: {
          shop: store,
          orderCount: String(orders.length),
        },
      }),
    );

    // 6. Generate GET Presigned URL
    const getCommand = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME_COL,
      Key: fileKey,
    });

    const downloadUrl = await getSignedUrl(S3, getCommand, {
      expiresIn: 3600,
    });

    const newBatch = await prisma.collection.create({
      data: {
        store_id: shop.id,
        pdfUrl: downloadUrl,
      },
    });

    // 7. Atomic update for targeted orders
    await prisma.order.updateMany({
      where: {
        id: { in: orderIds },
      },
      data: {
        status: "Collected",
      },
    });

    return NextResponse.json({
      success: true,
      pdfUrl: downloadUrl,
      fileKey,
      orderCount: orders.length,
      orderIds,
    });
  } catch (error) {
    console.error("Collection PDF Error:", error);

    if (browser) {
      await browser.close().catch(() => {});
    }

    return NextResponse.json(
      { error: "Failed to create collection PDF." },
      { status: 500 },
    );
  }
}

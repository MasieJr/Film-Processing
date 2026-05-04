import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

const S3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY as string,
  },
});

const formatDate = (rawDate: Date | string) => {
  if (!rawDate) return "Unknown Date";

  const safeDateString =
    typeof rawDate === "string" ? rawDate.replace(" ", "T") : rawDate;
  const dateObj = new Date(safeDateString);

  if (isNaN(dateObj.getTime())) return "Invalid Date";

  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = dateObj.toLocaleString("en-GB", { month: "short" });
  const year = dateObj.getFullYear();

  return `${day}-${month}-${year}`;
};

export async function POST(request: Request) {
  try {
    const { filename, contentType, customerName, createdAt } =
      await request.json();

    // 1. Clean the filename and add a timestamp so files never overwrite each other
    const cleanFileName = filename.replace(/\s+/g, "-").toLowerCase();
    const uniqueFilename = `${customerName}-${formatDate(createdAt)}-${cleanFileName}`;

    // 2. Create the command to put a file in your bucket
    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: uniqueFilename,
      ContentType: contentType,
    });

    const signedUrl = await getSignedUrl(S3, command, { expiresIn: 3600 });

    return NextResponse.json({
      uploadUrl: signedUrl,
      finalFileKey: uniqueFilename,
    });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return NextResponse.json(
      { error: "Failed to create upload URL" },
      { status: 500 },
    );
  }
}

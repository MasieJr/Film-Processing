import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

// Initialize the S3 client to point at Cloudflare R2
const S3 = new S3Client({
  region: "auto", // R2 always uses "auto"
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY as string,
  },
});

export async function POST(request: Request) {
  try {
    const { filename, contentType } = await request.json();

    // 1. Clean the filename and add a timestamp so files never overwrite each other
    const cleanFileName = filename.replace(/\s+/g, '-').toLowerCase();
    const uniqueFilename = `${Date.now()}-${cleanFileName}`;

    // 2. Create the command to put a file in your bucket
    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: uniqueFilename,
      ContentType: contentType,
    });

    // 3. Generate the signed URL (expires in 1 hour)
    const signedUrl = await getSignedUrl(S3, command, { expiresIn: 3600 });

    // 4. Send the URL back to the frontend
    // (Also send back the final public URL so we can save it to Prisma later)
    return NextResponse.json({ 
      uploadUrl: signedUrl, 
      finalFileKey: uniqueFilename 
    });

  } catch (error) {
    console.error("Error generating signed URL:", error);
    return NextResponse.json({ error: "Failed to create upload URL" }, { status: 500 });
  }
}
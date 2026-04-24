import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const orderData = await request.json();
const rawKey = process.env.GOOGLE_PRIVATE_KEY || "";
    const formattedKey = rawKey.replace(/"/g, '').replace(/\\n/g, '\n');

    // 1. Authenticate with your Service Account JSON
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        // private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        private_key: formattedKey,
      },
      scopes: [
        "https://www.googleapis.com/auth/documents",
        "https://www.googleapis.com/auth/drive",
      ],
    });

    const docs = google.docs({ version: "v1", auth });
    const drive = google.drive({ version: "v3", auth });

    const TEMPLATE_ID = "1PjxV0VYzOxLqdujIwJ2ALNqQUqyH6nmLzG3izycEWHU";

    // 2. Make a copy of the template
    const copyResponse = await drive.files.copy({
      fileId: TEMPLATE_ID,
      requestBody: {
        name: `Work Order - ${orderData.id}`,
        parents:["1I9naC4rHBzCuXK7j4ogMQGhtF68aQVNX"],
      },
    });
    
    const newDocumentId = copyResponse.data.id;
    if (!newDocumentId) {
      throw new Error("Failed to create a copy of the Google Doc. ID returned null.");
    }

    // 3. Find and Replace the tags in the new document
    await docs.documents.batchUpdate({
      documentId: newDocumentId,
      requestBody: {
        requests: [
          {
            replaceAllText: {
              containsText: { text: "{{Timestamp}}", matchCase: true },
              replaceText: orderData.id,
            },
          },
          {
            replaceAllText: {
              containsText: { text: "{{Name and Surname}}", matchCase: true },
              replaceText: orderData.name,
            },
          },
          {
            replaceAllText: {
              containsText: { text: "{{Quantity}}", matchCase: true },
              replaceText: orderData.price.toString(),
            },
          }
        ],
      },
    });

    // 4. (Optional) Export the new Doc as a PDF
    // Return the link to the generated document!
    return NextResponse.json({ 
      success: true, 
      documentUrl: `https://docs.google.com/document/d/${newDocumentId}` 
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to generate document" }, { status: 500 });
  }
}
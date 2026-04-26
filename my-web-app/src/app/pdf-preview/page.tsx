"use client";

import OrderPdfTemplate from "@/components/OrderPdfTemplate";

export default function PdfPreviewPage() {
  // We provide mock data so you can see exactly how it looks when filled out
  const mockOrder = {
    id: "ORD-999",
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "082 123 4567",
    quantity: 3,
    service: "Print and email",
    selectedSize: "10x15 cm",
    selectedFinish: "Matte",
    keepNegatives: true,
    price: 987,
    status: "Pending",
    date: new Date().toLocaleDateString(),
  };

  return (
    // The dark background acts like a "desk" so you can easily see the white paper edges
    <div className="min-h-screen bg-neutral-800 p-8 flex justify-center overflow-auto pb-24">
      <div className="shadow-2xl">
        <OrderPdfTemplate order={mockOrder} />
      </div>
    </div>
  );
}

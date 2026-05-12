import { notFound } from "next/navigation";
import { Download, Film, Printer, CheckCircle, Camera } from "lucide-react";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL as string });

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

export default async function DownloadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id: id },
    select: {
      customerName: true,
      services: true,
      fileUrl: true,
      status: true,
      createdAt: true,
    },
  });

  if (!order || !order.fileUrl) {
    notFound();
  }

  const downloadLink = `/api/download/${id}`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#121212] py-12 px-4 sm:px-6 flex flex-col items-center">
      <div className="w-full max-w-xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center justify-center mx-auto mb-4">
            <Camera className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Your Scans are Ready!
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Hi {order.customerName}, your {order.services} order is complete.
          </p>
        </div>

        <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 text-center space-y-6">
          <div className="flex justify-center">
            <div className="bg-[#41B544]/10 w-20 h-20 rounded-full flex items-center justify-center">
              <CheckCircle className="text-[#41B544] w-10 h-10" />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              High-Resolution .ZIP
            </h2>
            <p className="text-sm text-gray-500">
              Link expires 7 days after delivery. Please download to a secure
              computer.
            </p>
          </div>

          <a
            href={downloadLink}
            className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-[#41B544] hover:bg-[#359638] text-white rounded-xl font-bold text-lg transition-all active:scale-95 shadow-lg shadow-[#41B544]/20"
          >
            <Download className="w-6 h-6" />
            Download Files Now
          </a>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider text-center">
            Next Steps at Foto First
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="mailto:info@fotofirstcresta.co.za?subject=Print Order"
              className="group block bg-white dark:bg-[#1e1e1e] p-5 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors shadow-sm"
            >
              <Printer className="w-8 h-8 text-blue-500 mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                Print Your Favorites
              </h4>
              <p className="text-xs text-gray-500">
                Get 10% off physical prints when you order this week. Reply to
                your email to order.
              </p>
            </a>

            <div className="group block bg-white dark:bg-[#1e1e1e] p-5 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-orange-500 dark:hover:border-orange-500 transition-colors shadow-sm cursor-pointer">
              <Film className="w-8 h-8 text-orange-500 mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                Stock Up on Film
              </h4>
              <p className="text-xs text-gray-500">
                Running low? Pop into the lab. We have fresh Kodak and Ilford
                stock ready to shoot.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

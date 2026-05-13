import { notFound } from "next/navigation";
import {
  Download,
  CheckCircle,
  Camera,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import Image from "next/image";

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
      uploadedAt: true,
    },
  });

  if (!order || !order.fileUrl || !order.uploadedAt) {
    notFound();
  }

  const EXPIRATION_DAYS = 7;

  const expirationDate = new Date(
    order.uploadedAt.getTime() + EXPIRATION_DAYS * 24 * 60 * 60 * 1000,
  );
  const currentDate = new Date();

  const timeRemainingMs = expirationDate.getTime() - currentDate.getTime();

  const isExpired = timeRemainingMs <= 0;

  const daysRemaining = Math.floor(timeRemainingMs / (1000 * 60 * 60 * 24));
  const hoursRemaining = Math.floor((timeRemainingMs / (1000 * 60 * 60)) % 24);

  const downloadLink = `/api/download/${id}`;

  return (
    <div className="min-h-screen bg-white dark:bg-[#1e1e1e] py-12 px-4 sm:px-6 flex flex-col items-center">
      <div className="w-full max-w-xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#41B544]/10 mb-6 ">
            <Image
              src="/icon.png"
              alt="Company Logo"
              loading="eager"
              width={632}
              height={127}
              className="rounded-full min-w-full"
            />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {isExpired ? "Link Expired" : "Your Scans are Ready!"}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Hi {order.customerName}, your order is{" "}
            {isExpired ? "no longer available online." : "complete."}
          </p>
        </div>

        <div className="bg-[#F3F4F6] dark:bg-[#2c2c2c] p-8 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-[#41B544] text-center space-y-6">
          {isExpired ? (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="bg-red-100 dark:bg-red-900/20 w-20 h-20 rounded-full flex items-center justify-center">
                  <AlertTriangle className="text-red-500 w-10 h-10" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  Link Expired
                </h2>
                <p className="text-sm text-gray-500 px-4">
                  Your Link has Expired please contact us to request a new link
                  to download your files
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-center">
                <div className="bg-[#41B544]/10 w-20 h-20 rounded-full flex items-center justify-center">
                  <CheckCircle className="text-[#41B544] w-10 h-10" />
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  Download Files
                </h2>

                <div className="flex items-center justify-center gap-2 text-sm font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/10 py-2 px-4 rounded-full mt-3 w-fit mx-auto">
                  <Clock className="w-4 h-4" />
                  Expires in: {daysRemaining} days, {hoursRemaining} hrs,
                </div>
              </div>

              <a
                href={downloadLink}
                className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-[#41B544] hover:bg-[#359638] text-white rounded-xl font-bold text-lg transition-all active:scale-95 shadow-lg shadow-[#41B544]/20"
              >
                <Download className="w-6 h-6" />
                Download Files Now
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

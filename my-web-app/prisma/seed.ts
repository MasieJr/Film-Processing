// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import * as dotenv from "dotenv";

// 1. Force the script to read both environment files just to be safe!
dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local' });

// 2. Setup Prisma 7 connection
const pool = new Pool({ connectionString: process.env.DATABASE_URL as string });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// ... (Keep your async function main() exactly as it is below this)
async function main() {
  console.log('Seeding database with dummy orders...');

const dummyOrders = [
    {
      customerName: "Thabo Mbeki",
      email: "thabo.m@example.com",
      phone: "082 123 4567",
      quantity: 2,
      services: "Develop only",
      keepNegatives: true,
      status: "New",
      totalPrice: 190.00,
      salesPerson: "Masie Seremu",
    },
    {
      customerName: "Sarah Jenkins",
      email: "sarahj@example.com",
      phone: "071 987 6543",
      quantity: 1,
      services: "Print and email",
      selectedSize: "10x15 cm",
      selectedFinish: "Matte",
      keepNegatives: true,
      status: "Pending",
      totalPrice: 329.00,
      salesPerson: "Hloni Smith",
    },
    {
      customerName: "Johan van der Merwe",
      email: "johanvdm@example.com",
      phone: "083 456 7890",
      quantity: 3,
      services: "Email in High Resolution",
      keepNegatives: false,
      status: "Completed",
      totalPrice: 780.00,
      salesPerson: "Nithian Chetty",
    },
    {
      customerName: "Lerato Ndlovu",
      email: "lerato.n@example.com",
      phone: "079 321 0987",
      quantity: 1,
      services: "Print Only",
      selectedSize: "13x18 cm",
      selectedFinish: "Glossy",
      keepNegatives: true,
      status: "Completed",
      totalPrice: 895.00,
      salesPerson: "Prudence Ndlovu",
    },
    {
      customerName: "Michael Chen",
      email: "mchen88@example.com",
      phone: "060 555 1234",
      quantity: 5,
      services: "Email in Low Resolution",
      keepNegatives: true,
      status: "Pending",
      totalPrice: 1200.00,
      salesPerson: "Yanga Bululu",
    },
    {
      customerName: "David Smith",
      email: "d.smith.photo@example.com",
      phone: "082 999 8888",
      quantity: 2,
      services: "Print and email",
      selectedSize: "15x20 cm",
      selectedFinish: "Matte",
      keepNegatives: false,
      status: "New",
      totalPrice: 1862.00,
      salesPerson: "Masie Seremu",
    }
  ];

  for (const order of dummyOrders) {
    await prisma.order.create({
      data: order,
    });
  }

  console.log('✅ Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
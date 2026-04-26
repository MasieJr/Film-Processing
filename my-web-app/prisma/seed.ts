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

// --- DATA ARRAYS FOR GENERATOR ---
const firstNames = ["Sipho", "Karabo", "Amina", "Johan", "Pieter", "Zanele", "Lungile", "David", "Sarah", "Michael", "Tshepo", "Bongani", "Fatima", "Claire", "Kagiso"];
const lastNames = ["Mkhize", "Ndlovu", "Botha", "van der Merwe", "Naidoo", "Govender", "Smith", "Williams", "Dlamini", "Nkosi", "Patel", "Jacobs", "Coetzee"];
const servicesList = ["Email in High Resolution", "Email in Low Resolution", "Print Only", "Print and email", "Develop only"];
const sizesList = ["9x13 cm", "10x15 cm", "13x18 cm", "15x20 cm"];
const finishesList = ["Glossy", "Matte"];
const salesPersonsList = ["Masie Seremu", "Nithian Chetty", "Prudence Ndlovu", "Yanga Bululu", "Hloni Smith"];
const statusList = ["New", "Pending", "Completed"];

// Helper function to get a random item from an array
const getRandom = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

async function main() {
  console.log('Clearing old data and generating 50 new orders...');

  // Optional: Clear out the old data first so you have exactly 50 rows
  // await prisma.order.deleteMany({});

  const generatedOrders = [];

  for (let i = 0; i < 50; i++) {
    const fName = getRandom(firstNames);
    const lName = getRandom(lastNames);
    const service = getRandom(servicesList);
    
    // Only assign sizes and finishes if it is a printing service
    const needsPrint = service === "Print Only" || service === "Print and email";

    generatedOrders.push({
      customerName: `${fName} ${lName}`,
      email: `${fName.toLowerCase()}.${lName.toLowerCase().replace(/ /g, '')}@example.com`,
      // Generates SA style numbers like: 082 345 6789
      phone: `0${Math.floor(Math.random() * 4) + 6}${Math.floor(Math.random() * 10)} ${Math.floor(100 + Math.random() * 900)} ${Math.floor(1000 + Math.random() * 9000)}`,
      quantity: Math.floor(Math.random() * 5) + 1, // Random number between 1 and 5
      services: service,
      selectedSize: needsPrint ? getRandom(sizesList) : null,
      selectedFinish: needsPrint ? getRandom(finishesList) : null,
      keepNegatives: Math.random() > 0.5, // 50/50 chance of being true
      salesPerson: getRandom(salesPersonsList),
      status: getRandom(statusList),
      totalPrice: Math.floor(Math.random() * 800) + 200, // Random price between 200 and 1000
    });
  }

  // Insert all 50 orders into the database at once using createMany
  await prisma.order.createMany({
    data: generatedOrders,
  });

  console.log('✅ Seeding finished. Added 50 rows!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
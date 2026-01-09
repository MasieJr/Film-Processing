import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // 1. Create Branches
  const cresta = await prisma.branch.create({
    data: {
      name: 'Cresta Branch',
      isHub: true,
      transitDays: 1,
    },
  });

  const sandton = await prisma.branch.create({
    data: {
      name: 'Sandton Branch',
      isHub: false,
      transitDays: 21,
    },
  });

  const rosebank = await prisma.branch.create({
    data: {
      name: 'Rosebank Branch',
      isHub: false,
      transitDays: 21,
    },
  });

  const fourways = await prisma.branch.create({
    data: {
      name: 'Fourways Branch',
      isHub: false,
      transitDays: 21,
    },
  });

  // 2. Create Services (The Menu)
  const services = [
    { name: 'Developing Only', price: 89.00, category: 'COLOR' },
    { name: 'Dev + Scan (Low Res)', price: 218.00, category: 'COLOR' },
    { name: 'Dev + Scan (High Res)', price: 238.00, category: 'COLOR' },
    { name: 'Dev + Print', price: 313.00, category: 'COLOR' },
    { name: 'Print', price: 313.00, category: 'COLOR' },
  ];

  for (const service of services) {
    await prisma.service.create({ data: service });
  }

  console.log('✅ Seeding completed!');
  console.log(`Created 3 Branches and ${services.length} Services.`);
}

main()
  .catch((e) => {
    console.error(e);
    // process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
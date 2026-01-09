import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /services
// Goal: Get the menu of prices
router.get('/', async (req, res) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: {
        price: 'asc', // Sort by price (Lowest to Highest)
      },
    });
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

export default router;
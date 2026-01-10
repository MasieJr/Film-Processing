import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /staff
// Returns only active staff members
router.get('/', async (req, res) => {
  try {
    const staff = await prisma.salesPerson.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' }
    });
    res.json(staff);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch staff' });
  }
});

export default router;
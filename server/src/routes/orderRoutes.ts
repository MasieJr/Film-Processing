import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// POST /orders
// Goal: Receive customer + order details and save everything
router.post('/', async (req, res) => {
  try {
    // 1. Get data from the App/Frontend
    const { firstName, lastName, phone, email, branchId, serviceId, salesPersonId, negatives, quantity } = req.body;

    // 2. Validation (Make sure we have the basics)
    if (!phone || !branchId || !serviceId) {
      res.status(400).json({ error: 'Missing required fields (phone, branchId, serviceId)' });
      return;
    }

    // 3. Fetch the Service Price (To lock it in)
    const service = await prisma.service.findUnique({ where: { id: serviceId } });
    if (!service) {
      res.status(404).json({ error: 'Service not found' });
      return;
    }

    const branch = await prisma.branch.findUnique({ where: {id: branchId}});

    // 4. Calculate Expected Date (e.g., Today + 3 days)
    // In a real app, this logic would check "transitDays" from the Branch table too
    const completionDate = new Date();
    completionDate.setDate(completionDate.getDate() + branch!.transitDays);

    // 5. Create (or Update) the Customer & Create the Order
    // We use "transaction" to ensure both happen, or neither happens.
    const newOrder = await prisma.$transaction(async (tx) => {
      
      // A. Find existing customer by phone, or create new one
      const customer = await tx.customer.upsert({
        where: { phone: phone },
        update: { firstName, lastName, email }, // Update details if they changed
        create: { firstName, lastName, phone, email },
      });

      // B. Create the Order linked to that customer
      return await tx.order.create({
        data: {
          customerId: customer.id,
          branchId: branchId,
          serviceId: serviceId,
          priceAtOrder: service.price, // Locking in the price!
          expectedDate: completionDate,
          salesPersonId: salesPersonId,
          status: 'RECEIVED',
          negatives: negatives,
          quantiy: quantity  // rename later 
        },
      });
    });

    // 6. Send back the receipt
    res.json(newOrder);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

export default router;
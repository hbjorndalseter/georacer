import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'], // Logg spørringer for debugging
  });
  
  process.on('beforeExit', async () => {
    await prisma.$disconnect(); // Lukk Prisma riktig når backend stopper
  });

export default prisma;
// lib/prisma.js
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global;

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient({
    log: ['error', 'warn'],
  });
}

export const prisma = globalForPrisma.prisma;

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
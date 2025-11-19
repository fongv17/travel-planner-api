import pkg from '../generated/prisma/client.js';

const { PrismaClient } = pkg;

const prisma = new PrismaClient();

export default prisma;
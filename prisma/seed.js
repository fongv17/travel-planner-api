import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create an example user
  const user = await prisma.user.create({
    data: {
      name: "Trevor Demo",
      email: "Trevor@demo.com",
      password: "$2b$10$Nd.XzJ1L20del1Ph2iTtWOi3xd/JGZkq1Tu2/7wGWfUhK.LsIXZ6.", // hashed
      
    }
  });

  console.log("Seeded user:", user);

  /*
  const trip = await prisma.trip.create({
    data: {
      name: "Sample Trip",
      startDate: "2025-01-01",
      endDate: "2025-01-10",
      userId: user.id
    }
  });
  */
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

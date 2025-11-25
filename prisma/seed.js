import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create an example user
  const user = await prisma.user.create({
    data: {
      name: "Trevor Demo",
      email: "Trevor@demo.com",
      password: "$2b$10$Nd.XzJ1L20del1Ph2iTtWOi3xd/JGZkq1Tu2/7wGWfUhK.LsIXZ6.", // hashed
      role: "USER",
    },
  });

  console.log("Seeded user:", user);

  // Create a sample trip for this user
  const trip = await prisma.trip.create({
    data: {
      name: "Summer Adventure",
      startDate: "2025-06-01",
      endDate: "2025-06-15",
      traveller: { connect: { id: user.id } },
    },
  });

  console.log("Seeded trip:", trip);

  // Create destinations for the trip
  const paris = await prisma.destination.create({
    data: {
      city: "Paris",
      country: "France",
      arrivalDate: "2025-06-01",
      departureDate: "2025-06-05",
      trip: { connect: { id: trip.id } },
    },
  });

  const rome = await prisma.destination.create({
    data: {
      city: "Rome",
      country: "Italy",
      arrivalDate: "2025-06-06",
      departureDate: "2025-06-15",
      trip: { connect: { id: trip.id } },
    },
  });

  console.log("Seeded destinations:", paris, rome);

  // Add activities
  await prisma.activity.createMany({
    data: [
      {
        title: "Eiffel Tower Tour",
        startTime: "2025-06-02T10:00",
        endTime: "2025-06-02T12:00",
        destinationId: paris.id,
      },
      {
        title: "Louvre Museum Visit",
        startTime: "2025-06-03T14:00",
        endTime: "2025-06-03T17:00",
        destinationId: paris.id,
      },
      {
        title: "Colosseum Tour",
        startTime: "2025-06-07T09:00",
        endTime: "2025-06-07T11:00",
        destinationId: rome.id,
      },
      {
        title: "Vatican Museums",
        startTime: "2025-06-08T10:00",
        endTime: "2025-06-08T13:00",
        destinationId: rome.id,
      },
    ],
  });

  // Add accommodations
  await prisma.accommodation.createMany({
    data: [
      {
        name: "Hotel Parisian",
        type: "Hotel",
        pricePerNight: 150.5,
        destinationId: paris.id,
      },
      {
        name: "Rome Inn",
        type: "Hostel",
        pricePerNight: 80.0,
        destinationId: rome.id,
      },
    ],
  });

  console.log("Seeded activities and accommodations.");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

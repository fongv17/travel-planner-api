import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create an admin user first (using upsert to avoid duplicates)
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@demo.com" },
    update: {
      name: "Admin User",
      password: adminPassword,
      role: "ADMIN",
    },
    create: {
      name: "Admin User",
      email: "admin@demo.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  console.log("Seeded admin:", admin);

  // Create an example user (using upsert to avoid duplicates)
  const userPassword = await bcrypt.hash("test", 10);
  const user = await prisma.user.upsert({
    where: { email: "Trevor@demo.com" },
    update: {
      name: "Trevor Demo",
      password: userPassword,
      role: "USER",
    },
    create: {
      name: "Trevor Demo",
      email: "Trevor@demo.com",
      password: userPassword,
      role: "USER",
    },
  });

  console.log("Seeded user:", user);

  // Create a sample trip for this user
  const trip = await prisma.trip.upsert({
    where: { id: 1 }, // Use a fixed ID for the demo trip
    update: {
      name: "Summer Adventure",
      startDate: "2025-06-01",
      endDate: "2025-06-15",
      userId: user.id,
    },
    create: {
      name: "Summer Adventure",
      startDate: "2025-06-01",
      endDate: "2025-06-15",
      userId: user.id,
    },
  });

  console.log("Seeded trip:", trip);

  // Create destinations for the trip
  const paris = await prisma.destination.upsert({
    where: { id: 1 },
    update: {
      city: "Paris",
      country: "France",
      arrivalDate: "2025-06-01",
      departureDate: "2025-06-05",
      tripId: trip.id,
    },
    create: {
      city: "Paris",
      country: "France",
      arrivalDate: "2025-06-01",
      departureDate: "2025-06-05",
      tripId: trip.id,
    },
  });

  const rome = await prisma.destination.upsert({
    where: { id: 2 },
    update: {
      city: "Rome",
      country: "Italy",
      arrivalDate: "2025-06-06",
      departureDate: "2025-06-15",
      tripId: trip.id,
    },
    create: {
      city: "Rome",
      country: "Italy",
      arrivalDate: "2025-06-06",
      departureDate: "2025-06-15",
      tripId: trip.id,
    },
  });

  console.log("Seeded destinations:", paris, rome);

  // Add activities (using individual upserts for safety)
  const activities = [
    {
      id: 1,
      title: "Eiffel Tower Tour",
      startTime: "2025-06-02T10:00",
      endTime: "2025-06-02T12:00",
      destinationId: paris.id,
    },
    {
      id: 2,
      title: "Louvre Museum Visit",
      startTime: "2025-06-03T14:00",
      endTime: "2025-06-03T17:00",
      destinationId: paris.id,
    },
    {
      id: 3,
      title: "Colosseum Tour",
      startTime: "2025-06-07T09:00",
      endTime: "2025-06-07T11:00",
      destinationId: rome.id,
    },
    {
      id: 4,
      title: "Vatican Museums",
      startTime: "2025-06-08T10:00",
      endTime: "2025-06-08T13:00",
      destinationId: rome.id,
    },
  ];

  for (const activity of activities) {
    await prisma.activity.upsert({
      where: { id: activity.id },
      update: activity,
      create: activity,
    });
  }

  // Add accommodations (using individual upserts for safety)
  const accommodations = [
    {
      id: 1,
      name: "Hotel Parisian",
      type: "Hotel",
      pricePerNight: 150.5,
      destinationId: paris.id,
    },
    {
      id: 2,
      name: "Rome Inn",
      type: "Hostel",
      pricePerNight: 80.0,
      destinationId: rome.id,
    },
  ];

  for (const accommodation of accommodations) {
    await prisma.accommodation.upsert({
      where: { id: accommodation.id },
      update: accommodation,
      create: accommodation,
    });
  }

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

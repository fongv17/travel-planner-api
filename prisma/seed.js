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

  // Add activities (using unique constraints for safety)
  const activities = [
    {
      title: "Eiffel Tower Tour",
      startTime: "10:00",
      endTime: "12:00",
      destinationId: paris.id,
    },
    {
      title: "Louvre Museum Visit",
      startTime: "14:00",
      endTime: "17:00",
      destinationId: paris.id,
    },
    {
      title: "Colosseum Tour",
      startTime: "09:00",
      endTime: "11:00",
      destinationId: rome.id,
    },
    {
      title: "Vatican Museums",
      startTime: "10:00",
      endTime: "13:00",
      destinationId: rome.id,
    },
  ];

  for (const activity of activities) {
    // For simplicity, just create without upsert to avoid ID conflicts
    // In a production scenario, you'd want unique constraints
    try {
      await prisma.activity.create({
        data: activity,
      });
    } catch (error) {
      // Ignore if activity already exists (due to duplicate seeding)
      if (!error.code === 'P2002') {
        console.log(`Activity "${activity.title}" already exists, skipping...`);
      } else {
        throw error;
      }
    }
  }

  // Add accommodations
  const accommodations = [
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
  ];

  for (const accommodation of accommodations) {
    try {
      await prisma.accommodation.create({
        data: accommodation,
      });
    } catch (error) {
      // Ignore if accommodation already exists (due to duplicate seeding)
      if (!error.code === 'P2002') {
        console.log(`Accommodation "${accommodation.name}" already exists, skipping...`);
      } else {
        throw error;
      }
    }
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

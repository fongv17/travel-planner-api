import prisma from '../config/db.js';

export async function findAllTrips() {
    return await prisma.trip.findMany();
}

export async function getById(id) {
  const trip = await prisma.trip.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      startDate: true,
      endDate: true,
    },
  });
  return trip;
}

export async function makeTrip(data) {
    return await prisma.trip.create({data});
}

export async function changeTrip(id, updates) {
    return await prisma.trip.update({
        where: { id },
        data: updates
    });
}

export async function removeTrip(id) {
  try {
    const deletedTrip = await prisma.trip.delete({
      where: { id },
    });
    return deletedTrip;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}
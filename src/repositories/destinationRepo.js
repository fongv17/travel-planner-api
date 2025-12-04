import prisma from '../config/db.js';

export async function findAllDestinations(userId) {
    return await prisma.destination.findMany({
        where: {
            trip: {
                userId: userId
            }
        },
        include: {
            trip: true
        }
    });
}

export async function makeDestination(data) {
    return await prisma.destination.create({data});
}

export async function getById(id) {
  const destination = await prisma.destination.findUnique({
    where: { id },
    select: {
      id: true,
      tripId: true,
      country: true,
      city: true,
    },
  });
  return destination;
}

export async function changeDestination(id, updates) {
    return await prisma.destination.update({
        where: { id },
        data: updates
    });
}

export async function removeDestination(id) {
  try {
    const deletedDestination = await prisma.destination.delete({
      where: { id },
    });
    return deletedDestination;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}
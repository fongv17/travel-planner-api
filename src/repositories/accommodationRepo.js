import prisma from '../config/db.js';

export async function findAllAccommodations(userId) {
    return await prisma.accommodation.findMany({
        where: {
            destination: {
                trip: {
                    userId: userId
                }
            }
        },
        include: {
            destination: {
                include: {
                    trip: true
                }
            }
        }
    });
}

export async function makeAccommodation(data) {
    return await prisma.accommodation.create({data});
}

export async function getById(id) {
  const accommodation = await prisma.accommodation.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,      
      type: true,
      pricePerNight: true,
    },
  });
  return accommodation;
}

export async function changeAccommodation(id, updates) {
    return await prisma.accommodation.update({
        where: { id },
        data: updates
    });
}

export async function removeAccommodation(id) {
  try {
    const deletedAccommodation = await prisma.accommodation.delete({
      where: { id },
    });
    return deletedAccommodation;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}
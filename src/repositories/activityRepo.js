import prisma from '../config/db.js';

export async function findAllActivities() {
    return await prisma.activity.findMany();
}

export async function makeActivity(data) {
    return await prisma.activity.create({data});
}

export async function getById(id) {
  const activity = await prisma.activity.findUnique({
    where: { id },
    select: {
      id: true,
      country: true,
      arrivalDate: true,
      departureDate: true,
    },
  });
  return destination;
}

export async function changeActivity(id, updates) {
    return await prisma.activity.update({
        where: { id },
        data: updates
    });
}

export async function removeActivity(id) {
  try {
    const deletedActivity = await prisma.activity.delete({
      where: { id },
    });
    return deletedActivity;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}
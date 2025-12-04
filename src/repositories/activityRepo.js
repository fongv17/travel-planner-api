import prisma from '../config/db.js';

export async function findAllActivities(userId) {
    return await prisma.activity.findMany({
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

export async function makeActivity(data) {
    return await prisma.activity.create({data});
}

export async function getById(id) {
  const activity = await prisma.activity.findUnique({
    where: { id },
    select: {
      id: true,
      destinationId: true,
      title: true,
      startTime: true,
      endTime: true,
    },
  });
  return activity;
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
import prisma from "../config/db.js";

export async function createUser(data) {
  return await prisma.user.create({
    data,
    select: {
        id: true,
        email: true,
        role: true,
    }
  });
}

export async function findUserByEmail(email) {
  return await prisma.user.findUnique({
    where: { email }
  });
}

export async function findAllUsers() {
    return await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            role: true,
        }
    });
}

export async function findLoggedInUser(userId) {
    return await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            email: true,
            role: true,
        }
    });
}

export async function updateLoggedInUser(userId, data) {
    return await prisma.user.update({
        where: { id: userId },
        data,
    });
}

export async function deleteUser(userId) {
    return await prisma.user.delete({
        where: { id: userId },
    });
}

export async function getAllUserTrips(userId) {
    return await prisma.post.findMany({
        where: { userId },
    });
}

export async function adminUpdateUserRole(userId, newRole) {
    return await prisma.user.update({
        where: { id:userId },
        data: { role: newRole },
        select: {
            id: true,
            email: true,
            role: true,
        }
    });
}
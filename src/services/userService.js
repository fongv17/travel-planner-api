import { 
    findAllUsers, 
    findLoggedInUser, 
    deleteUser,
    getAllUserTrips,
    adminUpdateUserRole,
    updateLoggedInUser,
} from "../repositories/userRepo.js";

export async function getAllUsers() {
    return await findAllUsers();
}

export async function getLoggedInUser(userId) {
    return await findLoggedInUser(userId);
}

export async function changeLoggedInUser(targetUserId, newRole) {
    return await updateLoggedInUser(targetUserId, newRole);
}

export async function removeUser(userId) {
    return await deleteUser(userId);
}

export async function getLoggedInUserTrips(userId) {
    return await getAllUserTrips(userId);
}

export async function changeUserRole(userId, newRole) {
    return await adminUpdateUserRole(userId, newRole);
}
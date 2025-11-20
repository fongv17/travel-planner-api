import { 
    getAllUsers, 
    getLoggedInUser,
    changeLoggedInUser,
    removeUser,
    getLoggedInUserTrips,
    changeUserRole,
} from "../services/userService.js";

export async function getAllUsersHandler(req, res) {
   const users = await getAllUsers();
   res.status(200).json(users);
}

export async function getLoggedInUserHandler(req, res) {
    const user = await getLoggedInUser(req.user.id);
    res.status(200).json(user);
}

export async function updateLoggedInUserHandler(req, res) {
    const updatedUser = await changeLoggedInUser(req.user.id, req.body);
    res.status(200).json(updatedUser);
}

export async function deleteUserHandler(req, res) {
    const userId = await removeUser(req.user.id);
    res.status(200).json(userId);
}

export async function getAllUserTripsHandler(req, res) {
    const userId = await getLoggedInUserTrips(req.user.id);
    res.status(200).json(userId);
}

export async function adminUpdateUserRoleHandler(req, res) {
    const updatedUser = await changeUserRole(req.params.id, req.body.role);
    res.status(200).json(updatedUser);
}
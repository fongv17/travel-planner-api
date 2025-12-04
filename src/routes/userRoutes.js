import express from 'express';
import { getLoggedInUserHandler, getAllUsersHandler, updateLoggedInUserHandler, deleteUserHandler, getAllUserTripsHandler, adminUpdateUserRoleHandler  } from '../controllers/userController.js';
import {
    validateUser,
} from '../middleware/userValidators.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = express.Router();

router.get('/', getAllUsersHandler);
router.get('/me', protect, getLoggedInUserHandler);
router.put('/me', protect, updateLoggedInUserHandler);
router.delete('/me', protect, deleteUserHandler);
router.get('/me/trips', protect, getAllUserTripsHandler);
router.patch('/:id/role', protect, authorizeRoles('ADMIN'), adminUpdateUserRoleHandler)
export default router;
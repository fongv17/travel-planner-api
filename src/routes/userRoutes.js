import express from 'express';
import { getLoggedInUserHandler, getAllUsersHandler, updateLoggedInUserHandler, deleteUserHandler, getAllUserTripsHandler, adminUpdateUserRoleHandler  } from '../controllers/userController.js';
import {
    validateUser, 
} from '../middleware/userValidators.js';

const router = express.Router();

router.get('/', getAllUsersHandler);
router.get('/me', getLoggedInUserHandler);
router.put('/me', updateLoggedInUserHandler);
router.delete('/me', deleteUserHandler);
router.get('/me/trips', getAllUserTripsHandler);
router.patch('/:id/role', adminUpdateUserRoleHandler)
export default router;
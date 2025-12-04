import express from 'express';
import {
    getAllActivitiesHandler,
    getActivityByIdHandler,
    createActivityHandler,
    updateActivityHandler,
    deleteActivityHandler,
} from '../controllers/activityController.js';

import {
    validateActivityId,
    validateActivityQuery,
    validateCreateActivity,
    validateUpdateActivity
} from '../middleware/activityValidators.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeActivityOwnership } from '../middleware/authorizeOwnership.js';

const router = express.Router();

router.get('/', protect, validateActivityQuery, getAllActivitiesHandler);
router.get('/:id', protect, validateActivityId, authorizeActivityOwnership, getActivityByIdHandler);
router.post('/', protect, validateCreateActivity, createActivityHandler);
router.put('/:id', protect, validateActivityId, authorizeActivityOwnership, validateUpdateActivity, updateActivityHandler);
router.delete('/:id', protect, validateActivityId, authorizeActivityOwnership, deleteActivityHandler);

export default router;
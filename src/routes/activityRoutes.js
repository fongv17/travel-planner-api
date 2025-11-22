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
const router = express.Router();

router.get('/', validateActivityQuery, getAllActivitiesHandler);
router.get('/:id', validateActivityId, getActivityByIdHandler);
router.post('/', validateCreateActivity, createActivityHandler);
router.put('/:id', validateActivityId, validateUpdateActivity, updateActivityHandler);
router.delete('/:id', validateActivityId, deleteActivityHandler);

export default router;
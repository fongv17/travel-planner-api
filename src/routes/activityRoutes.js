import express from 'express';
import {
    getAllActivitiesHandler,
    getActivityByIdHandler,
    createActivityHandler,
    updateActivityHandler,
    deleteActivityHandler,
} from '../controllers/activityController.js';


const router = express.Router();

router.get('/', getAllActivitiesHandler);
router.get('/:id', getActivityByIdHandler);
router.post('/', createActivityHandler);
router.put('/:id', updateActivityHandler);
router.delete('/:id', deleteActivityHandler);

export default router;
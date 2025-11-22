import express from 'express';
import {
    getAllTripsHandler,
    getTripByIdHandler,
    createTripHandler,
    updateTripHandler,
    deleteTripHandler,
} from '../controllers/tripController.js';

import { 
    validateTripId, 
    validateTripQuery, 
    validateCreateTrip, 
    validateUpdateTrip 
} from '../middleware/tripValidators.js';

const router = express.Router();

router.get('/', validateTripQuery, getAllTripsHandler);
router.get('/:id', validateTripId, getTripByIdHandler);
router.post('/', validateCreateTrip, createTripHandler);
router.put('/:id', validateTripId, validateUpdateTrip, updateTripHandler);
router.delete('/:id', validateTripId, deleteTripHandler);

export default router;
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
import { protect } from '../middleware/authMiddleware.js';
import { authorizeOwnership } from '../middleware/authorizeOwnership.js';

const router = express.Router();

router.get('/', protect, validateTripQuery, getAllTripsHandler);
router.get('/:id', protect, validateTripId, authorizeOwnership, getTripByIdHandler);
router.post('/', protect, validateCreateTrip, createTripHandler);
router.put('/:id', protect, validateTripId, authorizeOwnership, validateUpdateTrip, updateTripHandler);
router.delete('/:id', protect, validateTripId, authorizeOwnership, deleteTripHandler);

export default router;
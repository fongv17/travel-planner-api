import express from 'express';
import {
    getAllAccommodationsHandler,
    getAccommodationByIdHandler,
    createAccommodationHandler,
    updateAccommodationHandler,
    deleteAccommodationHandler,
} from '../controllers/accommodationController.js';

import {
    validateAccommodationId,
    validateAccommodationQuery,
    validateCreateAccommodation,
    validateUpdateAccommodation
} from '../middleware/accommodationValidators.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeAccommodationOwnership } from '../middleware/authorizeOwnership.js';

const router = express.Router();

router.get('/', protect, validateAccommodationQuery, getAllAccommodationsHandler);
router.get('/:id', protect, validateAccommodationId, authorizeAccommodationOwnership, getAccommodationByIdHandler);
router.post('/', protect, validateCreateAccommodation, createAccommodationHandler);
router.put('/:id', protect, validateAccommodationId, authorizeAccommodationOwnership, validateUpdateAccommodation, updateAccommodationHandler);
router.delete('/:id', protect, validateAccommodationId, authorizeAccommodationOwnership, deleteAccommodationHandler);

export default router;
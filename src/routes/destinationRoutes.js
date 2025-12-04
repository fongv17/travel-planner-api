import express from 'express';
import {
    getAllDestinationsHandler,
    getDestinationByIdHandler,
    createDestinationHandler,
    updateDestinationHandler,
    deleteDestinationHandler,
} from '../controllers/destinationController.js';

import {
    validateDestinationId,
    validateDestinationQuery,
    validateCreateDestination,
    validateUpdateDestination
} from '../middleware/destinationValidators.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeDestinationOwnership } from '../middleware/authorizeOwnership.js';

const router = express.Router();

router.get('/', protect, validateDestinationQuery, getAllDestinationsHandler);
router.get('/:id', protect, validateDestinationId, authorizeDestinationOwnership, getDestinationByIdHandler);
router.post('/', protect, validateCreateDestination, createDestinationHandler);
router.put('/:id', protect, validateDestinationId, authorizeDestinationOwnership, validateUpdateDestination, updateDestinationHandler);
router.delete('/:id', protect, validateDestinationId, authorizeDestinationOwnership, deleteDestinationHandler);

export default router;
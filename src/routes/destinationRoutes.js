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

const router = express.Router();

router.get('/', validateDestinationQuery, getAllDestinationsHandler);
router.get('/:id', validateDestinationId, getDestinationByIdHandler);
router.post('/', validateCreateDestination, createDestinationHandler);
router.put('/:id', validateDestinationId, validateUpdateDestination, updateDestinationHandler);
router.delete('/:id', validateDestinationId, deleteDestinationHandler);

export default router;
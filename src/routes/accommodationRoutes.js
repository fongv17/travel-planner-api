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

const router = express.Router();

router.get('/', validateAccommodationQuery, getAllAccommodationsHandler);
router.get('/:id', validateAccommodationId, getAccommodationByIdHandler);
router.post('/', validateCreateAccommodation, createAccommodationHandler);
router.put('/:id', validateAccommodationId, validateUpdateAccommodation, updateAccommodationHandler);
router.delete('/:id', validateAccommodationId, deleteAccommodationHandler);

export default router;
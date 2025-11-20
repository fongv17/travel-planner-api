import express from 'express';
import {
    getAllAccommodationsHandler,
    getAccommodationByIdHandler,
    createAccommodationHandler,
    updateAccommodationHandler,
    deleteAccommodationHandler,
} from '../controllers/accommodationController.js';


const router = express.Router();

router.get('/', getAllAccommodationsHandler);
router.get('/:id', getAccommodationByIdHandler);
router.post('/', createAccommodationHandler);
router.put('/:id', updateAccommodationHandler);
router.delete('/:id', deleteAccommodationHandler);

export default router;
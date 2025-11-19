import express from 'express';
import {
    getAllTripsHandler,
    getTripByIdHandler,
    createTripHandler,
    updateTripHandler,
    deleteTripHandler,
} from '../controllers/tripController.js';


const router = express.Router();

router.get('/', getAllTripsHandler);
router.get('/:id', getTripByIdHandler);
router.post('/', createTripHandler);
router.put('/:id', updateTripHandler);
router.delete('/:id', deleteTripHandler);

export default router;
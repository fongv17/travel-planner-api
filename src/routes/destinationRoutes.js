import express from 'express';
import {
    getAllDestinationsHandler,
    getDestinationByIdHandler,
    createDestinationHandler,
    updateDestinationHandler,
    deleteDestinationHandler,
} from '../controllers/destinationController.js';


const router = express.Router();

router.get('/', getAllDestinationsHandler);
router.get('/:id', getDestinationByIdHandler);
router.post('/', createDestinationHandler);
router.put('/:id', updateDestinationHandler);
router.delete('/:id', deleteDestinationHandler);

export default router;
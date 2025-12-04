import {
    getAllDestinations,
    getDestinationById,
    createDestination,
    updateDestination,
    deleteDestination
} from '../services/destinationService.js';
import { getTripById } from '../services/tripService.js';

export async function getAllDestinationsHandler(req, res) {
    const destinations = await getAllDestinations(req.user.id);
    res.json(destinations);
}

export async function getDestinationByIdHandler(req, res) {
  let id = parseInt(req.params.id);
  let destination = await getDestinationById(id);
  res.status(200).json(destination);
}

export async function createDestinationHandler(req, res) {
    // Validate that the trip belongs to the user
    const trip = await getTripById(req.body.tripId);
    if (trip.userId !== req.user.id) {
        const error = new Error('Forbidden: cannot create destination for trip you do not own');
        error.status = 403;
        throw error;
    }

    const newDestination = await createDestination(req.body);
    res.status(201).json(newDestination);
}

export async function updateDestinationHandler(req, res, next) {
    let id = parseInt(req.params.id);
    const updates = {};
    if (req.body.country) updates.country = req.body.country;
    if (req.body.city) updates.city = req.body.city;
    const updatedDestination = await updateDestination(id, updates);
    res.status(200).json(updatedDestination)
}

export async function deleteDestinationHandler(req, res) {
  let id = parseInt(req.params.id);
  await deleteDestination(id);
  res.status(204).send();
}
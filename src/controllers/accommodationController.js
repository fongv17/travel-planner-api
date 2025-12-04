import {
    getAllAccommodations,
    getAccommodationById,
    createAccommodation,
    updateAccommodation,
    deleteAccommodation,
} from '../services/accommodationService.js';
import { getDestinationById } from '../services/destinationService.js';
import { getTripById } from '../services/tripService.js';

export async function getAllAccommodationsHandler(req, res) {
    const accommodations = await getAllAccommodations(req.user.id);
    res.json(accommodations);
}

export async function getAccommodationByIdHandler(req, res) {
  let id = parseInt(req.params.id);
  let accommodation = await getAccommodationById(id);
  res.status(200).json(accommodation);
}

export async function createAccommodationHandler(req, res, next) {
    try {
        // Validate that the destination belongs to the user
        const destination = await getDestinationById(req.body.destinationId);
        if (!destination) {
            const error = new Error('Destination not found');
            error.status = 404;
            throw error;
        }

        const trip = await getTripById(destination.tripId);
        if (trip.userId !== req.user.id) {
            const error = new Error('Forbidden: cannot create accommodation for destination you do not own');
            error.status = 403;
            throw error;
        }

        const newAccommodation = await createAccommodation(req.body);
        res.status(201).json(newAccommodation);
    } catch (err) {
        next(err);
    }
}

export async function updateAccommodationHandler(req, res, next) {
    let id = parseInt(req.params.id);
    const updates = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.body.type) updates.type = req.body.type;
    if (req.body.pricePerNight) updates.pricePerNight = req.body.pricePerNight;
    const updatedAccommodation = await updateAccommodation(id, updates);
    res.status(200).json(updatedAccommodation)
}

export async function deleteAccommodationHandler(req, res) {
  let id = parseInt(req.params.id);
  await deleteAccommodation(id);
  res.status(204).send();
}
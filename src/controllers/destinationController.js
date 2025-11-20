import {
    getAllDestinations,
    getDestinationById,
    createDestination,
    updateDestination,
    deleteDestination
} from '../services/destinationService.js';

export async function getAllDestinationsHandler(req, res) {
    const destinations = await getAllDestinations();
    res.json(destinations);
}

export async function getDestinationByIdHandler(req, res) {
  let id = parseInt(req.params.id);
  let destination = await getDestinationById(id);
  res.status(200).json(destination);
}

export async function createDestinationHandler(req, res) {
    const newDestination = await createDestination(req.body); 
    res.status(201).json(newDestination);
}

export async function updateDestinationHandler(req, res, next) {
    let id = parseInt(req.params.id);
    const updates = {};
    if (req.body.country) updates.country = req.body.country;
    if (req.body.city) updates.city = req.body.city;
    updatedDestination = await updateDestination(id, updates);
    res.status(200).json(updatedDestination)
}

export async function deleteDestinationHandler(req, res) {
  let id = parseInt(req.params.id);
  await deleteDestination(id);
  res.status(204).send();
}
import {
    getAllAccommodations,
    getAccommodationById,
    createAccommodation,
    updateAccommodation,
    deleteAccommodation,
} from '../services/accommodationService.js';

export async function getAllAccommodationsHandler(req, res) {
    const accommodations = await getAllAccommodations();
    res.json(accommodations);
}

export async function getAccommodationByIdHandler(req, res) {
  let id = parseInt(req.params.id);
  let accommodation = await getAccommodationById(id);
  res.status(200).json(accommodation);
}

export async function createAccommodationHandler(req, res) {
    const newAccommodation = await createAccommodation(req.body); 
    res.status(201).json(newAccommodation);
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
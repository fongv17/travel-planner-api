import { 
    getAllTrips,
    getTripById,
    createTrip,
    updateTrip,
    deleteTrip,
} from '../services/tripService.js';

export async function getAllTripsHandler(req, res) {
    const trips = await getAllTrips(req.user.id);
    res.json(trips);
}

export async function getTripByIdHandler(req, res) {
  let id = parseInt(req.params.id);
  let trip = await getTripById(id);
  res.status(200).json(trip);
}

export async function createTripHandler(req, res, next) {
  try {
    const data = {
      ...req.body,
      userId: req.user.id,
      startDate: new Date(req.body.startDate).toISOString(),
      endDate: new Date(req.body.endDate).toISOString(),
    };
    const newTrip = await createTrip(data);
    res.status(201).json(newTrip);
  } catch (err) {
    next(err);
  }
}

export async function updateTripHandler(req, res, next) {
    let id = parseInt(req.params.id);
    const updates = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.body.startDate) updates.startDate = req.body.startDate;
    if (req.body.endDate) updates.endDate = req.body.endDate;
    const updatedTrip = await updateTrip(id, updates);
    res.status(200).json(updatedTrip)
}

export async function deleteTripHandler(req, res) {
  let id = parseInt(req.params.id);
  await deleteTrip(id);
  res.status(204).send();
}
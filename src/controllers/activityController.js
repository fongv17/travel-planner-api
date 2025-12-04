import {
    getAllActivities,
    getActivityById,
    createActivity,
    updateActivity,
    deleteActivity
} from '../services/activityService.js';
import { getDestinationById } from '../services/destinationService.js';
import { getTripById } from '../services/tripService.js';

export async function getAllActivitiesHandler(req, res) {
    const activities = await getAllActivities(req.user.id);
    res.json(activities);
}

export async function getActivityByIdHandler(req, res) {
  let id = parseInt(req.params.id);
  let activity = await getActivityById(id);
  res.status(200).json(activity);
}

export async function createActivityHandler(req, res) {
    // Validate that the destination belongs to the user
    const destination = await getDestinationById(req.body.destinationId);
    if (!destination) {
        const error = new Error('Destination not found');
        error.status = 404;
        throw error;
    }

    const trip = await getTripById(destination.tripId);
    if (trip.userId !== req.user.id) {
        const error = new Error('Forbidden: cannot create activity for destination you do not own');
        error.status = 403;
        throw error;
    }

    const newActivity = await createActivity(req.body);
    res.status(201).json(newActivity);
}

export async function updateActivityHandler(req, res, next) {
    let id = parseInt(req.params.id);
    const updates = {};
    if (req.body.title) updates.title = req.body.title;
    if (req.body.startTime) updates.startTime = req.body.startTime;
    if (req.body.endTime) updates.endTime = req.body.endTime;
    const updatedActivity = await updateActivity(id, updates);
    res.status(200).json(updatedActivity)
}

export async function deleteActivityHandler(req, res) {
  let id = parseInt(req.params.id);
  await deleteActivity(id);
  res.status(204).send();
}
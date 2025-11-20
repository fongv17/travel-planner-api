import {
    getAllActivities,
    getActivityById,
    createActivity,
    updateActivity,
    deleteActivity
} from '../services/activityService.js';

export async function getAllActivitiesHandler(req, res) {
    const activities = await getAllActivities();
    res.json(activities);
}

export async function getActivityByIdHandler(req, res) {
  let id = parseInt(req.params.id);
  let activity = await getActivityById(id);
  res.status(200).json(activity);
}

export async function createActivityHandler(req, res) {
    const newActivity = await createActivity(req.body); 
    res.status(201).json(newActivity);
}

export async function updateActivityHandler(req, res, next) {
    let id = parseInt(req.params.id);
    const updates = {};
    if (req.body.country) updates.country = req.body.country;
    if (req.body.city) updates.city = req.body.city;
    if (req.body.arrivalDate) updates.arrivalDate = req.body.arrivalDate;
    if (req.body.departureDate) updates.departureDate = req.body.departureDate;
    const updatedActivity = await updateActivity(id, updates);
    res.status(200).json(updatedActivity)
}

export async function deleteActivityHandler(req, res) {
  let id = parseInt(req.params.id);
  await deleteActivity(id);
  res.status(204).send();
}
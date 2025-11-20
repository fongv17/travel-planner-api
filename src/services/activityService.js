import { 
    findAllActivities,
    makeActivity,
    getById,
    changeActivity,
    removeActivity
 } from '../repositories/activityRepo.js';

export async function getAllActivities() {
    return await findAllActivities();
}

export async function getActivityById(id) {
  let result = await getById(id);
  if (result) return result;
  else {
    const error = new Error(`Cannot find activity with id ${id}`);
    error.status = 404;
    throw error;
  }
}

export async function createActivity(data) {
    return await makeActivity(data);
}

export async function updateActivity(id, updates) {
    const updatedActivity = await changeActivity(id, updates);
    if (updatedActivity) {
        return updatedActivity;
    } else {
        const error = new Error(`Activity with id ${id} not found`);
        error.status =404;
        throw error;
    }
}

export async function deleteActivity(id) {
  const result = await removeActivity(id);
  if (result) return;
  else {
    const error = new Error(`Cannot find activity with id ${id}`);
    error.status = 404;
    throw error;
  }
}
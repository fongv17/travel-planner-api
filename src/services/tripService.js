import { 
    findAllTrips,
    getById,
    makeTrip,
    changeTrip,
    removeTrip,
 } from '../repositories/tripRepo.js';

export async function getAllTrips() {
    return await findAllTrips();
}

export async function getTripById(id) {
  let result = await getById(id);
  if (result) return result;
  else {
    const error = new Error(`Cannot find trip with id ${id}`);
    error.status = 404;
    throw error;
  }
}

export async function createTrip(data) {
    return await makeTrip(data);
}

export async function updateTrip(id, updates) {
    const updatedTrip = await changeTrip(id, updates);
    if (updatedTrip) {
        return updatedTrip;
    } else {
        const error = new Error(`Trip with id ${id} not found`);
        error.status =404;
        throw error;
    }
}

export async function deleteTrip(id) {
  const result = await removeTrip(id);
  if (result) return;
  else {
    const error = new Error(`Cannot find trip with id ${id}`);
    error.status = 404;
    throw error;
  }
}
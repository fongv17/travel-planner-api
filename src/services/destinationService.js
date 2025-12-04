import { 
    findAllDestinations,
    makeDestination,
    getById,
    changeDestination,
    removeDestination
 } from '../repositories/destinationRepo.js';

export async function getAllDestinations(userId) {
    return await findAllDestinations(userId);
}

export async function getDestinationById(id) {
  let result = await getById(id);
  if (result) return result;
  else {
    const error = new Error(`Cannot find destination with id ${id}`);
    error.status = 404;
    throw error;
  }
}

export async function createDestination(data) {
    return await makeDestination(data);
}

export async function updateDestination(id, updates) {
    const updatedDestination = await changeDestination(id, updates);
    if (updatedDestination) {
        return updatedDestination;
    } else {
        const error = new Error(`Destination with id ${id} not found`);
        error.status =404;
        throw error;
    }
}

export async function deleteDestination(id) {
  const result = await removeDestination(id);
  if (result) return;
  else {
    const error = new Error(`Cannot find destination with id ${id}`);
    error.status = 404;
    throw error;
  }
}
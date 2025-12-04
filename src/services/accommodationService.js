import { 
    findAllAccommodations,
    makeAccommodation,
    getById,
    changeAccommodation,
    removeAccommodation
 } from '../repositories/accommodationRepo.js';

export async function getAllAccommodations(userId) {
    return await findAllAccommodations(userId);
}

export async function getAccommodationById(id) {
  let result = await getById(id);
  if (result) return result;
  else {
    const error = new Error(`Cannot find accommodation with id ${id}`);
    error.status = 404;
    throw error;
  }
}

export async function createAccommodation(data) {
    return await makeAccommodation(data);
}

export async function updateAccommodation(id, updates) {
    const updatedAccommodation = await changeAccommodation(id, updates);
    if (updatedAccommodation) {
        return updatedAccommodation;
    } else {
        const error = new Error(`Accommodation with id ${id} not found`);
        error.status =404;
        throw error;
    }
}

export async function deleteAccommodation(id) {
  const result = await removeAccommodation(id);
  if (result) return;
  else {
    const error = new Error(`Cannot find accommodation with id ${id}`);
    error.status = 404;
    throw error;
  }
}
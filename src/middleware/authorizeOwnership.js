import { getTripById } from "../services/tripService.js";
export async function autherizeOwnership(req, res, next){
    const tripId = parseInt(req.params.id);
    const trip = await getTripById(tripId);

    if(trip.userId !== req.user.id){
        const error = new Error('Forbidden: insufficient permission')
        error.status = 403;
        return next(error)
    }

    return next();
}
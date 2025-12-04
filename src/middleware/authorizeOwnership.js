import { getTripById } from "../services/tripService.js";
import { getDestinationById } from "../services/destinationService.js";
import { getActivityById } from "../services/activityService.js";
import { getAccommodationById } from "../services/accommodationService.js";

export async function authorizeOwnership(req, res, next){
    const tripId = parseInt(req.params.id);
    const trip = await getTripById(tripId);

    if(trip.userId !== req.user.id){
        const error = new Error('Forbidden: insufficient permission')
        error.status = 403;
        return next(error)
    }

    return next();
}

export async function authorizeDestinationOwnership(req, res, next){
    const destinationId = parseInt(req.params.id);
    const destination = await getDestinationById(destinationId);

    if(!destination){
        const error = new Error('Destination not found')
        error.status = 404;
        return next(error)
    }

    const trip = await getTripById(destination.tripId);

    if(trip.userId !== req.user.id){
        const error = new Error('Forbidden: insufficient permission')
        error.status = 403;
        return next(error)
    }

    return next();
}

export async function authorizeActivityOwnership(req, res, next){
    const activityId = parseInt(req.params.id);
    const activity = await getActivityById(activityId);

    if(!activity){
        const error = new Error('Activity not found')
        error.status = 404;
        return next(error)
    }

    const destination = await getDestinationById(activity.destinationId);
    const trip = await getTripById(destination.tripId);

    if(trip.userId !== req.user.id){
        const error = new Error('Forbidden: insufficient permission')
        error.status = 403;
        return next(error)
    }

    return next();
}

export async function authorizeAccommodationOwnership(req, res, next){
    const accommodationId = parseInt(req.params.id);
    const accommodation = await getAccommodationById(accommodationId);

    if(!accommodation){
        const error = new Error('Accommodation not found')
        error.status = 404;
        return next(error)
    }

    const destination = await getDestinationById(accommodation.destinationId);
    const trip = await getTripById(destination.tripId);

    if(trip.userId !== req.user.id){
        const error = new Error('Forbidden: insufficient permission')
        error.status = 403;
        return next(error)
    }

    return next();
}
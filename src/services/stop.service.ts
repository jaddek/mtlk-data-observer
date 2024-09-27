import {getDistanceBetweenPointsIn} from "../geo-spatial-helper";
import {Shape} from "../contracts";
import {StopInterface, StopModel} from "../models/stop.model";
import {MongooseError} from "mongoose";

const getStopsInDistance = async (
    point: Shape,
    stops: StopInterface[]
) => {
    return stops.filter(function (stop: StopInterface): boolean {
        const calculatedDistance = getDistanceBetweenPointsIn(
            point.lat,
            point.lon,
            stop.location.coordinates[1],
            stop.location.coordinates[0],
        )

        return calculatedDistance < point.distance;
    })
}

const saveStops = async (stops: []) => {
    return await StopModel.insertMany(stops.map(function (stop: any) {
            return new StopModel({
                metlinkId: stop.id,
                stopId: stop.stop_id,
                code: stop.stop_code,
                name: stop.stop_name,
                description: stop.stop_descr,
                zoneId: stop.zone_id,
                location: {
                    type: "Point",
                    coordinates: [stop.stop_lon, stop.stop_lat]
                },
                locationType: stop.location_type,
                parentStation: stop.parent_station,
                stopUrl: stop.stop_url,
                stopTimeZone: stop.stopTimeZone,
            });
        }
    ));
}

const findAllStops = async () => {
    try {
        return await StopModel.find();
    } catch (error) {
        if (error instanceof MongooseError) {
            throw new Error('Error retrieving stops: ' + error.message);
        }
    }

    return [];
}

const findStopByMetlinkId = async (metlinkStopId: number): Promise<any> => {
    return StopModel.findOne({metlinkId: metlinkStopId});
}

async function updateStopRoutesByMetlinkCode(metlinkStopCode: string, routes: Number[]): Promise<StopInterface | null> {
    return StopModel.findOneAndUpdate(
        {code: metlinkStopCode},
        {routes: routes},
        {
            new: true,
            runValidators: true,
        }
    ).populate('routes');
}


const findStopsWithinDistance = async (
    shape: Shape
) => {
    try {
        return await StopModel.find({
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [shape.lon, shape.lat],
                    },
                    $maxDistance: shape.distance,
                },
            },
        });
    } catch (error) {
        if (error instanceof MongooseError) {
            throw new Error('Error retrieving stops by location: ' + error.message);
        }
    }

    return [];
};

export {
    getStopsInDistance,
    saveStops,
    findAllStops,
    findStopsWithinDistance,
    findStopByMetlinkId,
    updateStopRoutesByMetlinkCode,
}
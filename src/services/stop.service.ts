import {MetlinkHttpClient} from "metlink-api-http-client";
import {getMetlinkHttpClient} from "../http-client";
import {getDistanceBetweenPointsIn} from "../geo-spatial-helper";

export async function getStopsInDistance(
    lat: number,
    lon: number,
    distance: number
) {
    const client = <MetlinkHttpClient>getMetlinkHttpClient();
    const stops = await client.getGtfsStops();

    return stops.data.filter(function (stop: Record<string, any>): boolean {
        const calculatedDistance = getDistanceBetweenPointsIn(
            lat,
            lon,
            stop.stop_lat,
            stop.stop_lon
        )

        return calculatedDistance < distance;
    })
}
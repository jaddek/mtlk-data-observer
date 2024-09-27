import {MetlinkHttpClient} from "metlink-api-http-client";
import {getMetlinkHttpClient} from "../http-client";

export async function getStopsFromSourceOfTruth(): Promise<[]> {
    const client = <MetlinkHttpClient>getMetlinkHttpClient();
    const response = await client.getGtfsStops();

    return response.data;
}

export async function getRoutesFromSourceOfTruth(
    stopId: string | null = null
): Promise<[]> {
    const client = <MetlinkHttpClient>getMetlinkHttpClient();
    const response = await client.getGtfsRoutes(stopId);

    return response.data;
}
import {MetlinkHttpClient} from "metlink-api-http-client";
import {getMetlinkHttpClient} from "../http-client";

export async function getStopsFromSourceOfTruth(): Promise<[]> {
    const client = <MetlinkHttpClient>getMetlinkHttpClient();
    const response = await client.getGtfsStops();

    return response.data;
}
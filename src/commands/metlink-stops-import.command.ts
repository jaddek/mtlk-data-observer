import {getStopsFromSourceOfTruth} from "../services/metlink.service";
import {saveStops} from "../services/stop.service";

export async function MetlinkStopsImport(): Promise<any>
{
    const stops = await getStopsFromSourceOfTruth();

    return await saveStops(stops);
}


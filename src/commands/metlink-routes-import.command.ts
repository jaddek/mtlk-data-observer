import {getRoutesFromSourceOfTruth} from "../services/metlink.service";
import {saveRoutes} from "../services/route.service";

export async function MetlinkRoutesImport(): Promise<any>
{
    const routes = await getRoutesFromSourceOfTruth();

    return await saveRoutes(routes);
}

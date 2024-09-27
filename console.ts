import {MetlinkStopsImport} from "./src/commands/metlink-stops-import.command";
import "./src/dotenv-config";

MetlinkStopsImport().then(result => {
    console.debug(`Imported ${result} stops`);
});
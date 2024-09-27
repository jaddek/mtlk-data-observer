import "./src/dotenv-config";
import {MetlinkStopsImport} from "./src/commands/metlink-stops-import.command";
import {MetlinkRoutesImport} from "./src/commands/metlink-routes-import.command";
import {connectWithEnvironmentVars} from "./src/mongoose";

const args = process.argv.slice(2);

enum Commands {
    StopsImport = 'stops:import',
    RoutesImport = 'routes:import'
}

const run = async () => {
    await connectWithEnvironmentVars()
    switch (args[0]) {
        case Commands.StopsImport:
            console.log(`Run ${Commands.StopsImport}`);
            await MetlinkStopsImport().then(result => {
                console.debug(`Imported ${result} stops`);
            });
            break;
        case Commands.RoutesImport:
            console.log(`Run ${Commands.RoutesImport}`);
            await MetlinkRoutesImport().then(result => {
                console.debug(`Imported ${result} stops`);
            });
            break;
        default:
            console.log("Command not found");
    }

    console.log("Done");
    process.exit(0);
}

run();
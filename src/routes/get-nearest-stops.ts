import express, {Request, Response} from 'express';
import {param, query, validationResult} from 'express-validator';
import {findStopsWithinDistance, updateStopRoutesByMetlinkCode} from "../services/stop.service";
import {ParsedQs} from "qs";
import {Shape} from "../contracts";
import {StopInterface} from "../models/stop.model";
import {getRoutesFromSourceOfTruth} from "../services/metlink.service";
import {findRoutesByIds} from "../services/route.service";
import {RouteInterface} from "../models/route.model";

const getParams = (query: ParsedQs): Shape => {
    const coords: string = query.coords?.toString()!;
    const [lat, lon] = coords.split(",");
    const distance: number = parseInt(query.distance?.toString()!);

    return {
        lat: parseFloat(lat),
        lon: parseFloat(lon),
        distance: distance
    };
}

const router = express.Router();

router.get('/stops', [
    query("coords").exists().isLatLong(),
    query("distance").exists().isInt({min: 250, max: 20000})
], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const params = getParams(req.query)
    const stops: StopInterface[] = await findStopsWithinDistance(params);

    return res.json(stops);
})


router.get('/stops/:stopId/routes', [
    param('stopId').isInt().notEmpty(),
], async (req: Request, res: Response) => {
    const metlinkRoutes = await getRoutesFromSourceOfTruth(req.params.stopId)
    const routes = await findRoutesByIds(metlinkRoutes.map((metlinkRoute: { id: number }) => metlinkRoute.id));
    const stop = await updateStopRoutesByMetlinkCode(req.params.stopId, routes.map((route: RouteInterface) => route.id));

    return res.json(stop);
})


export {router as NearestStopsRouter};

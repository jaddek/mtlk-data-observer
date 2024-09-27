import express, {Request, Response} from 'express';
import {query, validationResult} from 'express-validator';
import {findStopsWithinDistance} from "../services/stop.service";
import {ParsedQs} from "qs";
import {Shape} from "../contracts";
import {StopInterface} from "../models/stop.model";

const getParams = (query: ParsedQs) => {
    const coords: string = query.coords?.toString()!;
    const [lat, lon] = coords.split(",");
    const distance: number = parseInt(query.distance?.toString()!);

    const shape: Shape = {
        lat: parseFloat(lat),
        lon: parseFloat(lon),
        distance: distance
    }

    return shape;
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

export {router as NearestStopsRouter};

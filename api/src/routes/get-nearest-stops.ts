import express, {Request, Response} from 'express';
import {query, validationResult} from 'express-validator';
import {getStopsInDistance} from "../services/stop.service";

const router = express.Router();

router.get('/stops', [
    query("coords").exists().isLatLong(),
    query("distance").exists().isInt({min: 250, max: 2000})
], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const coords: string = req.query.coords?.toString()!;
    const [lat, lon] = coords.split(",");
    const distance: number = parseInt(req.query.distance?.toString()!);

    return res.json(getStopsInDistance(
        parseFloat(lat),
        parseFloat(lon),
        distance
    ));
})

export {router as NearestStopsRouter};

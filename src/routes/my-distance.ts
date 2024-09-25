import express, {Request, Response} from 'express';
import {query, validationResult} from 'express-validator';

const router = express.Router();


router.get('/distance', [
    query("lat").isLatLong(),
    query("lon").isLatLong(),
], (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const lat = req.query.lat;
    const lng = req.query.lng;

    return res.json([lat, lng]);
})

export {router as MyDistanceRouter};

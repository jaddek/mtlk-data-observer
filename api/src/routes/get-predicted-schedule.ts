import express, {Request, Response, Router} from 'express';
import {Result, ValidationError, validationResult} from 'express-validator';

const router: Router = express.Router();

router.get('/stops/:stopId', (req: Request, res: Response) => {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const lat = req.query.lat;
    const lng = req.query.lng;

    return res.json([lat, lng]);
})

export {router as PredictedScheduleRouter};

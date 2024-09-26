import express, {Request, Response} from 'express';

const router = express.Router();


router.get('/subscription/vehicle/:vehicleId', (req: Request, res: Response) => {

    return res.json([]);
})

router.get('/subscription/stop/:stopId', (req: Request, res: Response) => {

    return res.json([]);
})

export {router as SubscriptionRouter};

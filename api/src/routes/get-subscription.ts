import express, {Request, Response} from 'express';
import dotenv from 'dotenv';

const router = express.Router();

dotenv.config();
router.get('/subscription/vehicle/:vehicleId', (req: Request, res: Response) => {

    return res.json([]);
})

router.get('/subscription/stop/:stopId', (req: Request, res: Response) => {

    return res.json([]);
})

export {router as SubscriptionRouter};

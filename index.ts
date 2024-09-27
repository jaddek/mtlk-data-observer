import createError from 'http-errors';
import express, {Request, Response} from "express"
import morgan from "morgan"
import {NearestStopsRouter} from "./src/routes/get-nearest-stops";
import {PredictedScheduleRouter} from "./src/routes/get-predicted-schedule";
import {SubscriptionRouter} from "./src/routes/get-subscription";
import "./src/dotenv-config";
import {connectWithEnvironmentVars} from "./src/mongoose";

const app = express()
const PORT = process.env.PORT || 3000;

morgan.token('host', function (req: Request) {
    return req.hostname;
});

app.use(express.json());
app.use(morgan('tiny'))
app.use(express.urlencoded({extended: false}));

app.use(NearestStopsRouter)
app.use(PredictedScheduleRouter)
app.use(SubscriptionRouter)

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err: any, req: Request, res: Response) {
    res.locals.message = err.message;
    res.locals.error = process.env.DEBUG_ENVIRONMENT === 'development' ? err : {};

    res.status(err.status || 500);
    res.json(err)
});

const run = async () => {
    await connectWithEnvironmentVars()
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

run();

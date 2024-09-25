import createError from 'http-errors';
import express from "express"
import logger from "morgan"
import {NearestStopsRouter} from "./src/routes/nearest-stops";
import {MyDistanceRouter} from "./src/routes/my-distance";
import {PredictedScheduleRouter} from "./src/routes/predicted-schedule";
import {SubscriptionRouter} from "./src/routes/subscription";


const app = express()
app.use(express.json());
app.use(logger('dev'));
app.use(express.urlencoded({extended: false}));

app.use(MyDistanceRouter)
app.use(NearestStopsRouter)
app.use(PredictedScheduleRouter)
app.use(SubscriptionRouter)


app.use(function (req, res, next) {
    next(createError(404));
});
app.use(function (err: any, req: any, res: any, next: any) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.json(err)
});

app.listen(3000)


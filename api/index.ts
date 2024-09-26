import createError from 'http-errors';
import express from "express"
import morgan from "morgan"
import {NearestStopsRouter} from "./src/routes/get-nearest-stops";
import {PredictedScheduleRouter} from "./src/routes/get-predicted-schedule";
import {SubscriptionRouter} from "./src/routes/get-subscription";
import "./dotenv-config";

const app = express()
const PORT = process.env.PORT || 3000;

morgan.token('host', function(req) {
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
app.use(function (err: any, req: any, res: any) {

    console.log(err);
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.json(err)
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})


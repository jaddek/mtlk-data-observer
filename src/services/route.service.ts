import {MongooseError} from "mongoose";
import {RouteModel} from "../models/route.model";


const saveRoutes = async (routes: []) => {
    return await RouteModel.insertMany(routes.map(function (route: any) {
            return new RouteModel({
                metlinkId: route.id,
                routeId: route.route_id,
                agencyId: route.agency_id,
                routeShortName: route.route_short_name,
                routeLongName: route.route_long_name,
                routeDesc: route.route_desc,
                routeType: route.route_type,
                routeColour: route.route_color,
                routeTextColour: route.route_text_color,
                routeUrl: route.route_url,
                routeSortOrder: route.route_sort_order,
            });
        }
    ));
}

const findAllRoutes = async () => {
    try {
        return await RouteModel.find();
    } catch (error) {
        if (error instanceof MongooseError) {
            throw new Error('Error retrieving stops: ' + error.message);
        }
    }

    return [];
}

export {
    findAllRoutes,
    saveRoutes
}
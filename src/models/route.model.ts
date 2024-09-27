import mongoose, {Document, Schema} from 'mongoose';

export interface RouteInterface extends Document {
    metlinkId: number;
    routeId: string;
    agencyId: string;
    routeShortName: string;
    routeLongName: string;
    routeDesc: string;
    routeType: string;
    routeColour: string;
    routeTextColour: string;
    routeUrl: string;
    routeSortOrder: number;
    importedAt: Date;
    updatedAt: Date;
}

const RouteSchema: Schema<RouteInterface> = new mongoose.Schema({
    metlinkId: {type: Number, required: true, unique: true},
    routeId: {type: String, required: true},
    agencyId: {type: String, required: true},
    routeShortName: {type: String, required: true},
    routeLongName: {type: String, required: true},
    routeDesc: {type: String, required: true},
    routeType: {type: String, required: true},
    routeColour: {type: String, required: true},
    routeTextColour: {type: String, required: true},
    routeUrl: {type: String, required: false},
    routeSortOrder: {type: Number, required: true},
    importedAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
});

const Route = mongoose.model<RouteInterface>('Route', RouteSchema);

export {Route as RouteModel};
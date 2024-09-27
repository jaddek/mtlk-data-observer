import mongoose, {Document, Schema} from 'mongoose';

export interface StopInterface extends Document {
    metlinkId: number;
    stopId: string;
    code: string
    name: string;
    description: string,
    zoneId: string;
    importedAt: Date;
    updatedAt: Date;
    locationType: number;
    location: {
        type: 'Point';
        coordinates: [number, number];
    };
    parentStation: string;
    stopUrl: string;
    stopTimeZone: string;
    routes: [number];
}

const StopSchema: Schema<StopInterface> = new mongoose.Schema({
    metlinkId: {type: Number, required: true, unique: true,},
    stopId: {type: String, required: true, unique: true,},
    code: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: false},
    zoneId: {type: String, required: false},
    importedAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    locationType: {type: Number, required: false},
    parentStation: {type: String, required: false},
    stopUrl: {type: String, required: false},
    stopTimeZone: {type: String, required: false},
    routes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Route'}]
});

StopSchema.index({location: '2dsphere'});

const Stop = mongoose.model<StopInterface>('Stop', StopSchema);

export {Stop as StopModel};
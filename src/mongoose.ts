import mongoose from 'mongoose';

export async function connectWithEnvironmentVars() {
    await connectDB(
        process.env.MONGO_USERNAME || '',
        process.env.MONGO_PASSWORD || '',
        process.env.MONGO_DATABASE || '',
        process.env.MONGO_HOST || '',
        process.env.MONGO_PORT || '27017',
    )
}

export async function connectDB(
    username: string,
    password: string,
    dbName: string,

    host: string,
    port: string
) {
    try {
        const uri = `mongodb://${username}:${password}@${host}:${port}/${dbName}`;

        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 20000
        });

        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
}

